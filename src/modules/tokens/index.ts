import { ADDRESS_ZERO } from '@protofire/subgraph-toolkit'
import { log } from '@graphprotocol/graph-ts'
import { Token } from '../../../generated/schema'

export namespace tokens {
  export function getOrCreateToken(tokenId: string, accountId: string): Token {
    let token = Token.load(tokenId)
    if (token == null) {
      token = new Token(tokenId)
      token.owner = accountId
    }
    return token as Token
  }

  export function loadToken(tokenId: string): Token {
    let token = Token.load(tokenId)
    if (token == null) {
      // maybe it should be created or loaded
      log.info('@@@@@ at func: {} msg: {}', ['loadToken', "Couldn't find token w/ id: " + tokenId])
      log.critical('', [''])
    }
    return token as Token
  }

  export function mintToken(tokenId: string, owner: string): Token {
    let token = getOrCreateToken(tokenId, owner)
    token.redeemed = false
    token.creator = owner
    return token as Token
  }

  export function redeemToken(tokenId: string, owner: string): Token {
    let token = getOrCreateToken(tokenId, owner)
    token.redeemed = true
    return token as Token
  }
}
