import { Json } from '@metamask/utils';
import { v4 as uuid } from 'uuid';

import { Keyring, KeyringAccount, KeyringRequest } from './api';

export class KeyringSnapClient implements Keyring {
  readonly snapId: string;

  constructor(id: string) {
    this.snapId = id;
  }

  async #sendRequest<Response extends Json>({
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
        snapId: this.snapId,
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

  async listAccounts(): Promise<KeyringAccount[]> {
    return await this.#sendRequest<KeyringAccount[]>({
      method: 'keyring_listAccounts',
    });
  }

  async getAccount(id: string): Promise<KeyringAccount> {
    return await this.#sendRequest<KeyringAccount>({
      method: 'keyring_getAccount',
      params: { id },
    });
  }

  async createAccount(
    name: string,
    chains: string[],
    options: Record<string, Json> | null = null,
  ): Promise<KeyringAccount> {
    return await this.#sendRequest<KeyringAccount>({
      method: 'keyring_createAccount',
      params: { name, chains, options },
    });
  }

  async updateAccount(account: KeyringAccount): Promise<void> {
    await this.#sendRequest<null>({
      method: 'keyring_updateAccount',
      params: { account },
    });
  }

  async deleteAccount(id: string): Promise<void> {
    await this.#sendRequest<null>({
      method: 'keyring_deleteAccount',
      params: { id },
    });
  }

  async exportAccount(id: string): Promise<Record<string, Json>> {
    return await this.#sendRequest<Record<string, Json>>({
      method: 'keyring_exportAccount',
      params: { id },
    });
  }

  async listRequests(): Promise<KeyringRequest[]> {
    return await this.#sendRequest<KeyringRequest[]>({
      method: 'keyring_listRequests',
    });
  }

  async getRequest(id: string): Promise<KeyringRequest> {
    return await this.#sendRequest<KeyringRequest>({
      method: 'keyring_getRequest',
      params: { id },
    });
  }

  async submitRequest(request: KeyringRequest): Promise<void> {
    await this.#sendRequest<null>({
      method: 'keyring_submitRequest',
      params: request,
    });
  }

  async approveRequest(id: string): Promise<void> {
    await this.#sendRequest<null>({
      method: 'keyring_approveRequest',
      params: { id },
    });
  }

  async rejectRequest(id: string): Promise<void> {
    await this.#sendRequest<null>({
      method: 'keyring_rejectRequest',
      params: { id },
    });
  }
}
