"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceStruct = void 0;
const superstruct_1 = require("@metamask/superstruct");
const superstruct_2 = require("../superstruct");
const utils_1 = require("../utils");
exports.BalanceStruct = (0, superstruct_2.object)({
    amount: utils_1.StringNumberStruct,
    unit: (0, superstruct_1.string)(),
});
//# sourceMappingURL=balance.js.map