import type { Infer } from '@metamask/superstruct';
export declare const EthBytesStruct: import("@metamask/superstruct").Struct<string, null>;
export declare const EthAddressStruct: import("@metamask/superstruct").Struct<string, null>;
export declare const EthUint256Struct: import("@metamask/superstruct").Struct<string, null>;
/**
 * Supported Ethereum methods.
 */
export declare enum EthMethod {
    PersonalSign = "personal_sign",
    Sign = "eth_sign",
    SignTransaction = "eth_signTransaction",
    SignTypedDataV1 = "eth_signTypedData_v1",
    SignTypedDataV3 = "eth_signTypedData_v3",
    SignTypedDataV4 = "eth_signTypedData_v4",
    PrepareUserOperation = "eth_prepareUserOperation",
    PatchUserOperation = "eth_patchUserOperation",
    SignUserOperation = "eth_signUserOperation"
}
export declare const EthEoaAccountStruct: import("@metamask/superstruct").Struct<{
    type: "eip155:eoa";
    id: string;
    address: string;
    options: Record<string, import("@metamask/utils").Json>;
    methods: ("personal_sign" | "eth_sign" | "eth_signTransaction" | "eth_signTypedData_v1" | "eth_signTypedData_v3" | "eth_signTypedData_v4")[];
}, {
    /**
     * Account address.
     */
    address: import("@metamask/superstruct").Struct<string, null>;
    /**
     * Account type.
     */
    type: import("@metamask/superstruct").Struct<"eip155:eoa", "eip155:eoa">;
    /**
     * Account supported methods.
     */
    methods: import("@metamask/superstruct").Struct<("personal_sign" | "eth_sign" | "eth_signTransaction" | "eth_signTypedData_v1" | "eth_signTypedData_v3" | "eth_signTypedData_v4")[], import("@metamask/superstruct").Struct<"personal_sign" | "eth_sign" | "eth_signTransaction" | "eth_signTypedData_v1" | "eth_signTypedData_v3" | "eth_signTypedData_v4", {
        personal_sign: "personal_sign";
        eth_sign: "eth_sign";
        eth_signTransaction: "eth_signTransaction";
        eth_signTypedData_v1: "eth_signTypedData_v1";
        eth_signTypedData_v3: "eth_signTypedData_v3";
        eth_signTypedData_v4: "eth_signTypedData_v4";
    }>>;
    id: import("@metamask/superstruct").Struct<string, null>;
    options: import("@metamask/superstruct").Struct<Record<string, import("@metamask/utils").Json>, null>;
}>;
export type EthEoaAccount = Infer<typeof EthEoaAccountStruct>;
export declare const EthErc4337AccountStruct: import("@metamask/superstruct").Struct<{
    type: "eip155:erc4337";
    id: string;
    address: string;
    options: Record<string, import("@metamask/utils").Json>;
    methods: ("personal_sign" | "eth_sign" | "eth_signTypedData_v1" | "eth_signTypedData_v3" | "eth_signTypedData_v4" | "eth_prepareUserOperation" | "eth_patchUserOperation" | "eth_signUserOperation")[];
}, {
    /**
     * Account address.
     */
    address: import("@metamask/superstruct").Struct<string, null>;
    /**
     * Account type.
     */
    type: import("@metamask/superstruct").Struct<"eip155:erc4337", "eip155:erc4337">;
    /**
     * Account supported methods.
     */
    methods: import("@metamask/superstruct").Struct<("personal_sign" | "eth_sign" | "eth_signTypedData_v1" | "eth_signTypedData_v3" | "eth_signTypedData_v4" | "eth_prepareUserOperation" | "eth_patchUserOperation" | "eth_signUserOperation")[], import("@metamask/superstruct").Struct<"personal_sign" | "eth_sign" | "eth_signTypedData_v1" | "eth_signTypedData_v3" | "eth_signTypedData_v4" | "eth_prepareUserOperation" | "eth_patchUserOperation" | "eth_signUserOperation", {
        personal_sign: "personal_sign";
        eth_sign: "eth_sign";
        eth_signTypedData_v1: "eth_signTypedData_v1";
        eth_signTypedData_v3: "eth_signTypedData_v3";
        eth_signTypedData_v4: "eth_signTypedData_v4";
        eth_prepareUserOperation: "eth_prepareUserOperation";
        eth_patchUserOperation: "eth_patchUserOperation";
        eth_signUserOperation: "eth_signUserOperation";
    }>>;
    id: import("@metamask/superstruct").Struct<string, null>;
    options: import("@metamask/superstruct").Struct<Record<string, import("@metamask/utils").Json>, null>;
}>;
export type EthErc4337Account = Infer<typeof EthErc4337AccountStruct>;
