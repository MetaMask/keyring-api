import type { Infer, Struct } from 'superstruct';
import { boolean, string, number, define, mask, validate } from 'superstruct';

import { BaseKeyringAccountStruct } from '../api';
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

export const InternalEthEoaAccountStruct = object({
  ...EthEoaAccountStruct.schema,
  ...InternalAccountMetadataStruct.schema,
});

export type InternalEthEoaAccount = Infer<typeof InternalEthEoaAccountStruct>;

export const InternalEthErc4337AccountStruct = object({
  ...EthErc4337AccountStruct.schema,
  ...InternalAccountMetadataStruct.schema,
});

export type InternalEthErc4337Account = Infer<
  typeof InternalEthErc4337AccountStruct
>;

export const InternalAccountStructs: Record<
  string,
  Struct<InternalEthEoaAccount> | Struct<InternalEthErc4337Account>
> = {
  [`${EthAccountType.Eoa}`]: InternalEthEoaAccountStruct,
  [`${EthAccountType.Erc4337}`]: InternalEthErc4337AccountStruct,
};

export const InternalAccountStruct = define(
  'InternalAccount',
  (value: unknown) => {
    const account = mask(value, BaseKeyringAccountStruct);

    // At this point, we know that `value.type` can be used as an index for `KeyringAccountStructs`
    const [error] = validate(
      value,
      InternalAccountStructs[account.type] as Struct,
    );

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
