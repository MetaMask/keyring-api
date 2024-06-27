import type { Infer } from '@metamask/superstruct';
/**
 * Supported Ethereum account types.
 */
export declare enum EthAccountType {
    Eoa = "eip155:eoa",
    Erc4337 = "eip155:erc4337"
}
/**
 * Supported Bitcoin account types.
 */
export declare enum BtcAccountType {
    P2wpkh = "bip122:p2wpkh"
}
/**
 * Supported account types.
 */
export type KeyringAccountType = `${EthAccountType.Eoa}` | `${EthAccountType.Erc4337}` | `${BtcAccountType.P2wpkh}`;
/**
 * A struct which represents a Keyring account object. It is abstract enough to
 * be used with any blockchain. Specific blockchain account types should extend
 * this struct.
 *
 * See {@link KeyringAccount}.
 */
export declare const KeyringAccountStruct: import("@metamask/superstruct").Struct<{
    type: "eip155:eoa" | "eip155:erc4337" | "bip122:p2wpkh";
    id: string;
    address: string;
    options: Record<string, import("@metamask/utils").Json>;
    methods: string[];
}, {
    /**
     * Account ID (UUIDv4).
     */
    id: import("@metamask/superstruct").Struct<string, null>;
    /**
     * Account type.
     */
    type: import("@metamask/superstruct").Struct<"eip155:eoa" | "eip155:erc4337" | "bip122:p2wpkh", {
        "eip155:eoa": "eip155:eoa";
        "eip155:erc4337": "eip155:erc4337";
        "bip122:p2wpkh": "bip122:p2wpkh";
    }>;
    /**
     * Account main address.
     */
    address: import("@metamask/superstruct").Struct<string, null>;
    /**
     * Account options.
     */
    options: import("@metamask/superstruct").Struct<Record<string, import("@metamask/utils").Json>, null>;
    /**
     * Account supported methods.
     */
    methods: import("@metamask/superstruct").Struct<string[], import("@metamask/superstruct").Struct<string, null>>;
}>;
/**
 * Keyring Account type represents an account and its properties from the
 * point of view of the keyring.
 */
export type KeyringAccount = Infer<typeof KeyringAccountStruct>;
