import { bech32 } from 'bech32';
import type { Infer } from 'superstruct';
import { object, string, array, enums, literal, refine } from 'superstruct';

import { BaseAccount } from '../base-types';

export const BtcP2wpkhAddressStruct = refine(
  string(),
  'BtcP2wpkhAddressStruct',
  (address: string) => {
    try {
      bech32.decode(address);
    } catch (error) {
      return new Error(
        `Could not decode P2WPKH address: ${(error as Error).message}`,
      );
    }
    return true;
  },
);

/**
 * Supported Bitcoin methods.
 */
export enum BtcMethod {
  // General transaction methods
  SendMany = 'btc_sendmany',
}

/**
 * Supported Bitcoin account types.
 */
export enum BtcAccountType {
  P2wpkh = 'bip122:p2wpkh',
}

export const BtcP2wpkhAccountStruct = object({
  ...BaseAccount,

  /**
   * Account type.
   */
  type: literal(`${BtcAccountType.P2wpkh}`),

  /**
   * Account supported methods.
   */
  methods: array(enums([`${BtcMethod.SendMany}`])),
});

export type BtcP2wpkhAccount = Infer<typeof BtcP2wpkhAccountStruct>;
