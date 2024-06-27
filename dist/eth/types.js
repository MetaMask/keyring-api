"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthErc4337AccountStruct = exports.EthEoaAccountStruct = exports.EthMethod = exports.EthUint256Struct = exports.EthAddressStruct = exports.EthBytesStruct = void 0;
const superstruct_1 = require("@metamask/superstruct");
const api_1 = require("../api");
const superstruct_2 = require("../superstruct");
exports.EthBytesStruct = (0, superstruct_2.definePattern)('EthBytes', /^0x[0-9a-f]*$/iu);
exports.EthAddressStruct = (0, superstruct_2.definePattern)('EthAddress', /^0x[0-9a-f]{40}$/iu);
exports.EthUint256Struct = (0, superstruct_2.definePattern)('EthUint256', /^0x([1-9a-f][0-9a-f]*|0)$/iu);
/**
 * Supported Ethereum methods.
 */
var EthMethod;
(function (EthMethod) {
    // General signing methods
    EthMethod["PersonalSign"] = "personal_sign";
    EthMethod["Sign"] = "eth_sign";
    EthMethod["SignTransaction"] = "eth_signTransaction";
    EthMethod["SignTypedDataV1"] = "eth_signTypedData_v1";
    EthMethod["SignTypedDataV3"] = "eth_signTypedData_v3";
    EthMethod["SignTypedDataV4"] = "eth_signTypedData_v4";
    // ERC-4337 methods
    EthMethod["PrepareUserOperation"] = "eth_prepareUserOperation";
    EthMethod["PatchUserOperation"] = "eth_patchUserOperation";
    EthMethod["SignUserOperation"] = "eth_signUserOperation";
})(EthMethod = exports.EthMethod || (exports.EthMethod = {}));
exports.EthEoaAccountStruct = (0, superstruct_2.object)({
    ...api_1.KeyringAccountStruct.schema,
    /**
     * Account address.
     */
    address: exports.EthAddressStruct,
    /**
     * Account type.
     */
    type: (0, superstruct_1.literal)(`${api_1.EthAccountType.Eoa}`),
    /**
     * Account supported methods.
     */
    methods: (0, superstruct_1.array)((0, superstruct_1.enums)([
        `${EthMethod.PersonalSign}`,
        `${EthMethod.Sign}`,
        `${EthMethod.SignTransaction}`,
        `${EthMethod.SignTypedDataV1}`,
        `${EthMethod.SignTypedDataV3}`,
        `${EthMethod.SignTypedDataV4}`,
    ])),
});
exports.EthErc4337AccountStruct = (0, superstruct_2.object)({
    ...api_1.KeyringAccountStruct.schema,
    /**
     * Account address.
     */
    address: exports.EthAddressStruct,
    /**
     * Account type.
     */
    type: (0, superstruct_1.literal)(`${api_1.EthAccountType.Erc4337}`),
    /**
     * Account supported methods.
     */
    methods: (0, superstruct_1.array)((0, superstruct_1.enums)([
        `${EthMethod.PersonalSign}`,
        `${EthMethod.Sign}`,
        `${EthMethod.SignTypedDataV1}`,
        `${EthMethod.SignTypedDataV3}`,
        `${EthMethod.SignTypedDataV4}`,
        `${EthMethod.PrepareUserOperation}`,
        `${EthMethod.PatchUserOperation}`,
        `${EthMethod.SignUserOperation}`,
    ])),
});
//# sourceMappingURL=types.js.map