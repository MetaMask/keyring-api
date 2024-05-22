import { assert } from 'superstruct';
import type { Struct } from 'superstruct';

import { definePattern } from './superstruct';

/**
 * UUIDv4 struct.
 */
export const UuidStruct = definePattern(
  'UuidV4',
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu,
);

/**
 * Omit keys from a union type.
 *
 * The normal `Omit` type does not distribute over unions. So we use this
 * workaround that applies `Omit` to each member of the union.
 *
 * See: <https://github.com/microsoft/TypeScript/issues/31501#issuecomment-1280579305>
 */
export type OmitUnion<Type, Key extends keyof any> = Type extends any
  ? Omit<Type, Key>
  : never;

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
export function strictMask<Type, Schema>(
  value: unknown,
  struct: Struct<Type, Schema>,
  message?: string,
): Type {
  assert(value, struct, message);
  return value;
}

/**
 * Type that resolves to `true` if `Child` extends `Base`, otherwise `false`.
 *
 * @example
 * ```ts
 * type A = Extends<{a: string, b: string}, {a: string}>; // true
 * type B = Extends<{a: string}, {a: string, b: string}>; // false
 * ```
 */
export type Extends<Child, Base> = Child extends Base ? true : false;

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
export function expectTrue<Type extends true>(): void {
  // Intentionally empty
}
