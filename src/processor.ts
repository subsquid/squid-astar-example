import {SubstrateBatchProcessor, SubstrateProcessor, toHex} from '@subsquid/substrate-processor'
import {TypeormDatabase} from '@subsquid/typeorm-store'
import * as fs from 'fs' 
import * as erc20 from './erc20'
import {Transaction} from './model'
import { lookupArchive } from '@subsquid/archive-registry'
import assert from 'assert'
import { getTransaction } from '@subsquid/substrate-frontier-evm'
import { TransactionType } from '@subsquid/substrate-frontier-evm/lib/transaction'

const APPROVE_MAX_VALUE=115792089237316195423570985008687907853269984665640564039457584007913129639935n

// append on restarts
const csvWriter = fs.createWriteStream(`${__dirname}/../assets/erc20.csv`, { flags: 'w', encoding: "utf-8" })
csvWriter.write(`id,block,timestamp,txHash,from,to,type,method,amount\n`)

const processor = new SubstrateBatchProcessor()

processor.setDataSource({
      archive: lookupArchive('astar', { release: 'FireSquid' }),
  })
  .setBatchSize(100)
  .addEthereumTransaction('*', { 
    sighash: erc20.functions['approve(address,uint256)'].sighash,
    data: {
      call: true
    }
  })
  .addEthereumTransaction('*', { 
    sighash: erc20.functions['transfer(address,uint256)'].sighash,
    data: {
      call: true
    }
  })
  .addEthereumTransaction('*', { 
    sighash: erc20.functions['transferFrom(address,address,uint256)'].sighash,
    data: {
      call: true
    }
  })

processor.run(new TypeormDatabase(), async ctx => {
  const txs: Transaction[] = []
  for (let block of ctx.blocks) {
    for (let item of block.items) {
  
      assert(item.kind == 'call');
      
      let txData = getTransaction(ctx, item.call as any)
      //let serializedTransaction = ethers.utils.serializeTransaction(data.tx, data.signature)
      //let transaction = ethers.utils.parseTransaction(serializedTransaction)
      let erc20Data = decodeErc20Data(txData.input)

      if (txData.to == undefined || txData.from == undefined) {
        ctx.log.debug(`Skipping tx ${txData.hash}`)
        continue;
      }
        
      const tx = new Transaction({
          id: item.call.id,
          block: block.header.height,
          timestamp: new Date(block.header.timestamp),
          txHash: txData.hash,
          from: txData.from,
          to: txData.to,
          type: txData.type || 0,
          method: erc20Data.method,
          amount: erc20Data.value
      })
      ctx.log.debug(`Tx: ${tx.txHash}, From: ${tx.from} To: ${tx.to} Method: ${tx.method}`)
      txs.push(tx)
    }
  } 
  for (const tx of txs) {
    csvWriter.write(`${tx.id},${tx.block},${tx.timestamp.getTime()},${tx.txHash},${tx.from},${tx.to},${TransactionType[tx.type]},${tx.method},${tx.amount}\n`)
  }
})


function decodeErc20Data(input: string): {method: string, value: bigint}  {
    let sighash = input.slice(0, 10)

    switch (sighash) {
        case erc20.functions['approve(address,uint256)'].sighash: {
            const decoded = erc20.functions['approve(address,uint256)'].decode(input)
            let v = decoded[1].toBigInt()
            return {
                method: 'approve',
                // -1 means approve
                value: v == APPROVE_MAX_VALUE ? -1n : v
            }
        }
        case erc20.functions['transfer(address,uint256)'].sighash: {
            const decoded = erc20.functions['transfer(address,uint256)'].decode(input)
            return {
                method: 'transfer',
                value: decoded[1].toBigInt()
            }
        }
        case erc20.functions['transferFrom(address,address,uint256)'].sighash: {
            const decoded = erc20.functions['transferFrom(address,address,uint256)'].decode(input)
            return {
                method: 'transferFrom',
                value: decoded[2].toBigInt()
            }
        }
        default:
            return  { method: 'unknown', value: 0n }
    }
}

