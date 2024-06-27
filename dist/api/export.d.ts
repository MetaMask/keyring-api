import type { Infer } from '@metamask/superstruct';
export declare const KeyringAccountDataStruct: import("@metamask/superstruct").Struct<Record<string, import("@metamask/utils").Json>, null>;
/**
 * Response to a call to `exportAccount`.
 *
 * The exact response depends on the keyring implementation.
 */
export type KeyringAccountData = Infer<typeof KeyringAccountDataStruct>;
