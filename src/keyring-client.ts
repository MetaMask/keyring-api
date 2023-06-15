import { Json } from '@metamask/utils';
import { assert } from 'superstruct';
import { v4 as uuid } from 'uuid';

import {
  Keyring,
  KeyringAccount,
  KeyringRequest,
  SubmitRequestResponse,
} from './keyring-api';
import {
  InternalRequest,
  InternalRequestStruct,
  KeyringMethod,
} from './keyring-internal-api';

/**
 * Omit keys from a union type.
 *
 * The normal `Omit` type does not distribute over unions. So we use this
 * workaround that applies `Omit` to each member of the union.
 *
 * See: https://github.com/microsoft/TypeScript/issues/31501#issuecomment-1280579305
 */
type OmitUnion<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

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
      method: KeyringMethod.ListAccounts,
    });
  }

  async getAccount(id: string): Promise<KeyringAccount> {
    return await this.#send<KeyringAccount>({
      method: KeyringMethod.GetAccount,
      params: { id },
    });
  }

  async createAccount(
    name: string,
    options: Record<string, Json> | null = null,
  ): Promise<KeyringAccount> {
    return await this.#send<KeyringAccount>({
      method: KeyringMethod.CreateAccount,
      params: { name, options },
    });
  }

  async filterAccountChains(id: string, chains: string[]): Promise<string[]> {
    return await this.#send<string[]>({
      method: KeyringMethod.FilterAccountChains,
      params: { id, chains },
    });
  }

  async updateAccount(account: KeyringAccount): Promise<void> {
    await this.#send<null>({
      method: KeyringMethod.UpdateAccount,
      params: { account },
    });
  }

  async deleteAccount(id: string): Promise<void> {
    await this.#send<null>({
      method: KeyringMethod.DeleteAccount,
      params: { id },
    });
  }

  async listRequests(): Promise<KeyringRequest[]> {
    return await this.#send<KeyringRequest[]>({
      method: KeyringMethod.ListRequests,
    });
  }

  async getRequest(id: string): Promise<KeyringRequest> {
    return await this.#send<KeyringRequest>({
      method: KeyringMethod.GetRequest,
      params: { id },
    });
  }

  async submitRequest(request: KeyringRequest): Promise<SubmitRequestResponse> {
    return await this.#send<SubmitRequestResponse>({
      method: KeyringMethod.SubmitRequest,
      params: request,
    });
  }

  async approveRequest(id: string): Promise<void> {
    await this.#send<null>({
      method: KeyringMethod.ApproveRequest,
      params: { id },
    });
  }

  async rejectRequest(id: string): Promise<void> {
    await this.#send<null>({
      method: KeyringMethod.RejectRequest,
      params: { id },
    });
  }
}
