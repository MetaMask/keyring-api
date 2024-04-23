import type { Infer } from 'superstruct';
import { union, boolean, string, number } from 'superstruct';

import { EthEoaAccountStruct, EthErc4337AccountStruct } from '../eth/types';
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

export const InternalAccountStruct = union([
  object({ ...EthEoaAccountStruct.schema, ...InternalAccountMetadataStruct.schema }),
  object({ ...EthErc4337AccountStruct.schema, ...InternalAccountMetadataStruct.schema }),
]);

/**
 * Internal account representation.
 *
 * This type is used internally by MetaMask to add additional metadata to the
 * account object. It's should not be used by external applications.
 */
export type InternalAccount = Infer<typeof InternalAccountStruct>;
