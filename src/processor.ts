import {SubstrateBatchProcessor, SubstrateProcessor, toHex} from '@subsquid/substrate-processor'
import {TypeormDatabase} from '@subsquid/typeorm-store'
import {ethers, UnsignedTransaction} from 'ethers'
import {SignatureLike} from '@ethersproject/bytes'
import * as erc20 from './erc20'
import {Transaction} from './model'
import {EthereumTransactCall} from './types/calls'
import {CallContext} from './types/support'
import {toJSON} from '@subsquid/util-internal-json'
import { lookupArchive } from '@subsquid/archive-registry'
import assert from 'assert'


const processor = new SubstrateBatchProcessor()


processor.setDataSource({
      archive: lookupArchive('astar', { release: 'FireSquid' }),
      chain: process.env.PINKNODE_ASTAR_GRPC || 'wss://public-rpc.pinknode.io/astar'
  })
  .setBatchSize(100)
  .addCall('Ethereum.transact', { 
    data: {
      call: true
    }
  })

processor.run(new TypeormDatabase(), async ctx => {
  const txs: Transaction[] = []
  for (let block of ctx.blocks) {
    for (let item of block.items) {
  
      assert(item.kind == 'call');
      
      const callCtx = { block, call: item.call, _chain: ctx._chain }
      
      let data = getTransactionData((callCtx as any) as CallContext)
      let serializedTransaction = ethers.utils.serializeTransaction(data.tx, data.signature)
      let transaction = ethers.utils.parseTransaction(serializedTransaction)

      let input = decodeInput(transaction.data)

      if (transaction.to == undefined || transaction.from == undefined) {
        ctx.log.debug(`Skipping tx ${transaction.hash}`)
        continue;
      }
        
      const tx = new Transaction({
          id: callCtx.call.id,
          block: block.header.height,
          timestamp: new Date(block.header.timestamp),
          txHash: transaction.hash,
          from: transaction.from,
          to: transaction.to,
          type: transaction.type || 0,
          method: input.method,
          input: toJSON(input)
      })
      ctx.log.debug(`Tx: ${tx.txHash}, From: ${tx.from} To: ${tx.to} Method: ${tx.method}`)
      txs.push(tx)
    }
  } 
  await ctx.store.save(txs)
})


function decodeInput(input: string): {method: string, args: any[]}  {
    let sighash = input.slice(0, 10)

    switch (sighash) {
        case erc20.functions['approve(address,uint256)'].sighash: {
            const decoded = erc20.functions['approve(address,uint256)'].decode(input)
            return {
                method: 'approve',
                args: [decoded[0], decoded[1].toBigInt()]
            }
        }
        case erc20.functions['transfer(address,uint256)'].sighash: {
            const decoded = erc20.functions['transfer(address,uint256)'].decode(input)
            return {
                method: 'transfer',
                args: [decoded[0], decoded[1].toBigInt()]
            }
        }
        case erc20.functions['transferFrom(address,address,uint256)'].sighash: {
            const decoded = erc20.functions['transferFrom(address,address,uint256)'].decode(input)
            return {
                method: 'transferFrom',
                args: [decoded[0], decoded[0], decoded[2].toBigInt()]
            }
        }
        default:
            return  { method: 'unknown', args: [input] }
    }
}


function getTransactionData(ctx: CallContext): {tx: UnsignedTransaction, signature: SignatureLike} {
    let call = new EthereumTransactCall(ctx)

    if (call.isV1) {
        const data = call.asV1.transaction
        return {
            tx: {
                to: data.action.__kind === 'Call' ? toHex(data.action.value) : undefined,
                nonce: Number(data.nonce[0]),
                gasLimit: data.gasLimit[0],
                gasPrice: data.gasPrice[0],
                value: data.value[0],
                data: data.input,
                type: 0,
            },
            signature: {
                v: Number(data.signature.v),
                r: toHex(data.signature.r),
                s: toHex(data.signature.s),
            }
        }
    } else if (call.isV9) {
        const transaction = call.asV9.transaction
        switch (transaction.__kind) {
            case 'Legacy': {
                const data = transaction.value
                return {
                    tx: {
                        to: data.action.__kind === 'Call' ? toHex(data.action.value) : undefined,
                        nonce: Number(data.nonce[0]),
                        gasLimit: data.gasLimit[0],
                        gasPrice: data.gasPrice[0],
                        value: data.value[0],
                        data: data.input,
                        type: 0,
                    },
                    signature: {
                        v: Number(data.signature.v),
                        r: toHex(data.signature.r),
                        s: toHex(data.signature.s),
                    }
                }
            }
            case 'EIP1559': {
                const data = transaction.value
                return {
                    tx: {
                        to: data.action.__kind === 'Call' ? toHex(data.action.value) : undefined,
                        nonce: Number(data.nonce[0]),
                        gasLimit: data.gasLimit[0],
                        maxFeePerGas: data.maxFeePerGas[0],
                        maxPriorityFeePerGas: data.maxPriorityFeePerGas[0],
                        value: data.value[0],
                        data: data.input,
                        chainId: Number(data.chainId),
                        accessList: data.accessList.map((a) => [
                            toHex(a.address),
                            a.storageKeys.map((k) => toHex(k))
                        ]) as [string, string[]][],
                        type: 2,
                    },
                    signature: {
                        r: toHex(data.r),
                        s: toHex(data.s),
                        v: Number(data.chainId),
                    }
                }
            }
            case 'EIP2930': {
                const data = transaction.value
                return {
                    tx: {
                        to: data.action.__kind === 'Call' ? toHex(data.action.value) : undefined,
                        nonce: Number(data.nonce[0]),
                        gasLimit: data.gasLimit[0],
                        gasPrice: data.gasPrice[0],
                        value: data.value[0],
                        data: data.input,
                        chainId: Number(data.chainId),
                        accessList: data.accessList.map((a) => [
                            toHex(a.address),
                            a.storageKeys.map((k) => toHex(k))
                        ]) as [string, string[]][],
                        type: 1,
                    },
                    signature: {
                        r: toHex(data.r),
                        s: toHex(data.s),
                        v: Number(data.chainId),
                    }
                }
            }
        }
    } else {
        throw new Error()
    }
}
