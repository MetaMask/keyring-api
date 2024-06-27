"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalAccountStruct = exports.InternalAccountStructs = exports.InternalBtcP2wpkhAccountStruct = exports.InternalEthErc4337AccountStruct = exports.InternalEthEoaAccountStruct = exports.InternalAccountMetadataStruct = void 0;
const superstruct_1 = require("@metamask/superstruct");
const api_1 = require("../api");
const types_1 = require("../btc/types");
const types_2 = require("../eth/types");
const superstruct_2 = require("../superstruct");
exports.InternalAccountMetadataStruct = (0, superstruct_2.object)({
    metadata: (0, superstruct_2.object)({
        name: (0, superstruct_1.string)(),
        snap: (0, superstruct_2.exactOptional)((0, superstruct_2.object)({
            id: (0, superstruct_1.string)(),
            enabled: (0, superstruct_1.boolean)(),
            name: (0, superstruct_1.string)(),
        })),
        lastSelected: (0, superstruct_2.exactOptional)((0, superstruct_1.number)()),
        importTime: (0, superstruct_1.number)(),
        keyring: (0, superstruct_2.object)({
            type: (0, superstruct_1.string)(),
        }),
    }),
});
/**
 * Creates an `InternalAccount` from an existing account `superstruct` object.
 *
 * @param accountStruct - An account `superstruct` object.
 * @returns The `InternalAccount` associated to `accountStruct`.
 */
function asInternalAccountStruct(accountStruct) {
    return (0, superstruct_2.object)({
        ...accountStruct.schema,
        ...exports.InternalAccountMetadataStruct.schema,
    });
}
exports.InternalEthEoaAccountStruct = asInternalAccountStruct(types_2.EthEoaAccountStruct);
exports.InternalEthErc4337AccountStruct = asInternalAccountStruct(types_2.EthErc4337AccountStruct);
exports.InternalBtcP2wpkhAccountStruct = asInternalAccountStruct(types_1.BtcP2wpkhAccountStruct);
exports.InternalAccountStructs = {
    [`${api_1.EthAccountType.Eoa}`]: exports.InternalEthEoaAccountStruct,
    [`${api_1.EthAccountType.Erc4337}`]: exports.InternalEthErc4337AccountStruct,
    [`${api_1.BtcAccountType.P2wpkh}`]: exports.InternalBtcP2wpkhAccountStruct,
};
exports.InternalAccountStruct = (0, superstruct_2.object)({
    ...api_1.KeyringAccountStruct.schema,
    ...exports.InternalAccountMetadataStruct.schema,
});
//# sourceMappingURL=types.js.map