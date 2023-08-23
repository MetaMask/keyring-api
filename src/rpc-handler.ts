import type { OnRpcRequestHandler } from '@metamask/snaps-utils';
import type { Json } from '@metamask/utils';
import { assert } from 'superstruct';

import type { Keyring } from './api';
import {
  GetAccountRequestStruct,
  CreateAccountRequestStruct,
  ApproveRequestRequestStruct,
  DeleteAccountRequestStruct,
  ExportAccountRequestStruct,
  GetRequestRequestStruct,
  RejectRequestRequestStruct,
  SubmitRequestRequestStruct,
  UpdateAccountRequestStruct,
  FilterAccountChainsStruct,
  ListAccountsRequestStruct,
  ListRequestsRequestStruct,
} from './internal/api';
import { type JsonRpcRequest, JsonRpcRequestStruct } from './JsonRpcRequest';

/**
 * Error thrown when a keyring JSON-RPC method is not supported.
 */
export class MethodNotSupportedError extends Error {
  constructor(method: string) {
    super(`Method not supported: ${method}`);
  }
}

/**
 * Build a chain of handlers for a JSON-RPC request.
 *
 * If a handler throws a MethodNotSupportedError, the next handler in the chain
 * is called. If all handlers throw a MethodNotSupportedError, the error is re-
 * thrown.
 *
 * Any other error thrown by a handler is re-thrown.
 *
 * @param handlers - Handlers to chain.
 * @returns A handler that chains the given handlers.
 */
export function buildHandlersChain(
  ...handlers: OnRpcRequestHandler[]
): OnRpcRequestHandler {
  return async ({ origin, request }) => {
    for (const handler of handlers) {
      try {
        return await handler({ origin, request });
      } catch (error) {
        if (!(error instanceof MethodNotSupportedError)) {
          throw error;
        }
      }
    }

    // All handlers failed to handle the request.
    throw new MethodNotSupportedError(request.method);
  };
}

export enum KeyringRpcMethod {
  ListAccounts = 'keyring_listAccounts',
  GetAccount = 'keyring_getAccount',
  CreateAccount = 'keyring_createAccount',
  FilterAccountChains = 'keyring_filterAccountChains',
  UpdateAccount = 'keyring_updateAccount',
  DeleteAccount = 'keyring_deleteAccount',
  ExportAccount = 'keyring_exportAccount',
  ListRequests = 'keyring_listRequests',
  GetRequest = 'keyring_getRequest',
  SubmitRequest = 'keyring_submitRequest',
  ApproveRequest = 'keyring_approveRequest',
  RejectRequest = 'keyring_rejectRequest',
}

/**
 * Handles a keyring JSON-RPC request.
 *
 * @param keyring - Keyring instance.
 * @param request - Keyring JSON-RPC request.
 * @returns A promise that resolves to the keyring response.
 */
export async function handleKeyringRequest(
  keyring: Keyring,
  request: JsonRpcRequest,
): Promise<Json | void> {
  // We first have to make sure that the request is a valid JSON-RPC request so
  // we can check its method name.
  assert(request, JsonRpcRequestStruct);

  switch (request.method) {
    case KeyringRpcMethod.ListAccounts: {
      assert(request, ListAccountsRequestStruct);
      return keyring.listAccounts();
    }

    case KeyringRpcMethod.GetAccount: {
      assert(request, GetAccountRequestStruct);
      return keyring.getAccount(request.params.id);
    }

    case KeyringRpcMethod.CreateAccount: {
      assert(request, CreateAccountRequestStruct);
      return keyring.createAccount(request.params.options);
    }

    case KeyringRpcMethod.FilterAccountChains: {
      assert(request, FilterAccountChainsStruct);
      return keyring.filterAccountChains(
        request.params.id,
        request.params.chains,
      );
    }

    case KeyringRpcMethod.UpdateAccount: {
      assert(request, UpdateAccountRequestStruct);
      return keyring.updateAccount(request.params.account);
    }

    case KeyringRpcMethod.DeleteAccount: {
      assert(request, DeleteAccountRequestStruct);
      return keyring.deleteAccount(request.params.id);
    }

    case KeyringRpcMethod.ExportAccount: {
      if (keyring.exportAccount === undefined) {
        throw new MethodNotSupportedError(request.method);
      }
      assert(request, ExportAccountRequestStruct);
      return keyring.exportAccount(request.params.id);
    }

    case KeyringRpcMethod.ListRequests: {
      if (keyring.listRequests === undefined) {
        throw new MethodNotSupportedError(request.method);
      }
      assert(request, ListRequestsRequestStruct);
      return keyring.listRequests();
    }

    case KeyringRpcMethod.GetRequest: {
      if (keyring.getRequest === undefined) {
        throw new MethodNotSupportedError(request.method);
      }
      assert(request, GetRequestRequestStruct);
      return keyring.getRequest(request.params.id);
    }

    case KeyringRpcMethod.SubmitRequest: {
      assert(request, SubmitRequestRequestStruct);
      return keyring.submitRequest(request.params);
    }

    case KeyringRpcMethod.ApproveRequest: {
      if (keyring.approveRequest === undefined) {
        throw new MethodNotSupportedError(request.method);
      }
      assert(request, ApproveRequestRequestStruct);
      return keyring.approveRequest(request.params.id, request.params.data);
    }

    case KeyringRpcMethod.RejectRequest: {
      if (keyring.rejectRequest === undefined) {
        throw new MethodNotSupportedError(request.method);
      }
      assert(request, RejectRequestRequestStruct);
      return keyring.rejectRequest(request.params.id);
    }

    default: {
      throw new MethodNotSupportedError(request.method);
    }
  }
}
