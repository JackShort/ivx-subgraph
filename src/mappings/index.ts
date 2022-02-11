import { BigInt } from '@graphprotocol/graph-ts'
import { ADDRESS_ZERO } from '@protofire/subgraph-toolkit'
import { Redeemed, Transfer } from '../generated/IVxFactory/IVxFactory'
import { ExampleEntity } from '../generated/schema'

export function handleRedeemed(event: Redeemed): void {}

export function handleTransfer(event: Transfer): void {}
