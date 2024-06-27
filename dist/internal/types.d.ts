import type { Infer, Struct } from '@metamask/superstruct';
import { BtcAccountType, EthAccountType } from '../api';
export type InternalAccountType = EthAccountType | BtcAccountType;
export declare const InternalAccountMetadataStruct: Struct<{
    metadata: {
        name: string;
        importTime: number;
        keyring: {
            type: string;
        };
        snap?: {
            id: string;
            name: string;
            enabled: boolean;
        };
        lastSelected?: number;
    };
}, {
    metadata: Struct<{
        name: string;
        importTime: number;
        keyring: {
            type: string;
        };
        snap?: {
            id: string;
            name: string;
            enabled: boolean;
        };
        lastSelected?: number;
    }, {
        name: Struct<string, null>;
        snap: Struct<import("../superstruct").ExactOptionalTag | {
            id: string;
            name: string;
            enabled: boolean;
        }, {
            id: Struct<string, null>;
            enabled: Struct<boolean, null>;
            name: Struct<string, null>;
        }>;
        lastSelected: Struct<number | import("../superstruct").ExactOptionalTag, null>;
        importTime: Struct<number, null>;
        keyring: Struct<{
            type: string;
        }, {
            type: Struct<string, null>;
        }>;
    }>;
}>;
export declare const InternalEthEoaAccountStruct: Struct<{
    type: "eip155:eoa";
    id: string;
    address: string;
    options: Record<string, import("@metamask/utils").Json>;
    methods: ("personal_sign" | "eth_sign" | "eth_signTransaction" | "eth_signTypedData_v1" | "eth_signTypedData_v3" | "eth_signTypedData_v4")[];
    metadata: {
        name: string;
        importTime: number;
        keyring: {
            type: string;
        };
        snap?: {
            id: string;
            name: string;
            enabled: boolean;
        };
        lastSelected?: number;
    };
}, {
    address: Struct<string, null>;
    type: Struct<"eip155:eoa", "eip155:eoa">;
    methods: Struct<("personal_sign" | "eth_sign" | "eth_signTransaction" | "eth_signTypedData_v1" | "eth_signTypedData_v3" | "eth_signTypedData_v4")[], Struct<"personal_sign" | "eth_sign" | "eth_signTransaction" | "eth_signTypedData_v1" | "eth_signTypedData_v3" | "eth_signTypedData_v4", {
        personal_sign: "personal_sign";
        eth_sign: "eth_sign";
        eth_signTransaction: "eth_signTransaction";
        eth_signTypedData_v1: "eth_signTypedData_v1";
        eth_signTypedData_v3: "eth_signTypedData_v3";
        eth_signTypedData_v4: "eth_signTypedData_v4";
    }>>;
    id: Struct<string, null>;
    options: Struct<Record<string, import("@metamask/utils").Json>, null>;
} & {
    metadata: Struct<{
        name: string;
        importTime: number;
        keyring: {
            type: string;
        };
        snap?: {
            id: string;
            name: string;
            enabled: boolean;
        };
        lastSelected?: number;
    }, {
        name: Struct<string, null>;
        snap: Struct<import("../superstruct").ExactOptionalTag | {
            id: string;
            name: string;
            enabled: boolean;
        }, {
            id: Struct<string, null>;
            enabled: Struct<boolean, null>;
            name: Struct<string, null>;
        }>;
        lastSelected: Struct<number | import("../superstruct").ExactOptionalTag, null>;
        importTime: Struct<number, null>;
        keyring: Struct<{
            type: string;
        }, {
            type: Struct<string, null>;
        }>;
    }>;
}>;
export declare const InternalEthErc4337AccountStruct: Struct<{
    type: "eip155:erc4337";
    id: string;
    address: string;
    options: Record<string, import("@metamask/utils").Json>;
    methods: ("personal_sign" | "eth_sign" | "eth_signTypedData_v1" | "eth_signTypedData_v3" | "eth_signTypedData_v4" | "eth_prepareUserOperation" | "eth_patchUserOperation" | "eth_signUserOperation")[];
    metadata: {
        name: string;
        importTime: number;
        keyring: {
            type: string;
        };
        snap?: {
            id: string;
            name: string;
            enabled: boolean;
        };
        lastSelected?: number;
    };
}, {
    address: Struct<string, null>;
    type: Struct<"eip155:erc4337", "eip155:erc4337">;
    methods: Struct<("personal_sign" | "eth_sign" | "eth_signTypedData_v1" | "eth_signTypedData_v3" | "eth_signTypedData_v4" | "eth_prepareUserOperation" | "eth_patchUserOperation" | "eth_signUserOperation")[], Struct<"personal_sign" | "eth_sign" | "eth_signTypedData_v1" | "eth_signTypedData_v3" | "eth_signTypedData_v4" | "eth_prepareUserOperation" | "eth_patchUserOperation" | "eth_signUserOperation", {
        personal_sign: "personal_sign";
        eth_sign: "eth_sign";
        eth_signTypedData_v1: "eth_signTypedData_v1";
        eth_signTypedData_v3: "eth_signTypedData_v3";
        eth_signTypedData_v4: "eth_signTypedData_v4";
        eth_prepareUserOperation: "eth_prepareUserOperation";
        eth_patchUserOperation: "eth_patchUserOperation";
        eth_signUserOperation: "eth_signUserOperation";
    }>>;
    id: Struct<string, null>;
    options: Struct<Record<string, import("@metamask/utils").Json>, null>;
} & {
    metadata: Struct<{
        name: string;
        importTime: number;
        keyring: {
            type: string;
        };
        snap?: {
            id: string;
            name: string;
            enabled: boolean;
        };
        lastSelected?: number;
    }, {
        name: Struct<string, null>;
        snap: Struct<import("../superstruct").ExactOptionalTag | {
            id: string;
            name: string;
            enabled: boolean;
        }, {
            id: Struct<string, null>;
            enabled: Struct<boolean, null>;
            name: Struct<string, null>;
        }>;
        lastSelected: Struct<number | import("../superstruct").ExactOptionalTag, null>;
        importTime: Struct<number, null>;
        keyring: Struct<{
            type: string;
        }, {
            type: Struct<string, null>;
        }>;
    }>;
}>;
export declare const InternalBtcP2wpkhAccountStruct: Struct<{
    type: "bip122:p2wpkh";
    id: string;
    address: string;
    options: Record<string, import("@metamask/utils").Json>;
    methods: "btc_sendmany"[];
    metadata: {
        name: string;
        importTime: number;
        keyring: {
            type: string;
        };
        snap?: {
            id: string;
            name: string;
            enabled: boolean;
        };
        lastSelected?: number;
    };
}, {
    address: Struct<string, null>;
    type: Struct<"bip122:p2wpkh", "bip122:p2wpkh">;
    methods: Struct<"btc_sendmany"[], Struct<"btc_sendmany", {
        btc_sendmany: "btc_sendmany";
    }>>;
    id: Struct<string, null>;
    options: Struct<Record<string, import("@metamask/utils").Json>, null>;
} & {
    metadata: Struct<{
        name: string;
        importTime: number;
        keyring: {
            type: string;
        };
        snap?: {
            id: string;
            name: string;
            enabled: boolean;
        };
        lastSelected?: number;
    }, {
        name: Struct<string, null>;
        snap: Struct<import("../superstruct").ExactOptionalTag | {
            id: string;
            name: string;
            enabled: boolean;
        }, {
            id: Struct<string, null>;
            enabled: Struct<boolean, null>;
            name: Struct<string, null>;
        }>;
        lastSelected: Struct<number | import("../superstruct").ExactOptionalTag, null>;
        importTime: Struct<number, null>;
        keyring: Struct<{
            type: string;
        }, {
            type: Struct<string, null>;
        }>;
    }>;
}>;
export type InternalEthEoaAccount = Infer<typeof InternalEthEoaAccountStruct>;
export type InternalEthErc4337Account = Infer<typeof InternalEthErc4337AccountStruct>;
export type InternalBtcP2wpkhAccount = Infer<typeof InternalBtcP2wpkhAccountStruct>;
export declare const InternalAccountStructs: Record<string, Struct<InternalEthEoaAccount> | Struct<InternalEthErc4337Account> | Struct<InternalBtcP2wpkhAccount>>;
export type InternalAccountTypes = InternalEthEoaAccount | InternalEthErc4337Account | InternalBtcP2wpkhAccount;
export declare const InternalAccountStruct: Struct<{
    type: "eip155:eoa" | "eip155:erc4337" | "bip122:p2wpkh";
    id: string;
    address: string;
    options: Record<string, import("@metamask/utils").Json>;
    methods: string[];
    metadata: {
        name: string;
        importTime: number;
        keyring: {
            type: string;
        };
        snap?: {
            id: string;
            name: string;
            enabled: boolean;
        };
        lastSelected?: number;
    };
}, {
    metadata: Struct<{
        name: string;
        importTime: number;
        keyring: {
            type: string;
        };
        snap?: {
            id: string;
            name: string;
            enabled: boolean;
        };
        lastSelected?: number;
    }, {
        name: Struct<string, null>;
        snap: Struct<import("../superstruct").ExactOptionalTag | {
            id: string;
            name: string;
            enabled: boolean;
        }, {
            id: Struct<string, null>;
            enabled: Struct<boolean, null>;
            name: Struct<string, null>;
        }>;
        lastSelected: Struct<number | import("../superstruct").ExactOptionalTag, null>;
        importTime: Struct<number, null>;
        keyring: Struct<{
            type: string;
        }, {
            type: Struct<string, null>;
        }>;
    }>;
    id: Struct<string, null>;
    type: Struct<"eip155:eoa" | "eip155:erc4337" | "bip122:p2wpkh", {
        "eip155:eoa": "eip155:eoa";
        "eip155:erc4337": "eip155:erc4337";
        "bip122:p2wpkh": "bip122:p2wpkh";
    }>;
    address: Struct<string, null>;
    options: Struct<Record<string, import("@metamask/utils").Json>, null>;
    methods: Struct<string[], Struct<string, null>>;
}>;
/**
 * Internal account representation.
 *
 * This type is used internally by MetaMask to add additional metadata to the
 * account object. It's should not be used by external applications.
 */
export type InternalAccount = Infer<typeof InternalAccountStruct>;
