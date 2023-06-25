import { Json, JsonRpcRequest } from '@metamask/utils';

import {
  Keyring,
  KeyringAccount,
  KeyringRequest,
  SubmitRequestResponse,
} from './keyring-api';
import { keyringRpcDispatcher } from './keyring-rpc-dispatcher';

export abstract class BaseRpcKeyring implements Keyring {
  /**
   * Dispatch a request JSON-RPC request to the right method.
   *
   * @param request - The JSON-RPC request to dispatch.
   * @returns A promise that resolves to the response of the request.
   */
  async dispatch(request: JsonRpcRequest): Promise<void | Json> {
    return keyringRpcDispatcher(this, request);
  }

  // --------------------------------------------------------------------------
  // Methods from the `Keyring` interface.

  abstract listAccounts(): Promise<KeyringAccount[]>;

  abstract getAccount(id: string): Promise<KeyringAccount | undefined>;

  abstract createAccount(
    name: string,
    options?: Record<string, Json> | null,
  ): Promise<KeyringAccount>;

  abstract filterAccountChains(id: string, chains: string[]): Promise<string[]>;

  abstract updateAccount(account: KeyringAccount): Promise<void>;

  abstract deleteAccount(id: string): Promise<void>;

  abstract listRequests(): Promise<KeyringRequest[]>;

  abstract getRequest(id: string): Promise<KeyringRequest | undefined>;

  abstract submitRequest(
    request: KeyringRequest,
  ): Promise<SubmitRequestResponse>;

  abstract approveRequest(id: string, result?: Json): Promise<void>;

  abstract rejectRequest(id: string): Promise<void>;
}
