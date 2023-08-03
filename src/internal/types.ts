import { boolean, object, optional, string, type Infer } from 'superstruct';

import { KeyringAccountStruct } from '../api';

export const InternalAccountStruct = object({
  ...KeyringAccountStruct.schema,
  metadata: object({
    snap: optional(
      object({
        id: string(),
        name: optional(string()),
        enabled: optional(boolean()),
      }),
    ),
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
