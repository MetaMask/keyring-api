import { Json } from '@metamask/utils';

import { KeyringClient, Sender } from './keyring-client';
import { InternalRequest } from './keyring-internal-api';

/**
 * Implementation of the `Sender` interface that can be used to send requests
 * to a snap through the snap JSON-RPC API.
 */
export class SnapRpcSender implements Sender {
  #origin: string;

  /**
   * Create a new instance of `SnapRpcSender`.
   *
   * @param origin - The caller's origin.
   */
  constructor(origin: string) {
    this.#origin = origin;
  }

  /**
   * Send a request to the snap and return the response.
   *
   * @param request - The JSON-RPC request to send to the snap.
   * @returns A promise that resolves to the response of the request.
   */
  async send<Response extends Json>(
    request: InternalRequest,
  ): Promise<Response> {
    // eslint-disable-next-line no-restricted-globals
    const response = await window.ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: this.#origin,
        request,
      },
    });
    return response as Response;
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
   */
  constructor(origin: string) {
    super(new SnapRpcSender(origin));
  }
}
