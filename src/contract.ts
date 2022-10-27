import { Store } from "@subsquid/typeorm-store";
import { Contract } from "./model";

export const CHAIN_NODE = "wss://astar.public.blastapi.io";
export const astarDegensAddress = "0xd59fC6Bfd9732AB19b03664a45dC29B8421BDA9a";
export const astarCatsAddress = "0x8b5d62f396Ca3C6cF19803234685e693733f9779";

export const contractMapping: Map<string, Contract> = new Map<
  string,
  Contract
>();

contractMapping.set(astarDegensAddress, {
    id: astarDegensAddress,
    name: "AstarDegens",
    symbol: "DEGEN",
    totalSupply: 10000n,
    mintedTokens: [],
  }
);

contractMapping.set(astarCatsAddress, {
    id: astarCatsAddress,
    name: "AstarCats",
    symbol: "CAT",
    totalSupply: 7777n,
    mintedTokens: [],
  }
);

export function createContractEntity(address: string): Contract {
  const contractObj = contractMapping.get(address);
  if (contractObj)
    return new Contract(contractObj);
  
  throw new Error("could not find a contract with that address");
}

const contractAddresstoModel: Map<string, Contract> = new Map<
string,
Contract
>();

export async function getContractEntity(
  store: Store,
  address: string
): Promise<Contract | undefined> {
  if (contractAddresstoModel.get(address) == null) {
    let contractEntity = await store.get(Contract, address);
    if (contractEntity == null) {
      contractEntity = createContractEntity(address);
      await store.insert(contractEntity);
      contractAddresstoModel.set(address, contractEntity)
    }
  }
  
  return contractAddresstoModel.get(address);
}
