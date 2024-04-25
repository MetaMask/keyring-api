import type { Json } from '@metamask/utils';
import { JsonStruct } from '@metamask/utils';
import { object, record, string } from 'superstruct';

import { UuidStruct } from './utils';

/**
 * Base type for any account. This type must be composed and extended to add a `methods`
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

/**
 * Abstract struct that is used to match every supported account type. Making sure their type
 * definition do not diverge from each others.
 *
 * NOTE: This type is using "primitive types" such as `string` to not contrain any real account
 * type. It's up to those types to use more restrictions on their type definition.
 */
export type AbstractAccount = {
  id: string;
  address: string;
  options: Record<string, Json>;
  type: string;
  methods: string[];
};

/**
 * Type helper to make sure `Type` is "equal to" `AbstractAccount`, asserting that `Type` (an account
 * type actually) never diverges from other account types.
 */
export type StaticAssertAbstractAccount<Type extends AbstractAccount> = Type;
