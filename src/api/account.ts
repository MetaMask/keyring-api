import { JsonStruct } from '@metamask/utils';
import type { Infer } from 'superstruct';
import { array, enums, record, string, union } from 'superstruct';

import { object } from '../superstruct';
import { UuidStruct } from '../utils';

/**
 * Supported Ethereum account types.
 */
export enum EthAccountType {
  Eoa = 'eip155:eoa',
  Erc4337 = 'eip155:erc4337',
}

/**
 * Supported Bitcoin account types.
 */
export enum BtcAccountType {
  P2wpkh = 'bip122:p2wpkh',
}

/**
 * Supported account types.
 */
export type KeyringAccountType =
  | `${EthAccountType.Eoa}`
  | `${EthAccountType.Erc4337}`
  | `${BtcAccountType.P2wpkh}`;

/**
 * A struct which represents a Keyring account object. It is abstract enough to
 * be used with any blockchain. Specific blockchain account types should extend
 * this struct.
 *
 * See {@link KeyringAccount}.
 */
export const KeyringAccountStruct = object({
  /**
   * Account ID (UUIDv4).
   */
  id: UuidStruct,

  /**
   * Account type.
   */
  type: enums([
    `${EthAccountType.Eoa}`,
    `${EthAccountType.Erc4337}`,
    `${BtcAccountType.P2wpkh}`,
  ]),

  /**
   * Account addresses. It can be a single address or a map of addresses per
   * chain.
   *
   * If the address is a string, it's assumed to be under the 'eip155'
   * namespace. Otherwise, it must be a map of addresses per chain, where the
   * key is the chain ID (CAIP-2) and the value is an array of addresses.
   *
   * @example
   * ```ts
   * address: {
   *   // Different addresses per chain.
   *   'eip155:1': ['0x1234...'],
   *   'eip155:137': ['0x5678...'],
   * }
   * ```
   * @example
   * ```ts
   * address: {
   *   // The address is the same across all 'eip155' chains.
   *   'eip155': ['0x1234...'],
   * }
   * ```
   * @example
   * ```ts
   * // Assumed to be under the 'eip155' namespace.
   * address: '0x1234...',
   * ```
   */
  address: union([string(), record(string(), array(string()))]),

  /**
   * Account options.
   */
  options: record(string(), JsonStruct),

  /**
   * Account supported methods.
   */
  methods: array(string()),
});

/**
 * Keyring Account type represents an account and its properties from the
 * point of view of the keyring.
 */
export type KeyringAccount = Infer<typeof KeyringAccountStruct>;
