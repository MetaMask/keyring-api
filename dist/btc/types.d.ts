import type { Infer } from '@metamask/superstruct';
export declare const BtcP2wpkhAddressStruct: import("@metamask/superstruct").Struct<string, null>;
/**
 * Supported Bitcoin methods.
 */
export declare enum BtcMethod {
    SendMany = "btc_sendmany"
}
export declare const BtcP2wpkhAccountStruct: import("@metamask/superstruct").Struct<{
    type: "bip122:p2wpkh";
    id: string;
    address: string;
    options: Record<string, import("@metamask/utils").Json>;
    methods: "btc_sendmany"[];
}, {
    /**
     * Account address.
     */
    address: import("@metamask/superstruct").Struct<string, null>;
    /**
     * Account type.
     */
    type: import("@metamask/superstruct").Struct<"bip122:p2wpkh", "bip122:p2wpkh">;
    /**
     * Account supported methods.
     */
    methods: import("@metamask/superstruct").Struct<"btc_sendmany"[], import("@metamask/superstruct").Struct<"btc_sendmany", {
        btc_sendmany: "btc_sendmany";
    }>>;
    id: import("@metamask/superstruct").Struct<string, null>;
    options: import("@metamask/superstruct").Struct<Record<string, import("@metamask/utils").Json>, null>;
}>;
export type BtcP2wpkhAccount = Infer<typeof BtcP2wpkhAccountStruct>;
