import { BigInt, Bytes } from '@graphprotocol/graph-ts'
import { accounts, tokens, transactions } from '../modules'

export namespace transfer {
  export function handleMint(to: Bytes, tokenId: string, timestamp: BigInt, blockId: string, ivxId: BigInt): void {
    let account = accounts.getOrCreateAccount(to)
    account.ivxId = ivxId
    account.save()

    let token = tokens.mintToken(tokenId, account.id)
    token.save()

    let transaction = transactions.getNewMint(account.id, tokenId, ivxId, timestamp, blockId)
    transaction.save()
  }
}
