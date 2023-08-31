import {
  boolean,
  object,
  optional,
  string,
  type Infer,
  number,
} from 'superstruct';

import { KeyringAccountStruct } from '../api';

export const InternalAccountStruct = object({
  ...KeyringAccountStruct.schema,
  metadata: object({
    snap: optional(
      object({
        id: string(),
        enabled: boolean(),
        name: string(),
      }),
    ),
    name: string(),
    lastActive: optional(number()),
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
