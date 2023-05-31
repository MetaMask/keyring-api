import { Json } from '@metamask/utils';

import {
  Keyring,
  KeyringAccount,
  KeyringRequest,
  SubmitRequestResponse,
} from './keyring-api';
import { KeyringInternalRequest } from './keyring-internal-api';

export type Sender = {
  send<Response extends Json>(
    request: KeyringInternalRequest,
  ): Promise<Response>;
};

export class KeyringClient implements Keyring {
  #sender: Sender;

  constructor(sender: Sender) {
    this.#sender = sender;
  }

  async listAccounts(): Promise<KeyringAccount[]> {
    console.log('[client] listAccounts');
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

  async submitRequest<Result extends Json = null>(
    request: KeyringRequest,
  ): Promise<SubmitRequestResponse<Result>> {
    return await this.#sender.send<SubmitRequestResponse<Result>>({
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
