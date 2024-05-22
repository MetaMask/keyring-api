import { EthAccountType } from '../api';
import type { InternalAccountType } from '../internal';

/**
 * Checks if the given type is an EVM account type.
 * @param type - The type to check.
 * @returns Returns true if the type is an EVM account type, false otherwise.
 */
export function isEvmAccountType(type: InternalAccountType | string): boolean {
  return type === EthAccountType.Eoa || type === EthAccountType.Erc4337;
}
