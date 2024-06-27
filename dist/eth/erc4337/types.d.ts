import { type Infer } from '@metamask/superstruct';
/**
 * Struct of a UserOperation as defined by ERC-4337.
 * @see https://eips.ethereum.org/EIPS/eip-4337#definitions
 */
export declare const EthUserOperationStruct: import("@metamask/superstruct").Struct<{
    sender: string;
    nonce: string;
    initCode: string;
    callData: string;
    callGasLimit: string;
    verificationGasLimit: string;
    preVerificationGas: string;
    maxFeePerGas: string;
    maxPriorityFeePerGas: string;
    paymasterAndData: string;
    signature: string;
}, {
    sender: import("@metamask/superstruct").Struct<string, null>;
    nonce: import("@metamask/superstruct").Struct<string, null>;
    initCode: import("@metamask/superstruct").Struct<string, null>;
    callData: import("@metamask/superstruct").Struct<string, null>;
    callGasLimit: import("@metamask/superstruct").Struct<string, null>;
    verificationGasLimit: import("@metamask/superstruct").Struct<string, null>;
    preVerificationGas: import("@metamask/superstruct").Struct<string, null>;
    maxFeePerGas: import("@metamask/superstruct").Struct<string, null>;
    maxPriorityFeePerGas: import("@metamask/superstruct").Struct<string, null>;
    paymasterAndData: import("@metamask/superstruct").Struct<string, null>;
    signature: import("@metamask/superstruct").Struct<string, null>;
}>;
export type EthUserOperation = Infer<typeof EthUserOperationStruct>;
/**
 * Struct containing the most basic transaction information required to
 * construct a UserOperation.
 */
export declare const EthBaseTransactionStruct: import("@metamask/superstruct").Struct<{
    value: string;
    data: string;
    to: string;
}, {
    /**
     * Address of the transaction recipient.
     */
    to: import("@metamask/superstruct").Struct<string, null>;
    /**
     * Amount of wei to transfer to the recipient.
     */
    value: import("@metamask/superstruct").Struct<string, null>;
    /**
     * Data to pass to the recipient.
     */
    data: import("@metamask/superstruct").Struct<string, null>;
}>;
export type EthBaseTransaction = Infer<typeof EthBaseTransactionStruct>;
export declare const EthBaseUserOperationStruct: import("@metamask/superstruct").Struct<{
    nonce: string;
    initCode: string;
    callData: string;
    dummyPaymasterAndData: string;
    dummySignature: string;
    bundlerUrl: string;
    gasLimits?: {
        callGasLimit: string;
        verificationGasLimit: string;
        preVerificationGas: string;
    };
}, {
    nonce: import("@metamask/superstruct").Struct<string, null>;
    initCode: import("@metamask/superstruct").Struct<string, null>;
    callData: import("@metamask/superstruct").Struct<string, null>;
    gasLimits: import("@metamask/superstruct").Struct<import("../../superstruct").ExactOptionalTag | {
        callGasLimit: string;
        verificationGasLimit: string;
        preVerificationGas: string;
    }, {
        callGasLimit: import("@metamask/superstruct").Struct<string, null>;
        verificationGasLimit: import("@metamask/superstruct").Struct<string, null>;
        preVerificationGas: import("@metamask/superstruct").Struct<string, null>;
    }>;
    dummyPaymasterAndData: import("@metamask/superstruct").Struct<string, null>;
    dummySignature: import("@metamask/superstruct").Struct<string, null>;
    bundlerUrl: import("@metamask/superstruct").Struct<string, null>;
}>;
export type EthBaseUserOperation = Infer<typeof EthBaseUserOperationStruct>;
export declare const EthUserOperationPatchStruct: import("@metamask/superstruct").Struct<{
    paymasterAndData: string;
    callGasLimit?: string;
    verificationGasLimit?: string;
    preVerificationGas?: string;
}, {
    paymasterAndData: import("@metamask/superstruct").Struct<string, null>;
    callGasLimit: import("@metamask/superstruct").Struct<string | import("../../superstruct").ExactOptionalTag, null>;
    verificationGasLimit: import("@metamask/superstruct").Struct<string | import("../../superstruct").ExactOptionalTag, null>;
    preVerificationGas: import("@metamask/superstruct").Struct<string | import("../../superstruct").ExactOptionalTag, null>;
}>;
export type EthUserOperationPatch = Infer<typeof EthUserOperationPatchStruct>;
