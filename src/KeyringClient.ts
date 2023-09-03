import type { Json } from '@metamask/utils';
import { assert } from 'superstruct';
import { v4 as uuid } from 'uuid';

import type {
  Keyring,
  KeyringAccount,
  KeyringRequest,
  KeyringAccountData,
  KeyringResponse,
} from './api';
import {
  ApproveRequestResponseStruct,
  CreateAccountResponseStruct,
  DeleteAccountResponseStruct,
  ExportAccountResponseStruct,
  FilterAccountChainsResponseStruct,
  GetAccountResponseStruct,
  GetRequestResponseStruct,
  ListAccountsResponseStruct,
  ListRequestsResponseStruct,
  RejectRequestResponseStruct,
  SubmitRequestResponseStruct,
  UpdateAccountResponseStruct,
} from './internal/api';
import type { JsonRpcRequest } from './JsonRpcRequest';
import type { OmitUnion } from './utils';
import { strictMask } from './utils';

export type Sender = {
  send(request: JsonRpcRequest): Promise<Json>;
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
   * @param partial - A partial JSON-RPC request (method and params).
   * @returns A promise that resolves to the response to the request.
   */
  async #send(
    partial: OmitUnion<JsonRpcRequest, 'jsonrpc' | 'id'>,
  ): Promise<Json> {
    return this.#sender.send({
      jsonrpc: '2.0',
      id: uuid(),
      ...partial,
    });
  }

  async listAccounts(): Promise<KeyringAccount[]> {
    return strictMask(
      await this.#send({
        method: 'keyring_listAccounts',
      }),
      ListAccountsResponseStruct,
    );
  }

  async getAccount(id: string): Promise<KeyringAccount> {
    return strictMask(
      await this.#send({
        method: 'keyring_getAccount',
        params: { id },
      }),
      GetAccountResponseStruct,
    );
  }

  async createAccount(
    options: Record<string, Json> = {},
  ): Promise<KeyringAccount> {
    return strictMask(
      await this.#send({
        method: 'keyring_createAccount',
        params: { options },
      }),
      CreateAccountResponseStruct,
    );
  }

  async filterAccountChains(id: string, chains: string[]): Promise<string[]> {
    return strictMask(
      await this.#send({
        method: 'keyring_filterAccountChains',
        params: { id, chains },
      }),
      FilterAccountChainsResponseStruct,
    );
  }

  async updateAccount(account: KeyringAccount): Promise<void> {
    assert(
      await this.#send({
        method: 'keyring_updateAccount',
        params: { account },
      }),
      UpdateAccountResponseStruct,
    );
  }

  async deleteAccount(id: string): Promise<void> {
    assert(
      await this.#send({
        method: 'keyring_deleteAccount',
        params: { id },
      }),
      DeleteAccountResponseStruct,
    );
  }

  async exportAccount(id: string): Promise<KeyringAccountData> {
    return strictMask(
      await this.#send({
        method: 'keyring_exportAccount',
        params: { id },
      }),
      ExportAccountResponseStruct,
    );
  }

  async listRequests(): Promise<KeyringRequest[]> {
    return strictMask(
      await this.#send({
        method: 'keyring_listRequests',
      }),
      ListRequestsResponseStruct,
    );
  }

  async getRequest(id: string): Promise<KeyringRequest> {
    return strictMask(
      await this.#send({
        method: 'keyring_getRequest',
        params: { id },
      }),
      GetRequestResponseStruct,
    );
  }

  async submitRequest(request: KeyringRequest): Promise<KeyringResponse> {
    return strictMask(
      await this.#send({
        method: 'keyring_submitRequest',
        params: request,
      }),
      SubmitRequestResponseStruct,
    );
  }

  async approveRequest(
    id: string,
    data: Record<string, Json> = {},
  ): Promise<void> {
    assert(
      await this.#send({
        method: 'keyring_approveRequest',
        params: { id, data },
      }),
      ApproveRequestResponseStruct,
    );
  }

  async rejectRequest(id: string): Promise<void> {
    assert(
      await this.#send({
        method: 'keyring_rejectRequest',
        params: { id },
      }),
      RejectRequestResponseStruct,
    );
  }
}
