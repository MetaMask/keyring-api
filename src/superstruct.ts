/* eslint-disable @typescript-eslint/naming-convention */
import {
  type Infer,
  type Context,
  Struct,
  object as stObject,
} from 'superstruct';
import type {
  ObjectSchema,
  OmitBy,
  Optionalize,
  PickBy,
  Simplify,
} from 'superstruct/dist/utils';

declare const ExactOptionalSymbol: unique symbol;

export type ExactOptionalTag = {
  type: typeof ExactOptionalSymbol;
};

/**
 * Exclude a type from the properties of a type.
 *
 * ```ts
 * type Foo = { a: string | null; b: number };
 * type Bar = ExcludeType<Foo, null>;
 * // Bar = { a: string, b: number }
 * ```
 */
export type ExcludeType<T, V> = {
  [K in keyof T]: Exclude<T[K], V>;
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
export type ExactOptionalize<S extends object> = OmitBy<S, ExactOptionalTag> &
  Partial<ExcludeType<PickBy<S, ExactOptionalTag>, ExactOptionalTag>>;

/**
 * Infer a type from an superstruct object schema.
 */
export type ObjectType<S extends ObjectSchema> = Simplify<
  ExactOptionalize<Optionalize<{ [K in keyof S]: Infer<S[K]> }>>
>;

/**
 * Change the return type of a superstruct object struct to support exact
 * optional properties.
 *
 * @param schema - The object schema.
 * @returns A struct representing an object with a known set of properties.
 */
export function object<S extends ObjectSchema>(
  schema: S,
): Struct<ObjectType<S>, S> {
  return stObject(schema) as any;
}

/**
 * Check if the current property is present in its parent object.
 *
 * @param ctx - The context to check.
 * @returns `true` if the property is present, `false` otherwise.
 */
function hasOptional(ctx: Context): boolean {
  const property: string = ctx.path[ctx.path.length - 1];
  const parent: Record<string, unknown> = ctx.branch[ctx.branch.length - 2];

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
export function exactOptional<T, S>(
  struct: Struct<T, S>,
): Struct<T | ExactOptionalTag, S> {
  return new Struct({
    ...struct,

    validator: (value, ctx) =>
      !hasOptional(ctx) || struct.validator(value, ctx),

    refiner: (value, ctx) =>
      !hasOptional(ctx) || struct.refiner(value as T, ctx),
  });
}
