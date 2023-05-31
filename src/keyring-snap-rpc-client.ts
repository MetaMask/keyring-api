import { Json } from '@metamask/utils';
import { v4 as uuid } from 'uuid';

import { KeyringClient, Sender } from './keyring-client';

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
   * @param args - The arguments of the request.
   * @param args.method - The method name of the request.
   * @param args.params - The parameters of the request (optional).
   * @returns A promise that resolves to the response of the request.
   */
  async send<Response extends Json>({
    method,
    params,
  }: {
    method: string;
    params?: Json[] | Record<string, Json>;
  }): Promise<Response> {
    // eslint-disable-next-line no-restricted-globals
    const response = await window.ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: this.#origin,
        request: {
          jsonrpc: '2.0',
          id: uuid(),
          method,
          ...(params !== undefined && { params }),
        },
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
