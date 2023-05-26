import { HandlerType } from '@metamask/snap-utils/*';
import { Json } from '@metamask/utils';
import { v4 as uuid } from 'uuid';

import { Keyring, KeyringAccount, KeyringRequest } from './api';

export type Sender = {
  send<Response extends Json>({
    method,
    params,
  }: {
    method: string;
    params?: Json[] | Record<string, Json>;
  }): Promise<Response>;
};

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

export class SnapControllerSender implements Sender {
  #snapId: string;

  #origin: string;

  #controller: any;

  #handler: HandlerType;

  constructor(
    controller: any,
    snapId: string,
    origin = 'metamask',
    handler: HandlerType = HandlerType.OnRpcRequest,
  ) {
    this.#controller = controller;
    this.#snapId = snapId;
    this.#origin = origin;
    this.#handler = handler;
  }

  async send<Response extends Json>({
    method,
    params,
  }: {
    method: string;
    params?: Json[] | Record<string, Json>;
  }): Promise<Response> {
    return await this.#controller.handleRequest({
      snapId: this.#snapId,
      origin: this.#origin,
      handler: this.#handler,
      request: {
        jsonrpc: '2.0',
        id: uuid(),
        method,
        params,
      },
    });
  }
}

export class KeyringClient implements Keyring {
  #sender: Sender;

  constructor(sender: Sender) {
    this.#sender = sender;
  }

  async listAccounts(): Promise<KeyringAccount[]> {
    return await this.#sender.send<KeyringAccount[]>({
      method: 'keyring_listAccounts',
    });
  }

  async getAccount(id: string): Promise<KeyringAccount> {
    return await this.#sender.send<KeyringAccount>({
      method: 'keyring_getAccount',
      params: { id },
    });
  }

  async createAccount(
    name: string,
    chains: string[],
    options: Record<string, Json> | null = null,
  ): Promise<KeyringAccount> {
    return await this.#sender.send<KeyringAccount>({
      method: 'keyring_createAccount',
      params: { name, chains, options },
    });
  }

  async updateAccount(account: KeyringAccount): Promise<void> {
    await this.#sender.send<null>({
      method: 'keyring_updateAccount',
      params: { account },
    });
  }

  async deleteAccount(id: string): Promise<void> {
    await this.#sender.send<null>({
      method: 'keyring_deleteAccount',
      params: { id },
    });
  }

  async exportAccount(id: string): Promise<Record<string, Json>> {
    return await this.#sender.send<Record<string, Json>>({
      method: 'keyring_exportAccount',
      params: { id },
    });
  }

  async listRequests(): Promise<KeyringRequest[]> {
    return await this.#sender.send<KeyringRequest[]>({
      method: 'keyring_listRequests',
    });
  }

  async getRequest(id: string): Promise<KeyringRequest> {
    return await this.#sender.send<KeyringRequest>({
      method: 'keyring_getRequest',
      params: { id },
    });
  }

  async submitRequest(request: KeyringRequest): Promise<void> {
    await this.#sender.send<null>({
      method: 'keyring_submitRequest',
      params: request,
    });
  }

  async approveRequest(id: string): Promise<void> {
    await this.#sender.send<null>({
      method: 'keyring_approveRequest',
      params: { id },
    });
  }

  async rejectRequest(id: string): Promise<void> {
    await this.#sender.send<null>({
      method: 'keyring_rejectRequest',
      params: { id },
    });
  }
}
