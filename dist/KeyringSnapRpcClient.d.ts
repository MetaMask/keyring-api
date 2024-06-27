import type { MetaMaskInpageProvider } from '@metamask/providers';
import type { Json } from '@metamask/utils';
import type { JsonRpcRequest } from './JsonRpcRequest';
import type { Sender } from './KeyringClient';
import { KeyringClient } from './KeyringClient';
/**
 * Implementation of the `Sender` interface that can be used to send requests
 * to a snap through the snap JSON-RPC API.
 */
export declare class SnapRpcSender implements Sender {
    #private;
    /**
     * Create a new instance of `SnapRpcSender`.
     *
     * @param origin - The caller's origin.
     * @param provider - The `MetaMaskInpageProvider` instance to use.
     */
    constructor(origin: string, provider: MetaMaskInpageProvider);
    /**
     * Send a request to the snap and return the response.
     *
     * @param request - The JSON-RPC request to send to the snap.
     * @returns A promise that resolves to the response of the request.
     */
    send(request: JsonRpcRequest): Promise<Json>;
}
/**
 * A `KeyringClient` that allows the communication with a snap through the snap
 * JSON-RPC API.
 */
export declare class KeyringSnapRpcClient extends KeyringClient {
    /**
     * Create a new instance of `KeyringSnapRpcClient`.
     *
     * @param origin - Caller's origin.
     * @param provider - The `MetaMaskInpageProvider` instance to use.
     */
    constructor(origin: string, provider: MetaMaskInpageProvider);
}
