import type { Infer, ObjectSchema, OmitBy, Optionalize, PickBy, Simplify } from '@metamask/superstruct';
import { Struct } from '@metamask/superstruct';
declare const ExactOptionalSymbol: unique symbol;
export type ExactOptionalTag = {
    type: typeof ExactOptionalSymbol;
};
/**
 * Exclude type `Type` from the properties of `Obj`.
 *
 * ```ts
 * type Foo = { a: string | null; b: number };
 * type Bar = ExcludeType<Foo, null>;
 * // Bar = { a: string, b: number }
 * ```
 */
export type ExcludeType<Obj, Type> = {
    [K in keyof Obj]: Exclude<Obj[K], Type>;
};
/**
 * Make optional all properties that have the `ExactOptionalTag` type.
 *
 * ```ts
 * type Foo = { a: string | ExactOptionalTag; b: number};
 * type Bar = ExactOptionalize<Foo>;
 * // Bar = { a?: string; b: number}
 * ```
 */
export type ExactOptionalize<Schema extends object> = OmitBy<Schema, ExactOptionalTag> & Partial<ExcludeType<PickBy<Schema, ExactOptionalTag>, ExactOptionalTag>>;
/**
 * Infer a type from an superstruct object schema.
 */
export type ObjectType<Schema extends ObjectSchema> = Simplify<ExactOptionalize<Optionalize<{
    [K in keyof Schema]: Infer<Schema[K]>;
}>>>;
/**
 * Change the return type of a superstruct object struct to support exact
 * optional properties.
 *
 * @param schema - The object schema.
 * @returns A struct representing an object with a known set of properties.
 */
export declare function object<Schema extends ObjectSchema>(schema: Schema): Struct<ObjectType<Schema>, Schema>;
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
export declare function exactOptional<Type, Schema>(struct: Struct<Type, Schema>): Struct<Type | ExactOptionalTag, Schema>;
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
export declare function definePattern(name: string, pattern: RegExp): Struct<string, null>;
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
export declare function strictMask<Type, Schema>(value: unknown, struct: Struct<Type, Schema>, message?: string): Type;
export {};
