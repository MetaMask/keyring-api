import type { Infer } from 'superstruct';
import { string } from 'superstruct';

import { object } from '../superstruct';

/**
 * Struct of a UserOperation as defined by ERC-4337.
 * @see https://eips.ethereum.org/EIPS/eip-4337#definitions
 */
export const EthUserOperationStruct = object({
  sender: string(),
  nonce: string(),
  initCode: string(),
  callData: string(),
  callGasLimit: string(),
  verificationGasLimit: string(),
  preVerificationGas: string(),
  maxFeePerGas: string(),
  maxPriorityFeePerGas: string(),
  paymasterAndData: string(),
  signature: string(),
});

export type EthUserOperation = Infer<typeof EthUserOperationStruct>;
