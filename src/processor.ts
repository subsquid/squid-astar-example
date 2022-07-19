import { lookupArchive } from "@subsquid/archive-registry";
import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import {
  BatchContext,
  BatchProcessorItem,
  EvmLogEvent,
  SubstrateBatchProcessor,
  SubstrateBlock,
} from "@subsquid/substrate-processor";
import { In } from "typeorm";
import {
  CHAIN_NODE,
  astarDegenscontract,
  getContractEntity,
  getTokenURI,
  astarCatsContract,
  contractMapping,
} from "./contract";
import { Owner, Token, Transfer } from "./model";
import * as erc721 from "./abi/erc721";

const database = new TypeormDatabase();
const processor = new SubstrateBatchProcessor()
  .setBatchSize(500)
  .setBlockRange({ from: 442693 })
  .setDataSource({
    chain: CHAIN_NODE,
    archive: lookupArchive("astar", { release: "FireSquid" }),
  })
  .setTypesBundle("astar")
  .addEvmLog(astarDegenscontract.address, {
    range: { from: 442693 },
    filter: [erc721.events["Transfer(address,address,uint256)"].topic],
  })
  .addEvmLog(astarCatsContract.address, {
    range: { from: 800854 },
    filter: [erc721.events["Transfer(address,address,uint256)"].topic],
  });

type Item = BatchProcessorItem<typeof processor>;
type Context = BatchContext<Store, Item>;

processor.run(database, async (ctx) => {
  const transfersData: TransferData[] = [];

  for (const block of ctx.blocks) {
    for (const item of block.items) {
      if (item.name === "EVM.Log") {
        const transfer = handleTransfer(block.header, item.event);
        transfersData.push(transfer);
      }
    }
  }

  await saveTransfers(ctx, transfersData);
});

type TransferData = {
  id: string;
  from: string;
  to: string;
  token: string;
  timestamp: bigint;
  block: number;
  transactionHash: string;
  contractAddress: string;
};

function handleTransfer(
  block: SubstrateBlock,
  event: EvmLogEvent
): TransferData {
  const { from, to, tokenId } = erc721.events[
    "Transfer(address,address,uint256)"
  ].decode(event.args); 

  const transfer: TransferData = {
    id: event.id,
    token: tokenId.toString(),
    from,
    to,
    timestamp: BigInt(block.timestamp),
    block: block.height,
    transactionHash: event.evmTxHash,
    contractAddress: event.args.address,
  };

  return transfer;
}

async function saveTransfers(ctx: Context, transfersData: TransferData[]) {
  const tokensIds: Set<string> = new Set();
  const ownersIds: Set<string> = new Set();

  function getCollectionAndTokenId (transferData: TransferData): string{
    return `${contractMapping.get(transferData.contractAddress)?.contractModel.symbol || ""}-${transferData.token}`;
  }

  for (const transferData of transfersData) {
    tokensIds.add(getCollectionAndTokenId(transferData));
    ownersIds.add(transferData.from);
    ownersIds.add(transferData.to);
  }

  const transfers: Set<Transfer> = new Set();

  const tokens: Map<string, Token> = new Map(
    (await ctx.store.findBy(Token, { id: In([...tokensIds]) })).map((token) => [
      token.id,
      token,
    ])
  );

  const owners: Map<string, Owner> = new Map(
    (await ctx.store.findBy(Owner, { id: In([...ownersIds]) })).map((owner) => [
      owner.id,
      owner,
    ])
  );

  for (const transferData of transfersData) {
    let from = owners.get(transferData.from);
    if (from == null) {
      from = new Owner({ id: transferData.from, balance: 0n });
      owners.set(from.id, from);
    }

    let to = owners.get(transferData.to);
    if (to == null) {
      to = new Owner({ id: transferData.to, balance: 0n });
      owners.set(to.id, to);
    }

    let token = tokens.get(getCollectionAndTokenId(transferData));
    if (token == null) {
      token = new Token({
        id: getCollectionAndTokenId(transferData),
        uri: await getTokenURI(transferData.token, transferData.contractAddress),
        contract: await getContractEntity(ctx.store, transferData.contractAddress),
      });
      tokens.set(token.id, token);
    }
    token.owner = to;

    const { id, block, transactionHash, timestamp } = transferData;

    const transfer = new Transfer({
      id,
      block,
      timestamp,
      transactionHash,
      from,
      to,
      token,
    });

    transfers.add(transfer);
  }

  await ctx.store.save([...owners.values()]);
  await ctx.store.save([...tokens.values()]);
  await ctx.store.save([...transfers]);
}
