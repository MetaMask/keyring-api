"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleKeyringRequest = exports.MethodNotSupportedError = void 0;
const superstruct_1 = require("@metamask/superstruct");
const api_1 = require("./internal/api");
const rpc_1 = require("./internal/rpc");
const JsonRpcRequest_1 = require("./JsonRpcRequest");
/**
 * Error thrown when a keyring JSON-RPC method is not supported.
 */
class MethodNotSupportedError extends Error {
    constructor(method) {
        super(`Method not supported: ${method}`);
    }
}
exports.MethodNotSupportedError = MethodNotSupportedError;
/**
 * Inner function that dispatches JSON-RPC request to the associated Keyring
 * methods.
 *
 * @param keyring - Keyring instance.
 * @param request - Keyring JSON-RPC request.
 * @returns A promise that resolves to the keyring response.
 */
async function dispatchRequest(keyring, request) {
    // We first have to make sure that the request is a valid JSON-RPC request so
    // we can check its method name.
    (0, superstruct_1.assert)(request, JsonRpcRequest_1.JsonRpcRequestStruct);
    switch (request.method) {
        case rpc_1.KeyringRpcMethod.ListAccounts: {
            (0, superstruct_1.assert)(request, api_1.ListAccountsRequestStruct);
            return keyring.listAccounts();
        }
        case rpc_1.KeyringRpcMethod.GetAccount: {
            (0, superstruct_1.assert)(request, api_1.GetAccountRequestStruct);
            return keyring.getAccount(request.params.id);
        }
        case rpc_1.KeyringRpcMethod.CreateAccount: {
            (0, superstruct_1.assert)(request, api_1.CreateAccountRequestStruct);
            return keyring.createAccount(request.params.options);
        }
        case rpc_1.KeyringRpcMethod.GetAccountBalances: {
            if (keyring.getAccountBalances === undefined) {
                throw new MethodNotSupportedError(request.method);
            }
            (0, superstruct_1.assert)(request, api_1.GetAccountBalancesRequestStruct);
            return keyring.getAccountBalances(request.params.id, request.params.assets);
        }
        case rpc_1.KeyringRpcMethod.FilterAccountChains: {
            (0, superstruct_1.assert)(request, api_1.FilterAccountChainsStruct);
            return keyring.filterAccountChains(request.params.id, request.params.chains);
        }
        case rpc_1.KeyringRpcMethod.UpdateAccount: {
            (0, superstruct_1.assert)(request, api_1.UpdateAccountRequestStruct);
            return keyring.updateAccount(request.params.account);
        }
        case rpc_1.KeyringRpcMethod.DeleteAccount: {
            (0, superstruct_1.assert)(request, api_1.DeleteAccountRequestStruct);
            return keyring.deleteAccount(request.params.id);
        }
        case rpc_1.KeyringRpcMethod.ExportAccount: {
            if (keyring.exportAccount === undefined) {
                throw new MethodNotSupportedError(request.method);
            }
            (0, superstruct_1.assert)(request, api_1.ExportAccountRequestStruct);
            return keyring.exportAccount(request.params.id);
        }
        case rpc_1.KeyringRpcMethod.ListRequests: {
            if (keyring.listRequests === undefined) {
                throw new MethodNotSupportedError(request.method);
            }
            (0, superstruct_1.assert)(request, api_1.ListRequestsRequestStruct);
            return keyring.listRequests();
        }
        case rpc_1.KeyringRpcMethod.GetRequest: {
            if (keyring.getRequest === undefined) {
                throw new MethodNotSupportedError(request.method);
            }
            (0, superstruct_1.assert)(request, api_1.GetRequestRequestStruct);
            return keyring.getRequest(request.params.id);
        }
        case rpc_1.KeyringRpcMethod.SubmitRequest: {
            (0, superstruct_1.assert)(request, api_1.SubmitRequestRequestStruct);
            return keyring.submitRequest(request.params);
        }
        case rpc_1.KeyringRpcMethod.ApproveRequest: {
            if (keyring.approveRequest === undefined) {
                throw new MethodNotSupportedError(request.method);
            }
            (0, superstruct_1.assert)(request, api_1.ApproveRequestRequestStruct);
            return keyring.approveRequest(request.params.id, request.params.data);
        }
        case rpc_1.KeyringRpcMethod.RejectRequest: {
            if (keyring.rejectRequest === undefined) {
                throw new MethodNotSupportedError(request.method);
            }
            (0, superstruct_1.assert)(request, api_1.RejectRequestRequestStruct);
            return keyring.rejectRequest(request.params.id);
        }
        default: {
            throw new MethodNotSupportedError(request.method);
        }
    }
}
/**
 * Handles a keyring JSON-RPC request.
 *
 * This function is meant to be used as a handler for Keyring JSON-RPC requests
 * in an Accounts Snap.
 *
 * @param keyring - Keyring instance.
 * @param request - Keyring JSON-RPC request.
 * @returns A promise that resolves to the keyring response.
 * @example
 * ```ts
 * export const onKeyringRequest: OnKeyringRequestHandler = async ({
 *   origin,
 *   request,
 * }) => {
 *   return await handleKeyringRequest(keyring, request);
 * };
 * ```
 */
async function handleKeyringRequest(keyring, request) {
    try {
        return await dispatchRequest(keyring, request);
    }
    catch (error) {
        const message = error instanceof Error && typeof error.message === 'string'
            ? error.message
            : 'An unknown error occurred while handling the keyring request';
        throw new Error(message);
    }
}
exports.handleKeyringRequest = handleKeyringRequest;
//# sourceMappingURL=rpc-handler.js.map