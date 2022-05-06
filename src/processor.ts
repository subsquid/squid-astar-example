import { EvmLogHandlerContext, SubstrateEvmProcessor } from "@subsquid/substrate-evm-processor";
import { lookupArchive } from "@subsquid/archive-registry";
import { events } from "./abi/bank-safe";
import { Investement } from "./model";

const processor = new SubstrateEvmProcessor("astar-substrate");

processor.setBatchSize(500);

processor.setDataSource({
  chain: "wss://astar.api.onfinality.io/public-ws",
  archive: lookupArchive("astar")[0].url,
});

processor.setTypesBundle("astar");
processor.addEvmLogHandler(
  "0xd89dEa2daC8Fb73F4107C2cbeA5Eb36dab511F64".toLowerCase(),
  {
      filter: [events["InvestDeposited(uint256)"].topic],
      range: {from: 864889}
  },
  bankSafeHandler
);

processor.run();

export async function bankSafeHandler(
  ctx: EvmLogHandlerContext
): Promise<void> {
  const investDeposit = events["InvestDeposited(uint256)"].decode(ctx);
  await ctx.store.save(
      new Investement({
          id: ctx.txHash,
          timestamp: BigInt(ctx.substrate.block.timestamp),
          value: (Number(investDeposit.amount) / 1e6)
      })
  )
}
