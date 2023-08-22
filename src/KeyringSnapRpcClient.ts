import type { MetaMaskInpageProvider } from '@metamask/providers';

import type { InternalRequest, InternalResponse } from './internal-api';
import { KeyringClient, type Sender } from './KeyringClient';

/**
 * Implementation of the `Sender` interface that can be used to send requests
 * to a snap through the snap JSON-RPC API.
 */
export class SnapRpcSender implements Sender {
  #origin: string;

  #provider: MetaMaskInpageProvider;

  /**
   * Create a new instance of `SnapRpcSender`.
   *
   * @param origin - The caller's origin.
   * @param provider - The `MetaMaskInpageProvider` instance to use.
   */
  constructor(origin: string, provider: MetaMaskInpageProvider) {
    this.#origin = origin;
    this.#provider = provider;
  }

  /**
   * Send a request to the snap and return the response.
   *
   * @param request - The JSON-RPC request to send to the snap.
   * @returns A promise that resolves to the response of the request.
   */
  async send(request: InternalRequest): Promise<InternalResponse> {
    const response = await this.#provider.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: this.#origin,
        request,
      },
    });

    return response as InternalResponse;
  }
}

/**
 * A `KeyringClient` that allows the communication with a snap through the snap
 * JSON-RPC API.
 */
export class KeyringSnapRpcClient extends KeyringClient {
  /**
   * Create a new instance of `KeyringSnapRpcClient`.
   *
   * @param origin - Caller's origin.
   * @param provider - The `MetaMaskInpageProvider` instance to use.
   */
  constructor(origin: string, provider: MetaMaskInpageProvider) {
    super(new SnapRpcSender(origin, provider));
  }
}
