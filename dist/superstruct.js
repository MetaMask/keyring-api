"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strictMask = exports.definePattern = exports.exactOptional = exports.object = void 0;
const superstruct_1 = require("@metamask/superstruct");
/**
 * Change the return type of a superstruct object struct to support exact
 * optional properties.
 *
 * @param schema - The object schema.
 * @returns A struct representing an object with a known set of properties.
 */
function object(schema) {
    return (0, superstruct_1.object)(schema);
}
exports.object = object;
/**
 * Check if the current property is present in its parent object.
 *
 * @param ctx - The context to check.
 * @returns `true` if the property is present, `false` otherwise.
 */
function hasOptional(ctx) {
    const property = ctx.path[ctx.path.length - 1];
    const parent = ctx.branch[ctx.branch.length - 2];
    return property in parent;
}
/**
 * Augment a struct to allow exact-optional values. Exact-optional values can
 * be omitted but cannot be `undefined`.
 *
 * ```ts
 * const foo = object({ bar: exactOptional(string()) });
 * type Foo = Infer<typeof foo>;
 * // Foo = { bar?: string }
 * ```
 *
 * @param struct - The struct to augment.
 * @returns The augmented struct.
 */
function exactOptional(struct) {
    return new superstruct_1.Struct({
        ...struct,
        validator: (value, ctx) => !hasOptional(ctx) || struct.validator(value, ctx),
        refiner: (value, ctx) => !hasOptional(ctx) || struct.refiner(value, ctx),
    });
}
exports.exactOptional = exactOptional;
/**
 * Defines a new string-struct matching a regular expression.
 *
 * Example:
 *
 * ```ts
 * const EthAddressStruct = definePattern('EthAddress', /^0x[0-9a-f]{40}$/iu);
 * ```
 *
 * @param name - Type name.
 * @param pattern - Regular expression to match.
 * @returns A new string-struct that matches the given pattern.
 */
function definePattern(name, pattern) {
    return (0, superstruct_1.define)(name, (value) => typeof value === 'string' && pattern.test(value));
}
exports.definePattern = definePattern;
/**
 * Assert that a value is valid according to a struct.
 *
 * It is similar to superstruct's mask function, but it does not ignore extra
 * properties.
 *
 * @param value - Value to check.
 * @param struct - Struct to validate the value against.
 * @param message - Error message to throw if the value is not valid.
 * @returns The value if it is valid.
 */
function strictMask(value, struct, message) {
    (0, superstruct_1.assert)(value, struct, message);
    return value;
}
exports.strictMask = strictMask;
//# sourceMappingURL=superstruct.js.map