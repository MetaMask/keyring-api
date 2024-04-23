import type { Infer } from 'superstruct';
import { boolean, string, number, define, mask, validate } from 'superstruct';

import { KeyringAccountTypedStruct } from '../api';
import {
  EthEoaAccountStruct,
  EthErc4337AccountStruct,
  EthAccountType,
} from '../eth/types';
import { exactOptional, object } from '../superstruct';

export const InternalAccountMetadataStruct = object({
  metadata: object({
    name: string(),
    snap: exactOptional(
      object({
        id: string(),
        enabled: boolean(),
        name: string(),
      }),
    ),
    lastSelected: exactOptional(number()),
    importTime: number(),
    keyring: object({
      type: string(),
    }),
  }),
});

export const InternalAccountStructs: Record<string, any> = {
  [`${EthAccountType.Eoa}`]: object({
    ...EthEoaAccountStruct.schema,
    ...InternalAccountMetadataStruct.schema,
  }),
  [`${EthAccountType.Erc4337}`]: object({
    ...EthErc4337AccountStruct.schema,
    ...InternalAccountMetadataStruct.schema,
  }),
};

export const InternalAccountStruct = define(
  'InternalAccount',
  (value: unknown) => {
    const account = mask(value, KeyringAccountTypedStruct);

    // At this point, we know that `value.type` can be used as an index for `KeyringAccountStructs`
    const [error] = validate(value, InternalAccountStructs[account.type]);

    return error ?? true;
  },
);

/**
 * Internal account representation.
 *
 * This type is used internally by MetaMask to add additional metadata to the
 * account object. It's should not be used by external applications.
 */
export type InternalAccount = Infer<typeof InternalAccountStruct>;
