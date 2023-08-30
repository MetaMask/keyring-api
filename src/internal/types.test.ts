import { assert } from 'superstruct';

import { InternalAccountStruct } from '.';

describe('InternalAccount', () => {
  it('should have the correct structure', () => {
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
      },
    };

    expect(() => assert(account, InternalAccountStruct)).not.toThrow();
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
      },
    };

    expect(() => assert(account, InternalAccountStruct)).toThrow(
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
      },
    };

    expect(() => assert(account, InternalAccountStruct)).toThrow(
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

    expect(() => assert(account, InternalAccountStruct)).toThrow(
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
        extra: 'field',
      },
    };

    expect(() => assert(account, InternalAccountStruct)).toThrow(
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
        snap: {
          id: 'test-snap',
          enabled: true,
          name: 'Test Snap',
        },
      },
    };

    expect(() => assert(account, InternalAccountStruct)).not.toThrow();
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
          snap: {
            id: 'test-snap',
            enabled: true,
            name: 'Test Snap',
          },
        },
      };

      delete account.metadata.snap[key as keyof typeof account.metadata.snap];

      const regex = new RegExp(`At path: metadata.snap.${key}`, 'u');

      expect(() => assert(account, InternalAccountStruct)).toThrow(regex);
    },
  );
});
