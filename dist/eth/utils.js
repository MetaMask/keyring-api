"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEvmAccountType = void 0;
const api_1 = require("../api");
/**
 * Checks if the given type is an EVM account type.
 *
 * @param type - The type to check.
 * @returns Returns true if the type is an EVM account type, false otherwise.
 */
function isEvmAccountType(type) {
    return type === api_1.EthAccountType.Eoa || type === api_1.EthAccountType.Erc4337;
}
exports.isEvmAccountType = isEvmAccountType;
//# sourceMappingURL=utils.js.map