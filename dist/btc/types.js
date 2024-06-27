"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BtcP2wpkhAccountStruct = exports.BtcMethod = exports.BtcP2wpkhAddressStruct = void 0;
const superstruct_1 = require("@metamask/superstruct");
const bech32_1 = require("bech32");
const api_1 = require("../api");
const superstruct_2 = require("../superstruct");
exports.BtcP2wpkhAddressStruct = (0, superstruct_1.refine)((0, superstruct_1.string)(), 'BtcP2wpkhAddressStruct', (address) => {
    try {
        bech32_1.bech32.decode(address);
    }
    catch (error) {
        return new Error(`Could not decode P2WPKH address: ${error.message}`);
    }
    return true;
});
/**
 * Supported Bitcoin methods.
 */
var BtcMethod;
(function (BtcMethod) {
    // General transaction methods
    BtcMethod["SendMany"] = "btc_sendmany";
})(BtcMethod = exports.BtcMethod || (exports.BtcMethod = {}));
exports.BtcP2wpkhAccountStruct = (0, superstruct_2.object)({
    ...api_1.KeyringAccountStruct.schema,
    /**
     * Account address.
     */
    address: exports.BtcP2wpkhAddressStruct,
    /**
     * Account type.
     */
    type: (0, superstruct_1.literal)(`${api_1.BtcAccountType.P2wpkh}`),
    /**
     * Account supported methods.
     */
    methods: (0, superstruct_1.array)((0, superstruct_1.enums)([`${BtcMethod.SendMany}`])),
});
//# sourceMappingURL=types.js.map