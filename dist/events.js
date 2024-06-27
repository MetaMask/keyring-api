"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyringEvent = void 0;
/**
 * Supported keyring events.
 */
var KeyringEvent;
(function (KeyringEvent) {
    // Account events
    KeyringEvent["AccountCreated"] = "notify:accountCreated";
    KeyringEvent["AccountUpdated"] = "notify:accountUpdated";
    KeyringEvent["AccountDeleted"] = "notify:accountDeleted";
    // Request events
    KeyringEvent["RequestApproved"] = "notify:requestApproved";
    KeyringEvent["RequestRejected"] = "notify:requestRejected";
})(KeyringEvent = exports.KeyringEvent || (exports.KeyringEvent = {}));
//# sourceMappingURL=events.js.map