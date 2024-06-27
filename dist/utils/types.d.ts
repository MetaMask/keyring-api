import { type Infer } from '@metamask/superstruct';
/**
 * UUIDv4 struct.
 */
export declare const UuidStruct: import("@metamask/superstruct").Struct<string, null>;
/**
 * Validates if a given value is a valid URL.
 *
 * @param value - The value to be validated.
 * @returns A boolean indicating if the value is a valid URL.
 */
export declare const UrlStruct: import("@metamask/superstruct").Struct<string, null>;
/**
 * A string which contains a positive float number.
 */
export declare const StringNumberStruct: import("@metamask/superstruct").Struct<string, null>;
export type StringNumber = Infer<typeof StringNumberStruct>;
