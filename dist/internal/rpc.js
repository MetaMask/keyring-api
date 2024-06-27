"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isKeyringRpcMethod = exports.KeyringRpcMethod = void 0;
/**
 * Keyring RPC methods used by the API.
 */
var KeyringRpcMethod;
(function (KeyringRpcMethod) {
    KeyringRpcMethod["ListAccounts"] = "keyring_listAccounts";
    KeyringRpcMethod["GetAccount"] = "keyring_getAccount";
    KeyringRpcMethod["CreateAccount"] = "keyring_createAccount";
    KeyringRpcMethod["GetAccountBalances"] = "keyring_getAccountBalances";
    KeyringRpcMethod["FilterAccountChains"] = "keyring_filterAccountChains";
    KeyringRpcMethod["UpdateAccount"] = "keyring_updateAccount";
    KeyringRpcMethod["DeleteAccount"] = "keyring_deleteAccount";
    KeyringRpcMethod["ExportAccount"] = "keyring_exportAccount";
    KeyringRpcMethod["ListRequests"] = "keyring_listRequests";
    KeyringRpcMethod["GetRequest"] = "keyring_getRequest";
    KeyringRpcMethod["SubmitRequest"] = "keyring_submitRequest";
    KeyringRpcMethod["ApproveRequest"] = "keyring_approveRequest";
    KeyringRpcMethod["RejectRequest"] = "keyring_rejectRequest";
})(KeyringRpcMethod = exports.KeyringRpcMethod || (exports.KeyringRpcMethod = {}));
/**
 * Check if a method is a keyring RPC method.
 *
 * @param method - Method to check.
 * @returns Whether the method is a keyring RPC method.
 */
function isKeyringRpcMethod(method) {
    return Object.values(KeyringRpcMethod).includes(method);
}
exports.isKeyringRpcMethod = isKeyringRpcMethod;
//# sourceMappingURL=rpc.js.map