"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyringAccountStruct = exports.BtcAccountType = exports.EthAccountType = void 0;
const superstruct_1 = require("@metamask/superstruct");
const utils_1 = require("@metamask/utils");
const superstruct_2 = require("../superstruct");
const utils_2 = require("../utils");
/**
 * Supported Ethereum account types.
 */
var EthAccountType;
(function (EthAccountType) {
    EthAccountType["Eoa"] = "eip155:eoa";
    EthAccountType["Erc4337"] = "eip155:erc4337";
})(EthAccountType = exports.EthAccountType || (exports.EthAccountType = {}));
/**
 * Supported Bitcoin account types.
 */
var BtcAccountType;
(function (BtcAccountType) {
    BtcAccountType["P2wpkh"] = "bip122:p2wpkh";
})(BtcAccountType = exports.BtcAccountType || (exports.BtcAccountType = {}));
/**
 * A struct which represents a Keyring account object. It is abstract enough to
 * be used with any blockchain. Specific blockchain account types should extend
 * this struct.
 *
 * See {@link KeyringAccount}.
 */
exports.KeyringAccountStruct = (0, superstruct_2.object)({
    /**
     * Account ID (UUIDv4).
     */
    id: utils_2.UuidStruct,
    /**
     * Account type.
     */
    type: (0, superstruct_1.enums)([
        `${EthAccountType.Eoa}`,
        `${EthAccountType.Erc4337}`,
        `${BtcAccountType.P2wpkh}`,
    ]),
    /**
     * Account main address.
     */
    address: (0, superstruct_1.string)(),
    /**
     * Account options.
     */
    options: (0, superstruct_1.record)((0, superstruct_1.string)(), utils_1.JsonStruct),
    /**
     * Account supported methods.
     */
    methods: (0, superstruct_1.array)((0, superstruct_1.string)()),
});
//# sourceMappingURL=account.js.map