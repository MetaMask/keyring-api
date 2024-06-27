"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonRpcRequestStruct = void 0;
const superstruct_1 = require("@metamask/superstruct");
const utils_1 = require("@metamask/utils");
const superstruct_2 = require("./superstruct");
exports.JsonRpcRequestStruct = (0, superstruct_2.object)({
    jsonrpc: (0, superstruct_1.literal)('2.0'),
    id: (0, superstruct_1.union)([(0, superstruct_1.string)(), (0, superstruct_1.number)(), (0, superstruct_1.literal)(null)]),
    method: (0, superstruct_1.string)(),
    params: (0, superstruct_2.exactOptional)((0, superstruct_1.union)([(0, superstruct_1.array)(utils_1.JsonStruct), (0, superstruct_1.record)((0, superstruct_1.string)(), utils_1.JsonStruct)])),
});
//# sourceMappingURL=JsonRpcRequest.js.map