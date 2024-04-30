import { assert } from 'superstruct';

import { EthAccountType } from './eth';
import type { InternalAccount } from './internal';
import { InternalAccountStruct } from './internal';

/**
 * Checks if the given internal account is of the EVM account type.
 * @param account - The internal account to check.
 * @returns Returns true if the internal account has an EVM account type, false otherwise.
 */
export function isEvmAccount(account: InternalAccount): boolean {
  // using try catch here to avoid throwing an error because the internal account's define would throw the error.
  try {
    assert(account, InternalAccountStruct);
    return (
      account.type === EthAccountType.Eoa ||
      account.type === EthAccountType.Erc4337
    );
  } catch {
    return false;
  }
}
