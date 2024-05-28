import { definePattern } from '../superstruct';

/**
 * UUIDv4 struct.
 */
export const UuidStruct = definePattern(
  'UuidV4',
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu,
);
