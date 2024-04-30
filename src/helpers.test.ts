import { BtcAccountType, BtcMethod } from './btc';
import { EthAccountType, EthErc4337Method, EthMethod } from './eth';
import { isEvmAccount } from './helpers';
import type { InternalAccountType } from './internal';

const createMockAccount = (type: InternalAccountType) => {
  const accountMethods = {
    [BtcAccountType.P2wpkh]: [`${BtcMethod.SendMany}`],
    [EthAccountType.Eoa]: [`${EthMethod.PersonalSign}`],
    [EthAccountType.Erc4337]: [`${EthErc4337Method.SignUserOperation}`],
  };
  return {
    id: '606a7759-b0fb-48e4-9874-bab62ff8e7eb',
    address: '0x000',
    options: {},
    methods: accountMethods[type],
    type,
    metadata: {
      keyring: {
        type: 'mock-keyring',
      },
      name: 'Account 1',
      importTime: 1713153716,
    },
  };
};

describe('isEVMAccount', () => {
  it.each([
    [createMockAccount(EthAccountType.Eoa), true],
    [createMockAccount(EthAccountType.Erc4337), true],
    [createMockAccount(BtcAccountType.P2wpkh), false],
    [{}, false],
    [null, false],
    [{ type: EthAccountType.Eoa }, false],
  ])('returns true for evm account', (account, result) => {
    // @ts-expect-error for error cases
    expect(isEvmAccount(account)).toBe(result);
  });
});
