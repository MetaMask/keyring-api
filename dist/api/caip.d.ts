import { type Infer } from '@metamask/superstruct';
/**
 * A CAIP-19 asset type identifier, i.e., a human-readable type of asset identifier.
 */
export declare const CaipAssetTypeStruct: import("@metamask/superstruct").Struct<string, null>;
export type CaipAssetType = Infer<typeof CaipAssetTypeStruct>;
/**
 * A CAIP-19 asset ID identifier, i.e., a human-readable type of asset ID.
 */
export declare const CaipAssetIdStruct: import("@metamask/superstruct").Struct<string, null>;
export type CaipAssetId = Infer<typeof CaipAssetIdStruct>;
/**
 * Check if the given value is a {@link CaipAssetType}.
 *
 * @param value - The value to check.
 * @returns Whether the value is a {@link CaipAssetType}.
 * @example
 * ```ts
 * isCaipAssetType('eip155:1/slip44:60'); // true
 * isCaipAssetType('cosmos:cosmoshub-3/slip44:118'); // true
 * isCaipAssetType('hedera:mainnet/nft:0.0.55492/12'); // false
 * ```
 */
export declare function isCaipAssetType(value: unknown): value is CaipAssetType;
/**
 * Check if the given value is a {@link CaipAssetId}.
 *
 * @param value - The value to check.
 * @returns Whether the value is a {@link CaipAssetId}.
 * @example
 * ```ts
 * isCaipAssetType('eip155:1/slip44:60'); // false
 * isCaipAssetType('cosmos:cosmoshub-3/slip44:118'); // false
 * isCaipAssetType('hedera:mainnet/nft:0.0.55492/12'); // true
 * ```
 */
export declare function isCaipAssetId(value: unknown): value is CaipAssetId;
