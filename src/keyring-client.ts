import type { Json } from '@metamask/utils';
import { assert } from 'superstruct';
import { v4 as uuid } from 'uuid';

import {
  Keyring,
  KeyringAccount,
  KeyringRequest,
  SubmitRequestResponse,
} from './keyring-api';
import { InternalRequest, InternalRequestStruct } from './keyring-internal-api';
import { OmitUnion } from './utils';

export type Sender = {
  send<Response extends Json>(request: InternalRequest): Promise<Response>;
};

export class KeyringClient implements Keyring {
  #sender: Sender;

  /**
   * Create a new instance of `KeyringClient`.
   *
   * @param sender - The `Sender` instance to use to send requests to the snap.
   */
  constructor(sender: Sender) {
    this.#sender = sender;
  }

  /**
   * Send a request to the snap and return the response.
   *
   * @param partial - Partial internal request (method and params).
   * @returns A promise that resolves to the response to the request.
   */
  async #send<Response extends Json>(
    partial: OmitUnion<InternalRequest, 'jsonrpc' | 'id'>,
  ): Promise<Response> {
    const request = {
      jsonrpc: '2.0',
      id: uuid(),
      ...partial,
    };
    assert(request, InternalRequestStruct);
    return await this.#sender.send<Response>(request);
  }

  async listAccounts(): Promise<KeyringAccount[]> {
    return await this.#send<KeyringAccount[]>({
      method: 'keyring_listAccounts',
    });
  }

  async getAccount(id: string): Promise<KeyringAccount> {
    return await this.#send<KeyringAccount>({
      method: 'keyring_getAccount',
      params: { id },
    });
  }

  async createAccount(
    name: string,
    options: Record<string, Json> | null = null,
  ): Promise<KeyringAccount> {
    return await this.#send<KeyringAccount>({
      method: 'keyring_createAccount',
      params: { name, options },
    });
  }

  async filterAccountChains(id: string, chains: string[]): Promise<string[]> {
    return await this.#send<string[]>({
      method: 'keyring_filterAccountChains',
      params: { id, chains },
    });
  }

  async updateAccount(account: KeyringAccount): Promise<void> {
    await this.#send<null>({
      method: 'keyring_updateAccount',
      params: { account },
    });
  }

  async deleteAccount(id: string): Promise<void> {
    await this.#send<null>({
      method: 'keyring_deleteAccount',
      params: { id },
    });
  }

  async listRequests(): Promise<KeyringRequest[]> {
    return await this.#send<KeyringRequest[]>({
      method: 'keyring_listRequests',
    });
  }

  async getRequest(id: string): Promise<KeyringRequest> {
    return await this.#send<KeyringRequest>({
      method: 'keyring_getRequest',
      params: { id },
    });
  }

  async submitRequest(request: KeyringRequest): Promise<SubmitRequestResponse> {
    return await this.#send<SubmitRequestResponse>({
      method: 'keyring_submitRequest',
      params: request,
    });
  }

  async approveRequest(id: string): Promise<void> {
    await this.#send<null>({
      method: 'keyring_approveRequest',
      params: { id },
    });
  }

  async rejectRequest(id: string): Promise<void> {
    await this.#send<null>({
      method: 'keyring_rejectRequest',
      params: { id },
    });
  }
}
