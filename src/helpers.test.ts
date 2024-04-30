import { BtcAccountType } from './btc';
import { EthAccountType } from './eth';
import { isEvmAccountType } from './helpers';

describe('isEVMAccountType', () => {
  it.each([
    [EthAccountType.Eoa, true],
    [EthAccountType.Erc4337, true],
    [BtcAccountType.P2wpkh, false],
    [{}, false],
    [null, false],
    ['bitcoin', false],
  ])('%s should return %s', (account, result) => {
    // @ts-expect-error for error cases
    expect(isEvmAccountType(account)).toBe(result);
  });
});
