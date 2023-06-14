import { OnRpcRequestHandler } from '@metamask/snaps-utils';
import { Json, JsonRpcRequest } from '@metamask/utils';

import { Keyring } from './keyring-api';
import {
  ApproveRequestRequest,
  CreateAccountRequest,
  DeleteAccountRequest,
  FilterSupportedChainsRequest,
  GetAccountRequest,
  GetRequestRequest,
  KeyringMethod,
  RejectRequestRequest,
  SubmitRequestRequest,
  UpdateAccountRequest,
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
 * @param handlers - Array of handlers.
 * @returns A handler that chains all the handlers in the array.
 */
export function buildHandlersChain(
  handlers: OnRpcRequestHandler[],
): OnRpcRequestHandler {
  return async ({
    origin,
    request,
  }: {
    origin: string;
    request: JsonRpcRequest<Json[] | Record<string, Json>>;
  }): Promise<unknown> => {
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
  request: JsonRpcRequest<Json[] | Record<string, Json>>,
): Promise<Json | void> {
  switch (request.method) {
    case KeyringMethod.ListAccounts:
      return await keyring.listAccounts();

    case KeyringMethod.GetAccount:
      return await keyring.getAccount(
        (request.params as GetAccountRequest).params.id,
      );

    case KeyringMethod.CreateAccount:
      return await keyring.createAccount(
        (request.params as CreateAccountRequest).params.name,
        (request.params as CreateAccountRequest).params.options,
      );

    case KeyringMethod.FilterSupportedChains:
      return await keyring.filterSupportedChains(
        (request.params as FilterSupportedChainsRequest).params.id,
        (request.params as FilterSupportedChainsRequest).params.chains,
      );

    case KeyringMethod.UpdateAccount:
      return await keyring.updateAccount(
        (request.params as UpdateAccountRequest).params.account,
      );

    case KeyringMethod.DeleteAccount:
      return await keyring.deleteAccount(
        (request.params as DeleteAccountRequest).params.id,
      );

    case KeyringMethod.ListRequests:
      return await keyring.listRequests();

    case KeyringMethod.GetRequest:
      return await keyring.getRequest(
        (request.params as GetRequestRequest).params.id,
      );

    case KeyringMethod.SubmitRequest:
      return await keyring.submitRequest(
        (request.params as SubmitRequestRequest).params,
      );

    case KeyringMethod.ApproveRequest:
      return await keyring.approveRequest(
        (request.params as ApproveRequestRequest).params.id,
      );

    case KeyringMethod.RejectRequest:
      return await keyring.rejectRequest(
        (request.params as RejectRequestRequest).params.id,
      );

    default:
      throw new MethodNotSupportedError(request.method);
  }
}
