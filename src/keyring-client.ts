import { Json } from '@metamask/utils';
import { assert } from 'superstruct';
import { v4 as uuid } from 'uuid';

import {
  Keyring,
  KeyringAccount,
  KeyringAccountStruct,
  KeyringRequest,
  KeyringRequestStruct,
  SubmitRequestResponse,
} from './keyring-api';
import { InternalRequest, KeyringMethod } from './keyring-internal-api';

export type Sender = {
  send<Response extends Json>(request: InternalRequest): Promise<Response>;
};

export class KeyringClient implements Keyring {
  #sender: Sender;

  constructor(sender: Sender) {
    this.#sender = sender;
  }

  async listAccounts(): Promise<KeyringAccount[]> {
    return await this.#sender.send<KeyringAccount[]>({
      id: uuid(),
      jsonrpc: '2.0',
      method: KeyringMethod.ListAccounts,
    });
  }

  async getAccount(id: string): Promise<KeyringAccount> {
    return await this.#sender.send<KeyringAccount>({
      id: uuid(),
      jsonrpc: '2.0',
      method: KeyringMethod.GetAccount,
      params: { id },
    });
  }

  async createAccount(
    name: string,
    options: Record<string, Json> | null = null,
  ): Promise<KeyringAccount> {
    return await this.#sender.send<KeyringAccount>({
      id: uuid(),
      jsonrpc: '2.0',
      method: KeyringMethod.CreateAccount,
      params: { name, options },
    });
  }

  async filterAccountChains(id: string, chains: string[]): Promise<string[]> {
    return await this.#sender.send<string[]>({
      id: uuid(),
      jsonrpc: '2.0',
      method: KeyringMethod.FilterAccountChains,
      params: { id, chains },
    });
  }

  async updateAccount(account: KeyringAccount): Promise<void> {
    assert(account, KeyringAccountStruct);
    await this.#sender.send<null>({
      id: uuid(),
      jsonrpc: '2.0',
      method: KeyringMethod.UpdateAccount,
      params: { account },
    });
  }

  async deleteAccount(id: string): Promise<void> {
    await this.#sender.send<null>({
      id: uuid(),
      jsonrpc: '2.0',
      method: KeyringMethod.DeleteAccount,
      params: { id },
    });
  }

  async listRequests(): Promise<KeyringRequest[]> {
    return await this.#sender.send<KeyringRequest[]>({
      id: uuid(),
      jsonrpc: '2.0',
      method: KeyringMethod.ListRequests,
    });
  }

  async getRequest(id: string): Promise<KeyringRequest> {
    return await this.#sender.send<KeyringRequest>({
      id: uuid(),
      jsonrpc: '2.0',
      method: KeyringMethod.GetRequest,
      params: { id },
    });
  }

  async submitRequest(request: KeyringRequest): Promise<SubmitRequestResponse> {
    assert(request, KeyringRequestStruct);
    return await this.#sender.send<SubmitRequestResponse>({
      id: uuid(),
      jsonrpc: '2.0',
      method: KeyringMethod.SubmitRequest,
      params: request,
    });
  }

  async approveRequest(id: string): Promise<void> {
    await this.#sender.send<null>({
      id: uuid(),
      jsonrpc: '2.0',
      method: KeyringMethod.ApproveRequest,
      params: { id },
    });
  }

  async rejectRequest(id: string): Promise<void> {
    await this.#sender.send<null>({
      id: uuid(),
      jsonrpc: '2.0',
      method: KeyringMethod.RejectRequest,
      params: { id },
    });
  }
}
