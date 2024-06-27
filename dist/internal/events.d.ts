export declare const AccountCreatedEventStruct: import("@metamask/superstruct").Struct<{
    method: "notify:accountCreated";
    params: {
        account: {
            type: "eip155:eoa" | "eip155:erc4337" | "bip122:p2wpkh";
            id: string;
            address: string;
            options: Record<string, import("@metamask/utils").Json>;
            methods: string[];
        };
        accountNameSuggestion?: string;
        displayConfirmation?: boolean;
    };
}, {
    method: import("@metamask/superstruct").Struct<"notify:accountCreated", "notify:accountCreated">;
    params: import("@metamask/superstruct").Struct<{
        account: {
            type: "eip155:eoa" | "eip155:erc4337" | "bip122:p2wpkh";
            id: string;
            address: string;
            options: Record<string, import("@metamask/utils").Json>;
            methods: string[];
        };
        accountNameSuggestion?: string;
        displayConfirmation?: boolean;
    }, {
        /**
         * New account object.
         */
        account: import("@metamask/superstruct").Struct<{
            type: "eip155:eoa" | "eip155:erc4337" | "bip122:p2wpkh";
            id: string;
            address: string;
            options: Record<string, import("@metamask/utils").Json>;
            methods: string[];
        }, {
            id: import("@metamask/superstruct").Struct<string, null>;
            type: import("@metamask/superstruct").Struct<"eip155:eoa" | "eip155:erc4337" | "bip122:p2wpkh", {
                "eip155:eoa": "eip155:eoa";
                "eip155:erc4337": "eip155:erc4337";
                "bip122:p2wpkh": "bip122:p2wpkh";
            }>;
            address: import("@metamask/superstruct").Struct<string, null>;
            options: import("@metamask/superstruct").Struct<Record<string, import("@metamask/utils").Json>, null>;
            methods: import("@metamask/superstruct").Struct<string[], import("@metamask/superstruct").Struct<string, null>>;
        }>;
        /**
         * Account name suggestion provided to the MetaMask client.
         *
         * The keyring can suggest a name for the account, but it's up to the
         * client to decide whether to use it. The keyring won't be informed if the
         * client decides to use a different name.
         */
        accountNameSuggestion: import("@metamask/superstruct").Struct<string | import("../superstruct").ExactOptionalTag, null>;
        /**
         * Instructs MetaMask to display the add account confirmation dialog in the UI.
         * **Note:** This is not guaranteed to be honored by the MetaMask client.
         */
        displayConfirmation: import("@metamask/superstruct").Struct<boolean | import("../superstruct").ExactOptionalTag, null>;
    }>;
}>;
export declare const AccountUpdatedEventStruct: import("@metamask/superstruct").Struct<{
    method: "notify:accountUpdated";
    params: {
        account: {
            type: "eip155:eoa" | "eip155:erc4337" | "bip122:p2wpkh";
            id: string;
            address: string;
            options: Record<string, import("@metamask/utils").Json>;
            methods: string[];
        };
    };
}, {
    method: import("@metamask/superstruct").Struct<"notify:accountUpdated", "notify:accountUpdated">;
    params: import("@metamask/superstruct").Struct<{
        account: {
            type: "eip155:eoa" | "eip155:erc4337" | "bip122:p2wpkh";
            id: string;
            address: string;
            options: Record<string, import("@metamask/utils").Json>;
            methods: string[];
        };
    }, {
        /**
         * Updated account object.
         */
        account: import("@metamask/superstruct").Struct<{
            type: "eip155:eoa" | "eip155:erc4337" | "bip122:p2wpkh";
            id: string;
            address: string;
            options: Record<string, import("@metamask/utils").Json>;
            methods: string[];
        }, {
            id: import("@metamask/superstruct").Struct<string, null>;
            type: import("@metamask/superstruct").Struct<"eip155:eoa" | "eip155:erc4337" | "bip122:p2wpkh", {
                "eip155:eoa": "eip155:eoa";
                "eip155:erc4337": "eip155:erc4337";
                "bip122:p2wpkh": "bip122:p2wpkh";
            }>;
            address: import("@metamask/superstruct").Struct<string, null>;
            options: import("@metamask/superstruct").Struct<Record<string, import("@metamask/utils").Json>, null>;
            methods: import("@metamask/superstruct").Struct<string[], import("@metamask/superstruct").Struct<string, null>>;
        }>;
    }>;
}>;
export declare const AccountDeletedEventStruct: import("@metamask/superstruct").Struct<{
    method: "notify:accountDeleted";
    params: {
        id: string;
    };
}, {
    method: import("@metamask/superstruct").Struct<"notify:accountDeleted", "notify:accountDeleted">;
    params: import("@metamask/superstruct").Struct<{
        id: string;
    }, {
        /**
         * Deleted account ID.
         */
        id: import("@metamask/superstruct").Struct<string, null>;
    }>;
}>;
export declare const RequestApprovedEventStruct: import("@metamask/superstruct").Struct<{
    method: "notify:requestApproved";
    params: {
        id: string;
        result: import("@metamask/utils").Json;
    };
}, {
    method: import("@metamask/superstruct").Struct<"notify:requestApproved", "notify:requestApproved">;
    params: import("@metamask/superstruct").Struct<{
        id: string;
        result: import("@metamask/utils").Json;
    }, {
        /**
         * Request ID.
         */
        id: import("@metamask/superstruct").Struct<string, null>;
        /**
         * Request result.
         */
        result: import("@metamask/superstruct").Struct<import("@metamask/utils").Json, unknown>;
    }>;
}>;
export declare const RequestRejectedEventStruct: import("@metamask/superstruct").Struct<{
    method: "notify:requestRejected";
    params: {
        id: string;
    };
}, {
    method: import("@metamask/superstruct").Struct<"notify:requestRejected", "notify:requestRejected">;
    params: import("@metamask/superstruct").Struct<{
        id: string;
    }, {
        /**
         * Request ID.
         */
        id: import("@metamask/superstruct").Struct<string, null>;
    }>;
}>;
