import { object, array, enums, literal } from 'superstruct';

import { BaseAccount } from '../base-types';
import { definePattern } from '../superstruct';

export const EthBytesStruct = definePattern('EthBytes', /^0x[0-9a-f]*$/iu);

export const EthAddressStruct = definePattern(
  'EthAddress',
  /^0x[0-9a-f]{40}$/iu,
);

export const EthUint256Struct = definePattern(
  'EthUint256',
  /^0x([1-9a-f][0-9a-f]*|0)$/iu,
);

/**
 * Supported Ethereum methods.
 */
export enum EthMethod {
  // General signing methods
  PersonalSign = 'personal_sign',
  Sign = 'eth_sign',
  SignTransaction = 'eth_signTransaction',
  SignTypedDataV1 = 'eth_signTypedData_v1',
  SignTypedDataV3 = 'eth_signTypedData_v3',
  SignTypedDataV4 = 'eth_signTypedData_v4',
}

/**
 * Supported Ethereum methods for ERC-4337 (Account Abstraction) accounts.
 */
export enum EthErc4337Method {
  // ERC-4337 methods
  PrepareUserOperation = 'eth_prepareUserOperation',
  PatchUserOperation = 'eth_patchUserOperation',
  SignUserOperation = 'eth_signUserOperation',
}

/**
 * Supported Ethereum account types.
 */
export enum EthAccountType {
  Eoa = 'eip155:eoa',
  Erc4337 = 'eip155:erc4337',
}

export const EthEoaAccountStruct = object({
  ...BaseAccount,

  /**
   * Account type.
   */
  type: literal(`${EthAccountType.Eoa}`),

  /**
   * Account supported methods.
   */
  methods: array(
    enums([
      `${EthMethod.PersonalSign}`,
      `${EthMethod.Sign}`,
      `${EthMethod.SignTransaction}`,
      `${EthMethod.SignTypedDataV1}`,
      `${EthMethod.SignTypedDataV3}`,
      `${EthMethod.SignTypedDataV4}`,
    ]),
  ),
});

export const EthErc4337AccountStruct = object({
  ...BaseAccount,

  /**
   * Account type.
   */
  type: literal(`${EthAccountType.Erc4337}`),

  /**
   * Account supported methods.
   */
  methods: array(
    enums([
      `${EthMethod.PersonalSign}`,
      `${EthMethod.Sign}`,
      `${EthMethod.SignTransaction}`,
      `${EthMethod.SignTypedDataV1}`,
      `${EthMethod.SignTypedDataV3}`,
      `${EthMethod.SignTypedDataV4}`,
      `${EthErc4337Method.PrepareUserOperation}`,
      `${EthErc4337Method.PatchUserOperation}`,
      `${EthErc4337Method.SignUserOperation}`,
    ]),
  ),
});
