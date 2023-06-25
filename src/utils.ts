import { Struct, assert, pattern, string } from 'superstruct';

/**
 * UUIDv4 struct.
 */
export const UuidStruct = pattern(
  string(),
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
export type OmitUnion<T, K extends keyof any> = T extends any
  ? Omit<T, K>
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
export function strictMask<T, S>(
  value: unknown,
  struct: Struct<T, S>,
  message?: string,
): T {
  assert(value, struct, message);
  return value;
}
