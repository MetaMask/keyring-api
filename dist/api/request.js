"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyringRequestStruct = void 0;
const superstruct_1 = require("@metamask/superstruct");
const utils_1 = require("@metamask/utils");
const superstruct_2 = require("../superstruct");
const utils_2 = require("../utils");
exports.KeyringRequestStruct = (0, superstruct_2.object)({
    /**
     * Keyring request ID (UUIDv4).
     */
    id: utils_2.UuidStruct,
    /**
     * Request's scope (CAIP-2 chain ID).
     */
    scope: (0, superstruct_1.string)(),
    /**
     * Account ID (UUIDv4).
     */
    account: utils_2.UuidStruct,
    /**
     * Inner request sent by the client application.
     */
    request: (0, superstruct_2.object)({
        method: (0, superstruct_1.string)(),
        params: (0, superstruct_2.exactOptional)((0, superstruct_1.union)([(0, superstruct_1.array)(utils_1.JsonStruct), (0, superstruct_1.record)((0, superstruct_1.string)(), utils_1.JsonStruct)])),
    }),
});
//# sourceMappingURL=request.js.map