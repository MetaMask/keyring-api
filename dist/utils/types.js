"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringNumberStruct = exports.UrlStruct = exports.UuidStruct = void 0;
const superstruct_1 = require("@metamask/superstruct");
const superstruct_2 = require("../superstruct");
/**
 * UUIDv4 struct.
 */
exports.UuidStruct = (0, superstruct_2.definePattern)('UuidV4', /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu);
/**
 * Validates if a given value is a valid URL.
 *
 * @param value - The value to be validated.
 * @returns A boolean indicating if the value is a valid URL.
 */
exports.UrlStruct = (0, superstruct_1.define)('Url', (value) => {
    try {
        const url = new URL(value);
        return url.protocol === 'http:' || url.protocol === 'https:';
    }
    catch (_) {
        return false;
    }
});
/**
 * A string which contains a positive float number.
 */
exports.StringNumberStruct = (0, superstruct_2.definePattern)('StringNumber', /^\d+(\.\d+)?$/u);
//# sourceMappingURL=types.js.map