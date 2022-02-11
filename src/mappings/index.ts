import { BigInt } from '@graphprotocol/graph-ts'
import { ADDRESS_ZERO } from '@protofire/subgraph-toolkit'
import { Redeemed, Transfer } from '../../generated/IVxFactory/IVxFactory'

import { transfer } from './transfer'

import { tokens, accounts, blocks, transactionsMeta } from '../modules'

export function handleTransfer(event: Transfer): void {
  let from = event.params.from.toHex()
  let to = event.params.to.toHex()
  let tokenId = event.params.tokenId.toHex()
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

  if (from == ADDRESS_ZERO) {
    transfer.handleMint(event.params.to, tokenId, timestamp, blockId)
  } else if (to == ADDRESS_ZERO) {
    transfer.handleBurn(event.params.from, tokenId, timestamp, blockId)
  } else {
    transfer.handleRegularTransfer(event.params.from, event.params.to, tokenId, timestamp, blockId)
  }
}

export function handleRedeemed(event: Redeemed): void {}
