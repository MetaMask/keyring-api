"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyringResponseStruct = void 0;
const superstruct_1 = require("@metamask/superstruct");
const utils_1 = require("@metamask/utils");
const superstruct_2 = require("../superstruct");
exports.KeyringResponseStruct = (0, superstruct_1.union)([
    (0, superstruct_2.object)({
        /**
         * Pending flag.
         *
         * Setting the pending flag to true indicates that the request will be
         * handled asynchronously. The keyring must be called with `approveRequest`
         * or `rejectRequest` to resolve the request.
         */
        pending: (0, superstruct_1.literal)(true),
        /**
         * Redirect URL.
         *
         * If present in the response, MetaMask will display a confirmation dialog
         * with a link to the redirect URL. The user can choose to follow the link
         * or cancel the request.
         */
        redirect: (0, superstruct_2.exactOptional)((0, superstruct_2.object)({
            message: (0, superstruct_2.exactOptional)((0, superstruct_1.string)()),
            url: (0, superstruct_2.exactOptional)((0, superstruct_1.string)()),
        })),
    }),
    (0, superstruct_2.object)({
        /**
         * Pending flag.
         *
         * Setting the pending flag to false indicates that the request will be
         * handled synchronously. The keyring must return the result of the
         * request execution.
         */
        pending: (0, superstruct_1.literal)(false),
        /**
         * Request result.
         */
        result: utils_1.JsonStruct,
    }),
]);
//# sourceMappingURL=response.js.map