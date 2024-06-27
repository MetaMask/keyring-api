import type { Infer } from '@metamask/superstruct';
export declare const KeyringRequestStruct: import("@metamask/superstruct").Struct<{
    id: string;
    scope: string;
    account: string;
    request: {
        method: string;
        params?: import("@metamask/utils").Json[] | Record<string, import("@metamask/utils").Json>;
    };
}, {
    /**
     * Keyring request ID (UUIDv4).
     */
    id: import("@metamask/superstruct").Struct<string, null>;
    /**
     * Request's scope (CAIP-2 chain ID).
     */
    scope: import("@metamask/superstruct").Struct<string, null>;
    /**
     * Account ID (UUIDv4).
     */
    account: import("@metamask/superstruct").Struct<string, null>;
    /**
     * Inner request sent by the client application.
     */
    request: import("@metamask/superstruct").Struct<{
        method: string;
        params?: import("@metamask/utils").Json[] | Record<string, import("@metamask/utils").Json>;
    }, {
        method: import("@metamask/superstruct").Struct<string, null>;
        params: import("@metamask/superstruct").Struct<import("../superstruct").ExactOptionalTag | import("@metamask/utils").Json[] | Record<string, import("@metamask/utils").Json>, null>;
    }>;
}>;
/**
 * Keyring request.
 *
 * Represents a request made to the keyring for account-related operations.
 */
export type KeyringRequest = Infer<typeof KeyringRequestStruct>;
