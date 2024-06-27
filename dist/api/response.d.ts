import type { Infer } from '@metamask/superstruct';
export declare const KeyringResponseStruct: import("@metamask/superstruct").Struct<{
    pending: true;
    redirect?: {
        message?: string;
        url?: string;
    };
} | {
    pending: false;
    result: import("@metamask/utils").Json;
}, null>;
/**
 * Response to a call to `submitRequest`.
 *
 * Keyring implementations must return a response with `pending: true` if the
 * request will be handled asynchronously. Otherwise, the response must contain
 * the result of the request and `pending: false`.
 *
 * In the asynchronous case, the keyring can return a redirect URL and message
 * to be shown to the user. The user can choose to follow the link or cancel
 * the request. The main use case for this is to redirect the user to the snap
 * dapp to review the request.
 */
export type KeyringResponse = Infer<typeof KeyringResponseStruct>;
