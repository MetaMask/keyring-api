"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCaipAssetId = exports.isCaipAssetType = exports.CaipAssetIdStruct = exports.CaipAssetTypeStruct = void 0;
const superstruct_1 = require("@metamask/superstruct");
const superstruct_2 = require("../superstruct");
const CAIP_ASSET_TYPE_REGEX = /^(?<chainId>(?<namespace>[-a-z0-9]{3,8}):(?<reference>[-_a-zA-Z0-9]{1,32}))\/(?<assetNamespace>[-a-z0-9]{3,8}):(?<assetReference>[-.%a-zA-Z0-9]{1,128})$/u;
const CAIP_ASSET_ID_REGEX = /^(?<chainId>(?<namespace>[-a-z0-9]{3,8}):(?<reference>[-_a-zA-Z0-9]{1,32}))\/(?<assetNamespace>[-a-z0-9]{3,8}):(?<assetReference>[-.%a-zA-Z0-9]{1,128})\/(?<tokenId>[-.%a-zA-Z0-9]{1,78})$/u;
/**
 * A CAIP-19 asset type identifier, i.e., a human-readable type of asset identifier.
 */
exports.CaipAssetTypeStruct = (0, superstruct_2.definePattern)('CaipAssetType', CAIP_ASSET_TYPE_REGEX);
/**
 * A CAIP-19 asset ID identifier, i.e., a human-readable type of asset ID.
 */
exports.CaipAssetIdStruct = (0, superstruct_2.definePattern)('CaipAssetId', CAIP_ASSET_ID_REGEX);
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
function isCaipAssetType(value) {
    return (0, superstruct_1.is)(value, exports.CaipAssetTypeStruct);
}
exports.isCaipAssetType = isCaipAssetType;
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
function isCaipAssetId(value) {
    return (0, superstruct_1.is)(value, exports.CaipAssetIdStruct);
}
exports.isCaipAssetId = isCaipAssetId;
//# sourceMappingURL=caip.js.map