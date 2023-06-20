import type { OnRpcRequestHandler } from '@metamask/snaps-utils';
import type { Json, JsonRpcRequest } from '@metamask/utils';
import { assert } from 'superstruct';

import type { Keyring } from './keyring-api';
import {
  GetAccountRequestStruct,
  CreateAccountRequestStruct,
  ApproveRequestRequestStruct,
  DeleteAccountRequestStruct,
  GetRequestRequestStruct,
  RejectRequestRequestStruct,
  SubmitRequestRequestStruct,
  UpdateAccountRequestStruct,
  FilterAccountChainsStruct,
  ListAccountsRequestStruct,
  ListRequestsRequestStruct,
} from './keyring-internal-api';

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
export function chainHandlers(
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

/**
 * Handles a keyring JSON-RPC request.
 *
 * @param keyring - Keyring instance.
 * @param request - Keyring JSON-RPC request.
 * @returns A promise that resolves to the keyring response.
 */
export async function keyringRpcDispatcher(
  keyring: Keyring,
  request: JsonRpcRequest,
): Promise<Json | void> {
  switch (request.method) {
    case 'keyring_listAccounts': {
      assert(request, ListAccountsRequestStruct);
      return await keyring.listAccounts();
    }

    case 'keyring_getAccount': {
      assert(request, GetAccountRequestStruct);
      return await keyring.getAccount(request.params.id);
    }

    case 'keyring_createAccount': {
      assert(request, CreateAccountRequestStruct);
      return await keyring.createAccount(
        request.params.name,
        request.params.options,
      );
    }

    case 'keyring_filterAccountChains': {
      assert(request, FilterAccountChainsStruct);
      return await keyring.filterAccountChains(
        request.params.id,
        request.params.chains,
      );
    }

    case 'keyring_updateAccount': {
      assert(request, UpdateAccountRequestStruct);
      return await keyring.updateAccount(request.params.account);
    }

    case 'keyring_deleteAccount': {
      assert(request, DeleteAccountRequestStruct);
      return await keyring.deleteAccount(request.params.id);
    }

    case 'keyring_listRequests': {
      assert(request, ListRequestsRequestStruct);
      return await keyring.listRequests();
    }

    case 'keyring_getRequest': {
      assert(request, GetRequestRequestStruct);
      return await keyring.getRequest(request.params.id);
    }

    case 'keyring_submitRequest': {
      assert(request, SubmitRequestRequestStruct);
      return await keyring.submitRequest(request.params);
    }

    case 'keyring_approveRequest': {
      assert(request, ApproveRequestRequestStruct);
      return await keyring.approveRequest(request.params.id);
    }

    case 'keyring_rejectRequest': {
      assert(request, RejectRequestRequestStruct);
      return await keyring.rejectRequest(request.params.id);
    }

    default:
      throw new MethodNotSupportedError(request.method);
  }
}
