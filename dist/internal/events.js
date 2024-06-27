"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestRejectedEventStruct = exports.RequestApprovedEventStruct = exports.AccountDeletedEventStruct = exports.AccountUpdatedEventStruct = exports.AccountCreatedEventStruct = void 0;
const superstruct_1 = require("@metamask/superstruct");
const utils_1 = require("@metamask/utils");
const api_1 = require("../api");
const events_1 = require("../events");
const superstruct_2 = require("../superstruct");
const utils_2 = require("../utils");
exports.AccountCreatedEventStruct = (0, superstruct_2.object)({
    method: (0, superstruct_1.literal)(`${events_1.KeyringEvent.AccountCreated}`),
    params: (0, superstruct_2.object)({
        /**
         * New account object.
         */
        account: api_1.KeyringAccountStruct,
        /**
         * Account name suggestion provided to the MetaMask client.
         *
         * The keyring can suggest a name for the account, but it's up to the
         * client to decide whether to use it. The keyring won't be informed if the
         * client decides to use a different name.
         */
        accountNameSuggestion: (0, superstruct_2.exactOptional)((0, superstruct_1.string)()),
        /**
         * Instructs MetaMask to display the add account confirmation dialog in the UI.
         * **Note:** This is not guaranteed to be honored by the MetaMask client.
         */
        displayConfirmation: (0, superstruct_2.exactOptional)((0, superstruct_1.boolean)()),
    }),
});
exports.AccountUpdatedEventStruct = (0, superstruct_2.object)({
    method: (0, superstruct_1.literal)(`${events_1.KeyringEvent.AccountUpdated}`),
    params: (0, superstruct_2.object)({
        /**
         * Updated account object.
         */
        account: api_1.KeyringAccountStruct,
    }),
});
exports.AccountDeletedEventStruct = (0, superstruct_2.object)({
    method: (0, superstruct_1.literal)(`${events_1.KeyringEvent.AccountDeleted}`),
    params: (0, superstruct_2.object)({
        /**
         * Deleted account ID.
         */
        id: utils_2.UuidStruct,
    }),
});
exports.RequestApprovedEventStruct = (0, superstruct_2.object)({
    method: (0, superstruct_1.literal)(`${events_1.KeyringEvent.RequestApproved}`),
    params: (0, superstruct_2.object)({
        /**
         * Request ID.
         */
        id: utils_2.UuidStruct,
        /**
         * Request result.
         */
        result: utils_1.JsonStruct,
    }),
});
exports.RequestRejectedEventStruct = (0, superstruct_2.object)({
    method: (0, superstruct_1.literal)(`${events_1.KeyringEvent.RequestRejected}`),
    params: (0, superstruct_2.object)({
        /**
         * Request ID.
         */
        id: utils_2.UuidStruct,
    }),
});
//# sourceMappingURL=events.js.map