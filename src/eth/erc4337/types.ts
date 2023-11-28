import { string, type Infer } from 'superstruct';

import { object } from '../../superstruct';
import { EthAddressStruct, EthBytesStruct, EthUint256Struct } from '../types';

/**
 * Struct of a UserOperation as defined by ERC-4337.
 * @see https://eips.ethereum.org/EIPS/eip-4337#definitions
 */
export const EthUserOperationStruct = object({
  sender: EthAddressStruct,
  nonce: EthUint256Struct,
  initCode: EthBytesStruct,
  callData: EthBytesStruct,
  callGasLimit: EthUint256Struct,
  verificationGasLimit: EthUint256Struct,
  preVerificationGas: EthUint256Struct,
  maxFeePerGas: EthUint256Struct,
  maxPriorityFeePerGas: EthUint256Struct,
  paymasterAndData: EthBytesStruct,
  signature: EthBytesStruct,
});

export type EthUserOperation = Infer<typeof EthUserOperationStruct>;

/**
 * Struct containing the most basic transaction information required to
 * construct a UserOperation.
 */
export const EthBasicTransactionStruct = object({
  /**
   * Address of the transaction recipient.
   */
  to: EthAddressStruct,

  /**
   * Amount of wei to transfer to the recipient.
   */
  value: EthUint256Struct,

  /**
   * Data to pass to the recipient.
   */
  data: EthBytesStruct,
});

export type EthBasicTransaction = Infer<typeof EthBasicTransactionStruct>;

export const EthPreparedUserOperationStruct = object({
  callData: EthBytesStruct,
  initCode: EthBytesStruct,
  nonce: EthUint256Struct,
  gasLimits: object({
    callGasLimit: EthUint256Struct,
    verificationGasLimit: EthUint256Struct,
    preVerificationGas: EthUint256Struct,
  }),
  dummySignature: EthBytesStruct,
  dummyPaymasterAndData: EthBytesStruct,
  bundlerUrl: string(),
});

export type EthPreparedUserOperation = Infer<
  typeof EthPreparedUserOperationStruct
>;
