import type { InternalAccountType } from '../internal';
import { EthAccountType } from './types';

/**
 * Checks if the given internal account is of the EVM account type.
 * @param type - The type to check.
 * @returns Returns true if the internal account has an EVM account type, false otherwise.
 */
export function isEvmAccountType(type: InternalAccountType): boolean {
  return type === EthAccountType.Eoa || type === EthAccountType.Erc4337;
}
