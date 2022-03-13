import { ADDRESS_ZERO } from '@protofire/subgraph-toolkit'
import { BigInt } from '@graphprotocol/graph-ts'
import { Mint, Redeem } from '../../../generated/schema'

export namespace transactions {
  export namespace constants {
    export let TRANSACTION_MINT = 'MINT'
    export let TRANSACTION_REDEEM = 'REDEEM'
  }

  export namespace helpers {
    export function getNewTransactionId(from: string, to: string, timestamp: BigInt): string {
      return from + '-' + to + '-' + timestamp.toString()
    }
  }

  export function getNewMint(to: string, token: string, ivxId: BigInt, timestamp: BigInt, blockId: string): Mint {
    let transaction = new Mint(helpers.getNewTransactionId(ADDRESS_ZERO, to, timestamp))
    transaction.from = ADDRESS_ZERO
    transaction.to = to
    transaction.ivxId = ivxId
    transaction.token = token
    transaction.block = blockId
    transaction.type = constants.TRANSACTION_MINT
    return transaction as Mint
  }

  export function getNewRedeem(to: string, token: string, timestamp: BigInt, blockId: string): Redeem {
    let transaction = new Redeem(helpers.getNewTransactionId(to, to, timestamp))
    transaction.to = to
    transaction.token = token
    transaction.block = blockId
    transaction.type = constants.TRANSACTION_REDEEM
    return transaction as Redeem
  }
}
