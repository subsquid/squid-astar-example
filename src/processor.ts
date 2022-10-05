import {SubstrateBatchProcessor} from '@subsquid/substrate-processor'
import {TypeormDatabase} from '@subsquid/typeorm-store'
import * as fs from 'fs' 
import * as erc20 from './erc20'
import {Transaction} from './model'
import { lookupArchive } from '@subsquid/archive-registry'
import { getTransaction } from '@subsquid/substrate-frontier-evm'
import { TransactionType } from '@subsquid/substrate-frontier-evm/lib/transaction'

const APPROVE_MAX_VALUE=115792089237316195423570985008687907853269984665640564039457584007913129639935n

// append on restarts
const csvWriter = fs.createWriteStream(`${__dirname}/../assets/astar-transactions.csv`, { flags: 'w', encoding: "utf-8" })
csvWriter.write(`id,block,timestamp,txHash,from,to,type,sighash,amount\n`)

const processor = new SubstrateBatchProcessor()
   .setDataSource({
      archive: lookupArchive('astar', { release: 'FireSquid' }),
  })
  .setBatchSize(100)
  .addEthereumTransaction('*', {
    data: {
        call: true,
    }
 })

processor.run(new TypeormDatabase(), async ctx => {
  const txs: Transaction[] = []
  for (let block of ctx.blocks) {
    for (let item of block.items) {
      if (item.kind === 'call' && item.name === 'Ethereum.transact') {
      
        let txData = getTransaction(ctx, item.call)
        let erc20Data = maybeErc20Data(txData.input)

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
            sighash: txData.input.slice(0, 10),
            amount: erc20Data.value
        })
        ctx.log.debug(`Tx: ${tx.txHash}, From: ${tx.from} To: ${tx.to} sighash: ${tx.sighash}`)
        txs.push(tx)
      }
    }
  } 
  for (const tx of txs) {
    csvWriter.write(`${tx.id},${tx.block},${tx.timestamp.getTime()},${tx.txHash},${tx.from},${tx.to},${TransactionType[tx.type]},${tx.sighash},${tx.amount}\n`)
  }
})


function maybeErc20Data(input: string): {method: string, value: bigint}  {
    let sighash = input.slice(0, 10)

    switch (sighash) {
        case erc20.functions['approve(address,uint256)'].sighash: {
            const decoded = erc20.functions['approve(address,uint256)'].decode(input)
            let v = decoded[1].toBigInt()
            return {
                method: 'approve',
                // -1 means approve MAX
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

