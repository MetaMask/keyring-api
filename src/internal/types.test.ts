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
      },
    };

    expect(() => assert(account, InternalAccountStruct)).not.toThrow();
  });

  it('should throw if snap ID is missing', () => {
    const account = {
      id: '606a7759-b0fb-48e4-9874-bab62ff8e7eb',
      address: '0x000',
      options: {},
      methods: [],
      type: 'eip155:eoa',
      metadata: {
        snap: {},
        keyring: {
          type: 'Test Keyring',
        },
      },
    };

    expect(() => assert(account, InternalAccountStruct)).toThrow(
      'At path: metadata.snap.id -- Expected a string, but received: undefined',
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
        extra: 'field',
      },
    };

    expect(() => assert(account, InternalAccountStruct)).toThrow(
      'At path: metadata.extra -- Expected a value of type `never`',
    );
  });
});
