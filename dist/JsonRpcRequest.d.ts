import type { Infer } from '@metamask/superstruct';
export declare const JsonRpcRequestStruct: import("@metamask/superstruct").Struct<{
    jsonrpc: "2.0";
    id: string | number | null;
    method: string;
    params?: import("@metamask/utils").Json[] | Record<string, import("@metamask/utils").Json>;
}, {
    jsonrpc: import("@metamask/superstruct").Struct<"2.0", "2.0">;
    id: import("@metamask/superstruct").Struct<string | number | null, null>;
    method: import("@metamask/superstruct").Struct<string, null>;
    params: import("@metamask/superstruct").Struct<import("./superstruct").ExactOptionalTag | import("@metamask/utils").Json[] | Record<string, import("@metamask/utils").Json>, null>;
}>;
/**
 * JSON-RPC request type.
 */
export type JsonRpcRequest = Infer<typeof JsonRpcRequestStruct>;
