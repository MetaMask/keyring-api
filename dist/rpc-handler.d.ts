import type { Json } from '@metamask/utils';
import type { Keyring } from './api';
import type { JsonRpcRequest } from './JsonRpcRequest';
/**
 * Error thrown when a keyring JSON-RPC method is not supported.
 */
export declare class MethodNotSupportedError extends Error {
    constructor(method: string);
}
/**
 * Handles a keyring JSON-RPC request.
 *
 * This function is meant to be used as a handler for Keyring JSON-RPC requests
 * in an Accounts Snap.
 *
 * @param keyring - Keyring instance.
 * @param request - Keyring JSON-RPC request.
 * @returns A promise that resolves to the keyring response.
 * @example
 * ```ts
 * export const onKeyringRequest: OnKeyringRequestHandler = async ({
 *   origin,
 *   request,
 * }) => {
 *   return await handleKeyringRequest(keyring, request);
 * };
 * ```
 */
export declare function handleKeyringRequest(keyring: Keyring, request: JsonRpcRequest): Promise<Json | void>;
