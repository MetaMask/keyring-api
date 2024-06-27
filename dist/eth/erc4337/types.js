"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthUserOperationPatchStruct = exports.EthBaseUserOperationStruct = exports.EthBaseTransactionStruct = exports.EthUserOperationStruct = void 0;
const superstruct_1 = require("../../superstruct");
const utils_1 = require("../../utils");
const types_1 = require("../types");
/**
 * Struct of a UserOperation as defined by ERC-4337.
 * @see https://eips.ethereum.org/EIPS/eip-4337#definitions
 */
exports.EthUserOperationStruct = (0, superstruct_1.object)({
    sender: types_1.EthAddressStruct,
    nonce: types_1.EthUint256Struct,
    initCode: types_1.EthBytesStruct,
    callData: types_1.EthBytesStruct,
    callGasLimit: types_1.EthUint256Struct,
    verificationGasLimit: types_1.EthUint256Struct,
    preVerificationGas: types_1.EthUint256Struct,
    maxFeePerGas: types_1.EthUint256Struct,
    maxPriorityFeePerGas: types_1.EthUint256Struct,
    paymasterAndData: types_1.EthBytesStruct,
    signature: types_1.EthBytesStruct,
});
/**
 * Struct containing the most basic transaction information required to
 * construct a UserOperation.
 */
exports.EthBaseTransactionStruct = (0, superstruct_1.object)({
    /**
     * Address of the transaction recipient.
     */
    to: types_1.EthAddressStruct,
    /**
     * Amount of wei to transfer to the recipient.
     */
    value: types_1.EthUint256Struct,
    /**
     * Data to pass to the recipient.
     */
    data: types_1.EthBytesStruct,
});
exports.EthBaseUserOperationStruct = (0, superstruct_1.object)({
    nonce: types_1.EthUint256Struct,
    initCode: types_1.EthBytesStruct,
    callData: types_1.EthBytesStruct,
    gasLimits: (0, superstruct_1.exactOptional)((0, superstruct_1.object)({
        callGasLimit: types_1.EthUint256Struct,
        verificationGasLimit: types_1.EthUint256Struct,
        preVerificationGas: types_1.EthUint256Struct,
    })),
    dummyPaymasterAndData: types_1.EthBytesStruct,
    dummySignature: types_1.EthBytesStruct,
    bundlerUrl: utils_1.UrlStruct,
});
exports.EthUserOperationPatchStruct = (0, superstruct_1.object)({
    paymasterAndData: types_1.EthBytesStruct,
    callGasLimit: (0, superstruct_1.exactOptional)(types_1.EthUint256Struct),
    verificationGasLimit: (0, superstruct_1.exactOptional)(types_1.EthUint256Struct),
    preVerificationGas: (0, superstruct_1.exactOptional)(types_1.EthUint256Struct),
});
//# sourceMappingURL=types.js.map