import { assert } from 'superstruct';

import { KeyringAccountStruct } from './api';

const supportedKeyringAccountTypes = Object.keys(
  KeyringAccountStruct.schema.type.schema,
)
  .map((type: string) => `"${type}"`)
  .join(',');

describe('api', () => {
  const baseAccount = {
    id: '606a7759-b0fb-48e4-9874-bab62ff8e7eb',
    address: '0x000',
    options: {},
    methods: [],
  };

  describe('KeyringAccount', () => {
    it.each([
      [undefined, 'undefined'],
      [null, 'null'],
      ['not:supported', '"not:supported"'],
    ])(
      'throws an error if account type is: %s',
      (type: any, typeAsStr: string) => {
        const account = {
          type,
          ...baseAccount,
        };
        expect(() => assert(account, KeyringAccountStruct)).toThrow(
          `At path: type -- Expected one of \`${supportedKeyringAccountTypes}\`, but received: ${typeAsStr}`,
        );
      },
    );
  });
});

describe('InternalAccount', () => {
  it.each([
    { type: 'eip155:eoa', address: '0x000' },
    {
      type: 'bip122:p2wpkh',
      address: 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4',
    },
  ])('should have the correct structure: %s', ({ type, address }) => {
    const account = {
      id: '606a7759-b0fb-48e4-9874-bab62ff8e7eb',
      address,
      options: {},
      methods: [],
      type,
      metadata: {
        keyring: {
          type: 'Test Keyring',
        },
        name: 'Account 1',
        importTime: 1713153716,
      },
    };

    expect(() => assert(account, KeyringAccountStruct)).not.toThrow();
  });

  it('should throw if metadata.keyring.type is not set', () => {
    const account = {
      id: '606a7759-b0fb-48e4-9874-bab62ff8e7eb',
      address: '0x000',
      options: {},
      methods: [],
      type: 'eip155:eoa',
      metadata: {
        keyring: {},
        name: 'Account 1',
        importTime: 1713153716,
      },
    };

    expect(() => assert(account, KeyringAccountStruct)).toThrow(
      'At path: metadata.keyring.type -- Expected a string, but received: undefined',
    );
  });

  it('should throw if metadata.keyring is not set', () => {
    const account = {
      id: '606a7759-b0fb-48e4-9874-bab62ff8e7eb',
      address: '0x000',
      options: {},
      methods: [],
      type: 'eip155:eoa',
      metadata: {
        name: 'Account 1',
        importTime: 1713153716,
      },
    };

    expect(() => assert(account, KeyringAccountStruct)).toThrow(
      'At path: metadata.keyring -- Expected an object, but received: undefined',
    );
  });

  it('should throw if metadata is not set', () => {
    const account = {
      id: '606a7759-b0fb-48e4-9874-bab62ff8e7eb',
      address: '0x000',
      options: {},
      methods: [],
      type: 'eip155:eoa',
    };

    expect(() => assert(account, KeyringAccountStruct)).toThrow(
      'At path: metadata -- Expected an object, but received: undefined',
    );
  });

  it('should throw if there are extra fields', () => {
    const account = {
      id: '606a7759-b0fb-48e4-9874-bab62ff8e7eb',
      address: '0x000',
      options: {},
      methods: [],
      type: 'eip155:eoa',
      metadata: {
        keyring: {
          type: 'Test Keyring',
        },
        name: 'Account 1',
        importTime: 1713153716,
        extra: 'field',
      },
    };

    expect(() => assert(account, KeyringAccountStruct)).toThrow(
      'At path: metadata.extra -- Expected a value of type `never`',
    );
  });

  it('should contain snap name, id and enabled if the snap metadata exists', () => {
    const account = {
      id: '606a7759-b0fb-48e4-9874-bab62ff8e7eb',
      address: '0x000',
      options: {},
      methods: [],
      type: 'eip155:eoa',
      metadata: {
        keyring: {
          type: 'Test Keyring',
        },
        name: 'Account 1',
        importTime: 1713153716,
        snap: {
          id: 'test-snap',
          enabled: true,
          name: 'Test Snap',
        },
      },
    };

    expect(() => assert(account, KeyringAccountStruct)).not.toThrow();
  });

  it.each([['name', 'enabled', 'id']])(
    'should throw if snap.%i is not set',
    (key: string) => {
      const account = {
        id: '606a7759-b0fb-48e4-9874-bab62ff8e7eb',
        address: '0x000',
        options: {},
        methods: [],
        type: 'eip155:eoa',
        metadata: {
          keyring: {
            type: 'Test Keyring',
          },
          name: 'Account 1',
          importTime: 1713153716,
          snap: {
            id: 'test-snap',
            enabled: true,
            name: 'Test Snap',
          },
        },
      };

      delete account.metadata.snap[key as keyof typeof account.metadata.snap];

      const regex = new RegExp(`At path: metadata.snap.${key}`, 'u');

      expect(() => assert(account, KeyringAccountStruct)).toThrow(regex);
    },
  );
});
