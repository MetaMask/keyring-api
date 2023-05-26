import { Json } from '@metamask/utils';
import { v4 as uuid } from 'uuid';

import { KeyringClient, Sender } from './keyring-client';

export class SnapRpcSender implements Sender {
  #origin: string;

  constructor(origin: string) {
    this.#origin = origin;
  }

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
          params,
        },
      },
    });
    return response as Response;
  }
}

export class KeyringSnapRpcClient extends KeyringClient {
  constructor(origin: string) {
    super(new SnapRpcSender(origin));
  }
}
