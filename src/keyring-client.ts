import { Json } from '@metamask/utils';

import {
  Keyring,
  KeyringAccount,
  KeyringRequest,
  SubmitRequestResponse,
} from './keyring-api';
import { KeyringInternalRequest, KeyringMethod } from './keyring-internal-api';

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
    return await this.#sender.send<KeyringAccount[]>({
      method: KeyringMethod.ListAccounts,
    });
  }

  async getAccount(id: string): Promise<KeyringAccount> {
    return await this.#sender.send<KeyringAccount>({
      method: KeyringMethod.GetAccount,
      params: { id },
    });
  }

  async createAccount(
    name: string,
    options: Record<string, Json> | null = null,
  ): Promise<KeyringAccount> {
    return await this.#sender.send<KeyringAccount>({
      method: KeyringMethod.CreateAccount,
      params: { name, options },
    });
  }

  async filterSupportedChains(id: string, chains: string[]): Promise<string[]> {
    return await this.#sender.send<string[]>({
      method: KeyringMethod.FilterSupportedChains,
      params: { id, chains },
    });
  }

  async updateAccount(account: KeyringAccount): Promise<void> {
    await this.#sender.send<null>({
      method: KeyringMethod.UpdateAccount,
      params: { account },
    });
  }

  async deleteAccount(id: string): Promise<void> {
    await this.#sender.send<null>({
      method: KeyringMethod.DeleteAccount,
      params: { id },
    });
  }

  async listRequests(): Promise<KeyringRequest[]> {
    return await this.#sender.send<KeyringRequest[]>({
      method: KeyringMethod.ListRequests,
    });
  }

  async getRequest(id: string): Promise<KeyringRequest> {
    return await this.#sender.send<KeyringRequest>({
      method: KeyringMethod.GetRequest,
      params: { id },
    });
  }

  async submitRequest<Result extends Json = null>(
    request: KeyringRequest,
  ): Promise<SubmitRequestResponse<Result>> {
    return await this.#sender.send<SubmitRequestResponse<Result>>({
      method: KeyringMethod.SubmitRequest,
      params: request,
    });
  }

  async approveRequest(id: string): Promise<void> {
    await this.#sender.send<null>({
      method: KeyringMethod.ApproveRequest,
      params: { id },
    });
  }

  async rejectRequest(id: string): Promise<void> {
    await this.#sender.send<null>({
      method: KeyringMethod.RejectRequest,
      params: { id },
    });
  }
}
