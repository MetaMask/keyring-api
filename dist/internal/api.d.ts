import type { Infer } from '@metamask/superstruct';
export declare const ListAccountsRequestStruct: import("@metamask/superstruct").Struct<{
    jsonrpc: "2.0";
    id: string | number | null;
    method: "keyring_listAccounts";
}, {
    method: import("@metamask/superstruct").Struct<"keyring_listAccounts", "keyring_listAccounts">;
    jsonrpc: import("@metamask/superstruct").Struct<"2.0", "2.0">;
    id: import("@metamask/superstruct").Struct<string | number | null, null>;
}>;
export type ListAccountsRequest = Infer<typeof ListAccountsRequestStruct>;
export declare const ListAccountsResponseStruct: import("@metamask/superstruct").Struct<{
    type: "eip155:eoa" | "eip155:erc4337" | "bip122:p2wpkh";
    id: string;
    address: string;
    options: Record<string, import("@metamask/utils").Json>;
    methods: string[];
}[], import("@metamask/superstruct").Struct<{
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
}>>;
export type ListAccountsResponse = Infer<typeof ListAccountsResponseStruct>;
export declare const GetAccountRequestStruct: import("@metamask/superstruct").Struct<{
    jsonrpc: "2.0";
    id: string | number | null;
    method: "keyring_getAccount";
    params: {
        id: string;
    };
}, {
    method: import("@metamask/superstruct").Struct<"keyring_getAccount", "keyring_getAccount">;
    params: import("@metamask/superstruct").Struct<{
        id: string;
    }, {
        id: import("@metamask/superstruct").Struct<string, null>;
    }>;
    jsonrpc: import("@metamask/superstruct").Struct<"2.0", "2.0">;
    id: import("@metamask/superstruct").Struct<string | number | null, null>;
}>;
export type GetAccountRequest = Infer<typeof GetAccountRequestStruct>;
export declare const GetAccountResponseStruct: import("@metamask/superstruct").Struct<{
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
export type GetAccountResponse = Infer<typeof GetAccountResponseStruct>;
export declare const CreateAccountRequestStruct: import("@metamask/superstruct").Struct<{
    jsonrpc: "2.0";
    id: string | number | null;
    method: "keyring_createAccount";
    params: {
        options: Record<string, import("@metamask/utils").Json>;
    };
}, {
    method: import("@metamask/superstruct").Struct<"keyring_createAccount", "keyring_createAccount">;
    params: import("@metamask/superstruct").Struct<{
        options: Record<string, import("@metamask/utils").Json>;
    }, {
        options: import("@metamask/superstruct").Struct<Record<string, import("@metamask/utils").Json>, null>;
    }>;
    jsonrpc: import("@metamask/superstruct").Struct<"2.0", "2.0">;
    id: import("@metamask/superstruct").Struct<string | number | null, null>;
}>;
export type CreateAccountRequest = Infer<typeof CreateAccountRequestStruct>;
export declare const CreateAccountResponseStruct: import("@metamask/superstruct").Struct<{
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
export type CreateAccountResponse = Infer<typeof CreateAccountResponseStruct>;
export declare const GetAccountBalancesRequestStruct: import("@metamask/superstruct").Struct<{
    jsonrpc: "2.0";
    id: string | number | null;
    method: "keyring_getAccountBalances";
    params: {
        id: string;
        assets: string[];
    };
}, {
    method: import("@metamask/superstruct").Struct<"keyring_getAccountBalances", "keyring_getAccountBalances">;
    params: import("@metamask/superstruct").Struct<{
        id: string;
        assets: string[];
    }, {
        id: import("@metamask/superstruct").Struct<string, null>;
        assets: import("@metamask/superstruct").Struct<string[], import("@metamask/superstruct").Struct<string, null>>;
    }>;
    jsonrpc: import("@metamask/superstruct").Struct<"2.0", "2.0">;
    id: import("@metamask/superstruct").Struct<string | number | null, null>;
}>;
export type GetAccountBalancesRequest = Infer<typeof GetAccountBalancesRequestStruct>;
export declare const GetAccountBalancesResponseStruct: import("@metamask/superstruct").Struct<Record<string, {
    amount: string;
    unit: string;
}>, null>;
export type GetAccountBalancesResponse = Infer<typeof GetAccountBalancesResponseStruct>;
export declare const FilterAccountChainsStruct: import("@metamask/superstruct").Struct<{
    jsonrpc: "2.0";
    id: string | number | null;
    method: "keyring_filterAccountChains";
    params: {
        id: string;
        chains: string[];
    };
}, {
    method: import("@metamask/superstruct").Struct<"keyring_filterAccountChains", "keyring_filterAccountChains">;
    params: import("@metamask/superstruct").Struct<{
        id: string;
        chains: string[];
    }, {
        id: import("@metamask/superstruct").Struct<string, null>;
        chains: import("@metamask/superstruct").Struct<string[], import("@metamask/superstruct").Struct<string, null>>;
    }>;
    jsonrpc: import("@metamask/superstruct").Struct<"2.0", "2.0">;
    id: import("@metamask/superstruct").Struct<string | number | null, null>;
}>;
export type FilterAccountChainsRequest = Infer<typeof FilterAccountChainsStruct>;
export declare const FilterAccountChainsResponseStruct: import("@metamask/superstruct").Struct<string[], import("@metamask/superstruct").Struct<string, null>>;
export type FilterAccountChainsResponse = Infer<typeof FilterAccountChainsResponseStruct>;
export declare const UpdateAccountRequestStruct: import("@metamask/superstruct").Struct<{
    jsonrpc: "2.0";
    id: string | number | null;
    method: "keyring_updateAccount";
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
    method: import("@metamask/superstruct").Struct<"keyring_updateAccount", "keyring_updateAccount">;
    params: import("@metamask/superstruct").Struct<{
        account: {
            type: "eip155:eoa" | "eip155:erc4337" | "bip122:p2wpkh";
            id: string;
            address: string;
            options: Record<string, import("@metamask/utils").Json>;
            methods: string[];
        };
    }, {
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
    jsonrpc: import("@metamask/superstruct").Struct<"2.0", "2.0">;
    id: import("@metamask/superstruct").Struct<string | number | null, null>;
}>;
export type UpdateAccountRequest = Infer<typeof UpdateAccountRequestStruct>;
export declare const UpdateAccountResponseStruct: import("@metamask/superstruct").Struct<null, null>;
export type UpdateAccountResponse = Infer<typeof UpdateAccountResponseStruct>;
export declare const DeleteAccountRequestStruct: import("@metamask/superstruct").Struct<{
    jsonrpc: "2.0";
    id: string | number | null;
    method: "keyring_deleteAccount";
    params: {
        id: string;
    };
}, {
    method: import("@metamask/superstruct").Struct<"keyring_deleteAccount", "keyring_deleteAccount">;
    params: import("@metamask/superstruct").Struct<{
        id: string;
    }, {
        id: import("@metamask/superstruct").Struct<string, null>;
    }>;
    jsonrpc: import("@metamask/superstruct").Struct<"2.0", "2.0">;
    id: import("@metamask/superstruct").Struct<string | number | null, null>;
}>;
export type DeleteAccountRequest = Infer<typeof DeleteAccountRequestStruct>;
export declare const DeleteAccountResponseStruct: import("@metamask/superstruct").Struct<null, null>;
export type DeleteAccountResponse = Infer<typeof DeleteAccountResponseStruct>;
export declare const ExportAccountRequestStruct: import("@metamask/superstruct").Struct<{
    jsonrpc: "2.0";
    id: string | number | null;
    method: "keyring_exportAccount";
    params: {
        id: string;
    };
}, {
    method: import("@metamask/superstruct").Struct<"keyring_exportAccount", "keyring_exportAccount">;
    params: import("@metamask/superstruct").Struct<{
        id: string;
    }, {
        id: import("@metamask/superstruct").Struct<string, null>;
    }>;
    jsonrpc: import("@metamask/superstruct").Struct<"2.0", "2.0">;
    id: import("@metamask/superstruct").Struct<string | number | null, null>;
}>;
export type ExportAccountRequest = Infer<typeof ExportAccountRequestStruct>;
export declare const ExportAccountResponseStruct: import("@metamask/superstruct").Struct<Record<string, import("@metamask/utils").Json>, null>;
export type ExportAccountResponse = Infer<typeof ExportAccountResponseStruct>;
export declare const ListRequestsRequestStruct: import("@metamask/superstruct").Struct<{
    jsonrpc: "2.0";
    id: string | number | null;
    method: "keyring_listRequests";
}, {
    method: import("@metamask/superstruct").Struct<"keyring_listRequests", "keyring_listRequests">;
    jsonrpc: import("@metamask/superstruct").Struct<"2.0", "2.0">;
    id: import("@metamask/superstruct").Struct<string | number | null, null>;
}>;
export type ListRequestsRequest = Infer<typeof ListRequestsRequestStruct>;
export declare const ListRequestsResponseStruct: import("@metamask/superstruct").Struct<{
    id: string;
    scope: string;
    account: string;
    request: {
        method: string;
        params?: import("@metamask/utils").Json[] | Record<string, import("@metamask/utils").Json>;
    };
}[], import("@metamask/superstruct").Struct<{
    id: string;
    scope: string;
    account: string;
    request: {
        method: string;
        params?: import("@metamask/utils").Json[] | Record<string, import("@metamask/utils").Json>;
    };
}, {
    id: import("@metamask/superstruct").Struct<string, null>;
    scope: import("@metamask/superstruct").Struct<string, null>;
    account: import("@metamask/superstruct").Struct<string, null>;
    request: import("@metamask/superstruct").Struct<{
        method: string;
        params?: import("@metamask/utils").Json[] | Record<string, import("@metamask/utils").Json>;
    }, {
        method: import("@metamask/superstruct").Struct<string, null>;
        params: import("@metamask/superstruct").Struct<import("../superstruct").ExactOptionalTag | import("@metamask/utils").Json[] | Record<string, import("@metamask/utils").Json>, null>;
    }>;
}>>;
export type ListRequestsResponse = Infer<typeof ListRequestsResponseStruct>;
export declare const GetRequestRequestStruct: import("@metamask/superstruct").Struct<{
    jsonrpc: "2.0";
    id: string | number | null;
    method: "keyring_getRequest";
    params: {
        id: string;
    };
}, {
    method: import("@metamask/superstruct").Struct<"keyring_getRequest", "keyring_getRequest">;
    params: import("@metamask/superstruct").Struct<{
        id: string;
    }, {
        id: import("@metamask/superstruct").Struct<string, null>;
    }>;
    jsonrpc: import("@metamask/superstruct").Struct<"2.0", "2.0">;
    id: import("@metamask/superstruct").Struct<string | number | null, null>;
}>;
export type GetRequestRequest = Infer<typeof GetRequestRequestStruct>;
export declare const GetRequestResponseStruct: import("@metamask/superstruct").Struct<{
    id: string;
    scope: string;
    account: string;
    request: {
        method: string;
        params?: import("@metamask/utils").Json[] | Record<string, import("@metamask/utils").Json>;
    };
}, {
    id: import("@metamask/superstruct").Struct<string, null>;
    scope: import("@metamask/superstruct").Struct<string, null>;
    account: import("@metamask/superstruct").Struct<string, null>;
    request: import("@metamask/superstruct").Struct<{
        method: string;
        params?: import("@metamask/utils").Json[] | Record<string, import("@metamask/utils").Json>;
    }, {
        method: import("@metamask/superstruct").Struct<string, null>;
        params: import("@metamask/superstruct").Struct<import("../superstruct").ExactOptionalTag | import("@metamask/utils").Json[] | Record<string, import("@metamask/utils").Json>, null>;
    }>;
}>;
export type GetRequestResponse = Infer<typeof GetRequestResponseStruct>;
export declare const SubmitRequestRequestStruct: import("@metamask/superstruct").Struct<{
    jsonrpc: "2.0";
    id: string | number | null;
    method: "keyring_submitRequest";
    params: {
        id: string;
        scope: string;
        account: string;
        request: {
            method: string;
            params?: import("@metamask/utils").Json[] | Record<string, import("@metamask/utils").Json>;
        };
    };
}, {
    method: import("@metamask/superstruct").Struct<"keyring_submitRequest", "keyring_submitRequest">;
    params: import("@metamask/superstruct").Struct<{
        id: string;
        scope: string;
        account: string;
        request: {
            method: string;
            params?: import("@metamask/utils").Json[] | Record<string, import("@metamask/utils").Json>;
        };
    }, {
        id: import("@metamask/superstruct").Struct<string, null>;
        scope: import("@metamask/superstruct").Struct<string, null>;
        account: import("@metamask/superstruct").Struct<string, null>;
        request: import("@metamask/superstruct").Struct<{
            method: string;
            params?: import("@metamask/utils").Json[] | Record<string, import("@metamask/utils").Json>;
        }, {
            method: import("@metamask/superstruct").Struct<string, null>;
            params: import("@metamask/superstruct").Struct<import("../superstruct").ExactOptionalTag | import("@metamask/utils").Json[] | Record<string, import("@metamask/utils").Json>, null>;
        }>;
    }>;
    jsonrpc: import("@metamask/superstruct").Struct<"2.0", "2.0">;
    id: import("@metamask/superstruct").Struct<string | number | null, null>;
}>;
export type SubmitRequestRequest = Infer<typeof SubmitRequestRequestStruct>;
export declare const SubmitRequestResponseStruct: import("@metamask/superstruct").Struct<{
    pending: true;
    redirect?: {
        message?: string;
        url?: string;
    };
} | {
    pending: false;
    result: import("@metamask/utils").Json;
}, null>;
export type SubmitRequestResponse = Infer<typeof SubmitRequestResponseStruct>;
export declare const ApproveRequestRequestStruct: import("@metamask/superstruct").Struct<{
    jsonrpc: "2.0";
    id: string | number | null;
    method: "keyring_approveRequest";
    params: {
        id: string;
        data: Record<string, import("@metamask/utils").Json>;
    };
}, {
    method: import("@metamask/superstruct").Struct<"keyring_approveRequest", "keyring_approveRequest">;
    params: import("@metamask/superstruct").Struct<{
        id: string;
        data: Record<string, import("@metamask/utils").Json>;
    }, {
        id: import("@metamask/superstruct").Struct<string, null>;
        data: import("@metamask/superstruct").Struct<Record<string, import("@metamask/utils").Json>, null>;
    }>;
    jsonrpc: import("@metamask/superstruct").Struct<"2.0", "2.0">;
    id: import("@metamask/superstruct").Struct<string | number | null, null>;
}>;
export type ApproveRequestRequest = Infer<typeof ApproveRequestRequestStruct>;
export declare const ApproveRequestResponseStruct: import("@metamask/superstruct").Struct<null, null>;
export type ApproveRequestResponse = Infer<typeof ApproveRequestResponseStruct>;
export declare const RejectRequestRequestStruct: import("@metamask/superstruct").Struct<{
    jsonrpc: "2.0";
    id: string | number | null;
    method: "keyring_rejectRequest";
    params: {
        id: string;
    };
}, {
    method: import("@metamask/superstruct").Struct<"keyring_rejectRequest", "keyring_rejectRequest">;
    params: import("@metamask/superstruct").Struct<{
        id: string;
    }, {
        id: import("@metamask/superstruct").Struct<string, null>;
    }>;
    jsonrpc: import("@metamask/superstruct").Struct<"2.0", "2.0">;
    id: import("@metamask/superstruct").Struct<string | number | null, null>;
}>;
export type RejectRequestRequest = Infer<typeof RejectRequestRequestStruct>;
export declare const RejectRequestResponseStruct: import("@metamask/superstruct").Struct<null, null>;
export type RejectRequestResponse = Infer<typeof RejectRequestResponseStruct>;
