import type { Infer } from '@metamask/superstruct';
export declare const BalanceStruct: import("@metamask/superstruct").Struct<{
    amount: string;
    unit: string;
}, {
    amount: import("@metamask/superstruct").Struct<string, null>;
    unit: import("@metamask/superstruct").Struct<string, null>;
}>;
export type Balance = Infer<typeof BalanceStruct>;
