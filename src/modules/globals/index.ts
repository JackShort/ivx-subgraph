import { BigInt } from '@graphprotocol/graph-ts'
import { GlobalResult } from '../../../generated/schema'
let ZERO = BigInt.fromI32(0)

export namespace globals {
  export function getGlobalEntity(): GlobalResult {
    let globalId = '0x0'
    let globalResult = GlobalResult.load(globalId)

    if (globalResult == null) {
      globalResult = new GlobalResult(globalId)
      globalResult.totalMinted = ZERO
      globalResult.totalRedeemed = ZERO
    }

    return globalResult as GlobalResult
  }
}
