import { JsonStruct } from '@metamask/utils';
import { object, record, string } from 'superstruct';

import { UuidStruct } from './utils';

/**
 * Base type for any account. This type muse be composed and extended to add a `methods`
 * and `type` fields.
 *
 * NOTE: This type isn't a `superstruct.object` as it is used to compose other objects. See
 * {@link BaseAccountStruct}.
 */
export const BaseAccount = {
  /**
   * Account ID (UUIDv4).
   */
  id: UuidStruct,

  /**
   * Account address or next receive address (UTXO).
   */
  address: string(),

  /**
   * Keyring-dependent account options.
   */
  options: record(string(), JsonStruct),
};

/**
 * Base type for any account as a `superstruct.object`.
 */
export const BaseAccountStruct = object(BaseAccount);
