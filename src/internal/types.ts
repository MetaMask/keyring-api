import type { Infer } from 'superstruct';
import { boolean, string, number } from 'superstruct';

import { KeyringAccountStruct } from '../api';
import { exactOptional, object } from '../superstruct';

export const InternalAccountStruct = object({
  ...KeyringAccountStruct.schema,
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
    keyring: object({
      type: string(),
    }),
  }),
});

/**
 * Internal account representation.
 *
 * This type is used internally by MetaMask to add additional metadata to the
 * account object. It's should not be used by external applications.
 */
export type InternalAccount = Infer<typeof InternalAccountStruct>;
