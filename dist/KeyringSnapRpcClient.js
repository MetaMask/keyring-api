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
var _SnapRpcSender_origin, _SnapRpcSender_provider;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyringSnapRpcClient = exports.SnapRpcSender = void 0;
const KeyringClient_1 = require("./KeyringClient");
/**
 * Implementation of the `Sender` interface that can be used to send requests
 * to a snap through the snap JSON-RPC API.
 */
class SnapRpcSender {
    /**
     * Create a new instance of `SnapRpcSender`.
     *
     * @param origin - The caller's origin.
     * @param provider - The `MetaMaskInpageProvider` instance to use.
     */
    constructor(origin, provider) {
        _SnapRpcSender_origin.set(this, void 0);
        _SnapRpcSender_provider.set(this, void 0);
        __classPrivateFieldSet(this, _SnapRpcSender_origin, origin, "f");
        __classPrivateFieldSet(this, _SnapRpcSender_provider, provider, "f");
    }
    /**
     * Send a request to the snap and return the response.
     *
     * @param request - The JSON-RPC request to send to the snap.
     * @returns A promise that resolves to the response of the request.
     */
    async send(request) {
        return __classPrivateFieldGet(this, _SnapRpcSender_provider, "f").request({
            method: 'wallet_invokeKeyring',
            params: {
                snapId: __classPrivateFieldGet(this, _SnapRpcSender_origin, "f"),
                request,
            },
        });
    }
}
exports.SnapRpcSender = SnapRpcSender;
_SnapRpcSender_origin = new WeakMap(), _SnapRpcSender_provider = new WeakMap();
/**
 * A `KeyringClient` that allows the communication with a snap through the snap
 * JSON-RPC API.
 */
class KeyringSnapRpcClient extends KeyringClient_1.KeyringClient {
    /**
     * Create a new instance of `KeyringSnapRpcClient`.
     *
     * @param origin - Caller's origin.
     * @param provider - The `MetaMaskInpageProvider` instance to use.
     */
    constructor(origin, provider) {
        super(new SnapRpcSender(origin, provider));
    }
}
exports.KeyringSnapRpcClient = KeyringSnapRpcClient;
//# sourceMappingURL=KeyringSnapRpcClient.js.map