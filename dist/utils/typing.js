"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectTrue = void 0;
/**
 * Assert that a type extends `true`. It can be used, for example, to assert
 * that a given type extends another type.
 *
 * @example
 * ```ts
 * expectTrue<Extends<{a: string, b: string}, {a: string}>>(); // Ok
 * expectTrue<Extends<{a: string}, {a: string, b: string}>>(); // Error
 * ```
 *
 * This function follows the naming pattern used on `tsd`.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function expectTrue() {
    // Intentionally empty
}
exports.expectTrue = expectTrue;
//# sourceMappingURL=typing.js.map