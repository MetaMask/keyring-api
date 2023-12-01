import type { Json, Keyring } from '@metamask/utils';

import type {
  EthBaseTransaction,
  EthBaseUserOperation,
  EthUserOperation,
  EthUserOperationPatch,
} from '../../eth';

export type EthKeyring<State extends Json> = Keyring<State> & {
  /**
   * Convert a base transaction to a base UserOperation.
   *
   * @param address - Address of the sender.
   * @param transactions - Base transactions to include in the UserOperation.
   * @returns A pseudo-UserOperation that can be used to construct a real.
   */
  prepareUserOperation?(
    address: string,
    transactions: EthBaseTransaction[],
  ): Promise<EthBaseUserOperation>;

  /**
   * Patches properties of a UserOperation. Currently, only the
   * `paymasterAndData` can be patched.
   *
   * @param address - Address of the sender.
   * @param userOp - UserOperation to patch.
   * @returns A patch to apply to the UserOperation.
   */
  patchUserOperation?(
    address: string,
    userOp: EthUserOperation,
  ): Promise<EthUserOperationPatch>;

  /**
   * Signs an UserOperation.
   *
   * @param address - Address of the sender.
   * @param userOp - UserOperation to sign.
   * @returns The signature of the UserOperation.
   */
  signUserOperation?(
    address: string,
    userOp: EthUserOperation,
  ): Promise<string>;
};
