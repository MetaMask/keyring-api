import { is, max, number, string, union } from 'superstruct';

import { exactOptional, literal, object } from '.';

describe('superstruct', () => {
  describe('exactOptional', () => {
    const simpleStruct = object({
      foo: exactOptional(string()),
    });

    it.each([
      { struct: simpleStruct, obj: {}, expected: true },
      { struct: simpleStruct, obj: { foo: undefined }, expected: false },
      { struct: simpleStruct, obj: { foo: 'hi' }, expected: true },
      { struct: simpleStruct, obj: { bar: 'hi' }, expected: false },
      { struct: simpleStruct, obj: { foo: 1 }, expected: false },
    ])(
      'returns $expected for is($obj, <struct>)',
      ({ struct, obj, expected }) => {
        expect(is(obj, struct)).toBe(expected);
      },
    );

    const nestedStruct = object({
      foo: object({
        bar: exactOptional(string()),
      }),
    });

    it.each([
      { struct: nestedStruct, obj: { foo: {} }, expected: true },
      { struct: nestedStruct, obj: { foo: { bar: 'hi' } }, expected: true },
      {
        struct: nestedStruct,
        obj: { foo: { bar: undefined } },
        expected: false,
      },
    ])(
      'returns $expected for is($obj, <struct>)',
      ({ struct, obj, expected }) => {
        expect(is(obj, struct)).toBe(expected);
      },
    );

    const structWithUndef = object({
      foo: exactOptional(union([string(), literal(undefined)])),
    });

    it.each([
      { struct: structWithUndef, obj: {}, expected: true },
      { struct: structWithUndef, obj: { foo: undefined }, expected: true },
      { struct: structWithUndef, obj: { foo: 'hi' }, expected: true },
      { struct: structWithUndef, obj: { bar: 'hi' }, expected: false },
      { struct: structWithUndef, obj: { foo: 1 }, expected: false },
    ])(
      'returns $expected for is($obj, <struct>)',
      ({ struct, obj, expected }) => {
        expect(is(obj, struct)).toBe(expected);
      },
    );

    it('should support refinements', () => {
      const struct = object({
        foo: exactOptional(max(number(), 0)),
      });

      expect(is({ foo: 0 }, struct)).toBe(true);
      expect(is({ foo: -1 }, struct)).toBe(true);
      expect(is({ foo: 1 }, struct)).toBe(false);
    });
  });

  describe('literal', () => {
    it('should support string literals', () => {
      const struct = literal('foo');

      expect(is('foo', struct)).toBe(true);
      expect(is('bar', struct)).toBe(false);
    });

    it('should support boolean literals', () => {
      const struct = literal(false);

      expect(is(true, struct)).toBe(false);
      expect(is(false, struct)).toBe(true);
    });

    it('should support number literals', () => {
      const struct = literal(0);

      expect(is(0, struct)).toBe(true);
      expect(is(1, struct)).toBe(false);
    });

    it('should support null literals', () => {
      const struct = literal(null);

      expect(is(null, struct)).toBe(true);
      expect(is(undefined, struct)).toBe(false);
    });

    it('should have the string value as type name', () => {
      const struct = literal('foo');
      expect(struct.type).toBe('"foo"');
    });

    it('should have the number value as type name', () => {
      const struct = literal(0);
      expect(struct.type).toBe('0');
    });

    it('should have the boolean value as type name', () => {
      const struct = literal(true);
      expect(struct.type).toBe('true');
    });

    it('should have undefined as type name', () => {
      const struct = literal(undefined);
      expect(struct.type).toBe('undefined');
    });

    it('should have null as type name', () => {
      const struct = literal(null);
      expect(struct.type).toBe('null');
    });

    it('should have literal as type name', () => {
      const struct = literal({});
      expect(struct.type).toBe('literal');
    });
  });
});
