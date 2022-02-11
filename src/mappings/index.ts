import { BigInt } from '@graphprotocol/graph-ts'
import { ADDRESS_ZERO } from '@protofire/subgraph-toolkit'
import { Redeem, Mint } from '../../generated/IVxFactory/IVxFactory'

import { transfer } from './transfer'

import { tokens, accounts, blocks, transactionsMeta, globals } from '../modules'

let ONE = BigInt.fromI32(1)

export function handleMint(event: Mint): void {
  let tokenId = event.params.tokenId.toHex()
  let ivxId = event.params.ivxId
  let blockNumber = event.block.number
  let blockId = blockNumber.toString()
  let txHash = event.transaction.hash
  let timestamp = event.block.timestamp

  let block = blocks.getOrCreateBlock(blockId, timestamp, blockNumber)
  block.save()

  let meta = transactionsMeta.getOrCreateTransactionMeta(
    txHash.toHexString(),
    blockId,
    txHash,
    event.transaction.from,
    event.transaction.gasLimit,
    event.transaction.gasPrice,
  )
  meta.save()

  transfer.handleMint(event.params.to, tokenId, timestamp, blockId, ivxId)

  let global = globals.getGlobalEntity()
  global.totalMinted = global.totalMinted.plus(ONE)
  global.save()
}

export function handleRedeemed(event: Redeem): void {
  let tokenId = event.params.tokenId.toHex()
  let ownerAddress = event.params.to
  let blockNumber = event.block.number
  let blockId = blockNumber.toString()
  let txHash = event.transaction.hash
  let timestamp = event.block.timestamp

  let meta = transactionsMeta.getOrCreateTransactionMeta(
    txHash.toHexString(),
    blockId,
    txHash,
    event.transaction.from,
    event.transaction.gasLimit,
    event.transaction.gasPrice,
  )
  meta.save()

  let block = blocks.getOrCreateBlock(blockId, timestamp, blockNumber)
  block.save()

  let owner = accounts.getOrCreateAccount(ownerAddress)
  owner.save()

  let token = tokens.redeemToken(tokenId, owner.id)
  token.save()

  let global = globals.getGlobalEntity()
  global.totalMinted = global.totalRedeemed.plus(ONE)
  global.save()
}
