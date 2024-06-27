"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _KeyringClient_instances, _KeyringClient_sender, _KeyringClient_send;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyringClient = void 0;
const superstruct_1 = require("@metamask/superstruct");
const uuid_1 = require("uuid");
const api_1 = require("./internal/api");
const rpc_1 = require("./internal/rpc");
const superstruct_2 = require("./superstruct");
class KeyringClient {
    /**
     * Create a new instance of `KeyringClient`.
     *
     * @param sender - The `Sender` instance to use to send requests to the snap.
     */
    constructor(sender) {
        _KeyringClient_instances.add(this);
        _KeyringClient_sender.set(this, void 0);
        __classPrivateFieldSet(this, _KeyringClient_sender, sender, "f");
    }
    async listAccounts() {
        return (0, superstruct_2.strictMask)(await __classPrivateFieldGet(this, _KeyringClient_instances, "m", _KeyringClient_send).call(this, {
            method: rpc_1.KeyringRpcMethod.ListAccounts,
        }), api_1.ListAccountsResponseStruct);
    }
    async getAccount(id) {
        return (0, superstruct_2.strictMask)(await __classPrivateFieldGet(this, _KeyringClient_instances, "m", _KeyringClient_send).call(this, {
            method: rpc_1.KeyringRpcMethod.GetAccount,
            params: { id },
        }), api_1.GetAccountResponseStruct);
    }
    async getAccountBalances(id, assets) {
        return (0, superstruct_2.strictMask)(await __classPrivateFieldGet(this, _KeyringClient_instances, "m", _KeyringClient_send).call(this, {
            method: rpc_1.KeyringRpcMethod.GetAccountBalances,
            params: { id, assets },
        }), api_1.GetAccountBalancesResponseStruct);
    }
    async createAccount(options = {}) {
        return (0, superstruct_2.strictMask)(await __classPrivateFieldGet(this, _KeyringClient_instances, "m", _KeyringClient_send).call(this, {
            method: rpc_1.KeyringRpcMethod.CreateAccount,
            params: { options },
        }), api_1.CreateAccountResponseStruct);
    }
    async filterAccountChains(id, chains) {
        return (0, superstruct_2.strictMask)(await __classPrivateFieldGet(this, _KeyringClient_instances, "m", _KeyringClient_send).call(this, {
            method: rpc_1.KeyringRpcMethod.FilterAccountChains,
            params: { id, chains },
        }), api_1.FilterAccountChainsResponseStruct);
    }
    async updateAccount(account) {
        (0, superstruct_1.assert)(await __classPrivateFieldGet(this, _KeyringClient_instances, "m", _KeyringClient_send).call(this, {
            method: rpc_1.KeyringRpcMethod.UpdateAccount,
            params: { account },
        }), api_1.UpdateAccountResponseStruct);
    }
    async deleteAccount(id) {
        (0, superstruct_1.assert)(await __classPrivateFieldGet(this, _KeyringClient_instances, "m", _KeyringClient_send).call(this, {
            method: rpc_1.KeyringRpcMethod.DeleteAccount,
            params: { id },
        }), api_1.DeleteAccountResponseStruct);
    }
    async exportAccount(id) {
        return (0, superstruct_2.strictMask)(await __classPrivateFieldGet(this, _KeyringClient_instances, "m", _KeyringClient_send).call(this, {
            method: rpc_1.KeyringRpcMethod.ExportAccount,
            params: { id },
        }), api_1.ExportAccountResponseStruct);
    }
    async listRequests() {
        return (0, superstruct_2.strictMask)(await __classPrivateFieldGet(this, _KeyringClient_instances, "m", _KeyringClient_send).call(this, {
            method: rpc_1.KeyringRpcMethod.ListRequests,
        }), api_1.ListRequestsResponseStruct);
    }
    async getRequest(id) {
        return (0, superstruct_2.strictMask)(await __classPrivateFieldGet(this, _KeyringClient_instances, "m", _KeyringClient_send).call(this, {
            method: rpc_1.KeyringRpcMethod.GetRequest,
            params: { id },
        }), api_1.GetRequestResponseStruct);
    }
    async submitRequest(request) {
        return (0, superstruct_2.strictMask)(await __classPrivateFieldGet(this, _KeyringClient_instances, "m", _KeyringClient_send).call(this, {
            method: rpc_1.KeyringRpcMethod.SubmitRequest,
            params: request,
        }), api_1.SubmitRequestResponseStruct);
    }
    async approveRequest(id, data = {}) {
        (0, superstruct_1.assert)(await __classPrivateFieldGet(this, _KeyringClient_instances, "m", _KeyringClient_send).call(this, {
            method: rpc_1.KeyringRpcMethod.ApproveRequest,
            params: { id, data },
        }), api_1.ApproveRequestResponseStruct);
    }
    async rejectRequest(id) {
        (0, superstruct_1.assert)(await __classPrivateFieldGet(this, _KeyringClient_instances, "m", _KeyringClient_send).call(this, {
            method: rpc_1.KeyringRpcMethod.RejectRequest,
            params: { id },
        }), api_1.RejectRequestResponseStruct);
    }
}
exports.KeyringClient = KeyringClient;
_KeyringClient_sender = new WeakMap(), _KeyringClient_instances = new WeakSet(), _KeyringClient_send = 
/**
 * Send a request to the snap and return the response.
 *
 * @param partial - A partial JSON-RPC request (method and params).
 * @returns A promise that resolves to the response to the request.
 */
async function _KeyringClient_send(partial) {
    return __classPrivateFieldGet(this, _KeyringClient_sender, "f").send({
        jsonrpc: '2.0',
        id: (0, uuid_1.v4)(),
        ...partial,
    });
};
//# sourceMappingURL=KeyringClient.js.map