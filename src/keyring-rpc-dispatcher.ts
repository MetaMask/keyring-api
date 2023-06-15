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
  InternalRequest,
  KeyringMethod,
  RejectRequestRequest,
  SubmitRequestRequest,
  UpdateAccountRequest,
} from './keyring-internal-api';

type InternalJsonRpcRequest<R extends InternalRequest> = {
  jsonrpc: '2.0';
  id: string | number | null;
} & R;

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
    case KeyringMethod.ListAccounts:
      return await keyring.listAccounts();

    case KeyringMethod.GetAccount: {
      const req = request as InternalJsonRpcRequest<GetAccountRequest>;
      return await keyring.getAccount(req.params.id);
    }

    case KeyringMethod.CreateAccount: {
      const req = request as InternalJsonRpcRequest<CreateAccountRequest>;
      return await keyring.createAccount(req.params.name, req.params.options);
    }

    case KeyringMethod.FilterAccountChains: {
      const req =
        request as InternalJsonRpcRequest<FilterSupportedChainsRequest>;
      return await keyring.filterAccountChains(
        req.params.id,
        req.params.chains,
      );
    }

    case KeyringMethod.UpdateAccount: {
      const req = request as InternalJsonRpcRequest<UpdateAccountRequest>;
      return await keyring.updateAccount(req.params.account);
    }

    case KeyringMethod.DeleteAccount: {
      const req = request as InternalJsonRpcRequest<DeleteAccountRequest>;
      return await keyring.deleteAccount(req.params.id);
    }

    case KeyringMethod.ListRequests:
      return await keyring.listRequests();

    case KeyringMethod.GetRequest: {
      const req = request as InternalJsonRpcRequest<GetRequestRequest>;
      return await keyring.getRequest(req.params.id);
    }

    case KeyringMethod.SubmitRequest: {
      const req = request as InternalJsonRpcRequest<SubmitRequestRequest>;
      return await keyring.submitRequest(req.params);
    }

    case KeyringMethod.ApproveRequest: {
      const req = request as InternalJsonRpcRequest<ApproveRequestRequest>;
      return await keyring.approveRequest(req.params.id);
    }

    case KeyringMethod.RejectRequest: {
      const req = request as InternalJsonRpcRequest<RejectRequestRequest>;
      return await keyring.rejectRequest(req.params.id);
    }

    default:
      throw new MethodNotSupportedError(request.method);
  }
}
