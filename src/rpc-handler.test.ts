import type { JsonRpcRequest } from './JsonRpcRequest';
import {
  MethodNotSupportedError,
  buildHandlersChain,
  handleKeyringRequest,
} from './rpc-handler';

describe('buildHandlersChain', () => {
  const handler1 = jest.fn();
  const handler2 = jest.fn();
  const handler3 = jest.fn();

  const request: JsonRpcRequest = {
    jsonrpc: '2.0',
    id: 'test-id',
    method: 'test_method',
    params: {},
  };

  const origin = 'metamask';

  it('should call the first handler and return its result', async () => {
    handler1.mockResolvedValue('Handler 1 result');

    const result = await buildHandlersChain(
      handler1,
      handler2,
      handler3,
    )({
      origin,
      request,
    });

    expect(handler1).toHaveBeenCalledWith({ origin, request });
    expect(handler2).not.toHaveBeenCalled();
    expect(handler3).not.toHaveBeenCalled();
    expect(result).toBe('Handler 1 result');
  });

  it('should call the second handler if the first handler throws MethodNotSupportedError', async () => {
    handler1.mockRejectedValue(new MethodNotSupportedError('test_method'));
    handler2.mockResolvedValue('Handler 2 result');

    const result = await buildHandlersChain(
      handler1,
      handler2,
      handler3,
    )({
      origin,
      request,
    });

    expect(handler1).toHaveBeenCalledWith({ origin, request });
    expect(handler2).toHaveBeenCalledWith({ origin, request });
    expect(handler3).not.toHaveBeenCalled();
    expect(result).toBe('Handler 2 result');
  });

  it('should call the third handler if the first two handlers throw MethodNotSupportedError', async () => {
    handler1.mockRejectedValue(new MethodNotSupportedError('test_method'));
    handler2.mockRejectedValue(new MethodNotSupportedError('test_method'));
    handler3.mockResolvedValue('Handler 3 result');

    const result = await buildHandlersChain(
      handler1,
      handler2,
      handler3,
    )({
      origin,
      request,
    });

    expect(handler1).toHaveBeenCalledWith({ origin, request });
    expect(handler2).toHaveBeenCalledWith({ origin, request });
    expect(handler3).toHaveBeenCalledWith({ origin, request });
    expect(result).toBe('Handler 3 result');
  });

  it('should throw MethodNotSupportedError if all handlers throw MethodNotSupportedError', async () => {
    handler1.mockRejectedValue(new MethodNotSupportedError('test_method'));
    handler2.mockRejectedValue(new MethodNotSupportedError('test_method'));
    handler3.mockRejectedValue(new MethodNotSupportedError('test_method'));

    await expect(
      buildHandlersChain(handler1, handler2, handler3)({ origin, request }),
    ).rejects.toThrow(MethodNotSupportedError);
    expect(handler1).toHaveBeenCalledWith({ origin, request });
    expect(handler2).toHaveBeenCalledWith({ origin, request });
    expect(handler3).toHaveBeenCalledWith({ origin, request });
  });

  it('should throw an error if a non-MethodNotSupportedError is thrown by any handler', async () => {
    const error = new Error('Something went wrong');
    handler1.mockRejectedValue(error);

    await expect(
      buildHandlersChain(handler1, handler2, handler3)({ origin, request }),
    ).rejects.toThrow(error);
    expect(handler1).toHaveBeenCalledWith({ origin, request });
    expect(handler2).not.toHaveBeenCalled();
    expect(handler3).not.toHaveBeenCalled();
  });
});

describe('keyringRpcDispatcher', () => {
  const keyring = {
    listAccounts: jest.fn(),
    getAccount: jest.fn(),
    createAccount: jest.fn(),
    filterAccountChains: jest.fn(),
    updateAccount: jest.fn(),
    deleteAccount: jest.fn(),
    listRequests: jest.fn(),
    getRequest: jest.fn(),
    submitRequest: jest.fn(),
    approveRequest: jest.fn(),
    rejectRequest: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call keyring_listAccounts', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      method: 'keyring_listAccounts',
    };

    keyring.listAccounts.mockResolvedValue('ListAccounts result');
    const result = await handleKeyringRequest(keyring, request);

    expect(keyring.listAccounts).toHaveBeenCalled();
    expect(result).toBe('ListAccounts result');
  });

  it('should fail to call keyringRpcDispatcher with a non-JSON-RPC request', async () => {
    const request = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      // Missing method name.
    };

    await expect(
      handleKeyringRequest(keyring, request as unknown as JsonRpcRequest),
    ).rejects.toThrow('Expected the value to satisfy a union of');
  });

  it('should call keyring_getAccount', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      method: 'keyring_getAccount',
      params: { id: '4f983fa2-4f53-4c63-a7c2-f9a5ed750041' },
    };

    keyring.getAccount.mockResolvedValue('GetAccount result');
    const result = await handleKeyringRequest(keyring, request);

    expect(keyring.getAccount).toHaveBeenCalledWith(
      '4f983fa2-4f53-4c63-a7c2-f9a5ed750041',
    );
    expect(result).toBe('GetAccount result');
  });

  it('should fail to call keyring_getAccount without the account ID', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      method: 'keyring_getAccount',
      params: {}, // Missing account ID.
    };

    await expect(handleKeyringRequest(keyring, request)).rejects.toThrow(
      'At path: params.id -- Expected a string, but received: undefined',
    );
  });

  it('should fail to call keyring_getAccount without params', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      method: 'keyring_getAccount',
    };

    await expect(handleKeyringRequest(keyring, request)).rejects.toThrow(
      'At path: params -- Expected an object, but received: undefined',
    );
  });

  it('should call keyring_createAccount', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      method: 'keyring_createAccount',
      params: { options: {} },
    };

    keyring.createAccount.mockResolvedValue('CreateAccount result');
    const result = await handleKeyringRequest(keyring, request);

    expect(keyring.createAccount).toHaveBeenCalledWith({});
    expect(result).toBe('CreateAccount result');
  });

  it('should call keyring_filterAccountChains', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      method: 'keyring_filterAccountChains',
      params: {
        id: '4f983fa2-4f53-4c63-a7c2-f9a5ed750041',
        chains: ['chain1', 'chain2'],
      },
    };

    keyring.filterAccountChains.mockResolvedValue(
      'FilterSupportedChains result',
    );
    const result = await handleKeyringRequest(keyring, request);

    expect(keyring.filterAccountChains).toHaveBeenCalledWith(
      '4f983fa2-4f53-4c63-a7c2-f9a5ed750041',
      ['chain1', 'chain2'],
    );
    expect(result).toBe('FilterSupportedChains result');
  });

  it('should call keyring_updateAccount', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      method: 'keyring_updateAccount',
      params: {
        account: {
          id: '4f983fa2-4f53-4c63-a7c2-f9a5ed750041',
          address: '0x0',
          options: {},
          methods: [],
          type: 'eip155:eoa',
        },
      },
    };

    keyring.updateAccount.mockResolvedValue('UpdateAccount result');
    const result = await handleKeyringRequest(keyring, request);

    expect(keyring.updateAccount).toHaveBeenCalledWith({
      id: '4f983fa2-4f53-4c63-a7c2-f9a5ed750041',
      address: '0x0',
      options: {},
      methods: [],
      type: 'eip155:eoa',
    });
    expect(result).toBe('UpdateAccount result');
  });

  it('should call keyring_deleteAccount', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      method: 'keyring_deleteAccount',
      params: { id: '4f983fa2-4f53-4c63-a7c2-f9a5ed750041' },
    };

    keyring.deleteAccount.mockResolvedValue('DeleteAccount result');
    const result = await handleKeyringRequest(keyring, request);

    expect(keyring.deleteAccount).toHaveBeenCalledWith(
      '4f983fa2-4f53-4c63-a7c2-f9a5ed750041',
    );
    expect(result).toBe('DeleteAccount result');
  });

  it('should call keyring_listRequests', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      method: 'keyring_listRequests',
    };

    keyring.listRequests.mockResolvedValue('ListRequests result');
    const result = await handleKeyringRequest(keyring, request);

    expect(keyring.listRequests).toHaveBeenCalled();
    expect(result).toBe('ListRequests result');
  });

  it('should call keyring_getRequest', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      method: 'keyring_getRequest',
      params: { id: 'request_id' },
    };

    keyring.getRequest.mockResolvedValue('GetRequest result');
    const result = await handleKeyringRequest(keyring, request);

    expect(keyring.getRequest).toHaveBeenCalledWith('request_id');
    expect(result).toBe('GetRequest result');
  });

  it('should call keyring_submitRequest', async () => {
    const dappRequest = {
      account: '4abdd17e-8b0f-4d06-a017-947a64823b3d',
      scope: '',
      request: {
        jsonrpc: '2.0',
        id: 'c555de37-cf4b-4ff2-8273-39db7fb58f1c',
        method: 'eth_method',
        params: [1, 2, 3],
      },
    };

    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      method: 'keyring_submitRequest',
      params: dappRequest,
    };

    keyring.submitRequest.mockResolvedValue('SubmitRequest result');
    const result = await handleKeyringRequest(keyring, request);

    expect(keyring.submitRequest).toHaveBeenCalledWith(dappRequest);
    expect(result).toBe('SubmitRequest result');
  });

  it('should call keyring_approveRequest', async () => {
    const payload = { id: 'request_id', data: { signature: '0x0123' } };
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      method: 'keyring_approveRequest',
      params: payload,
    };

    keyring.approveRequest.mockResolvedValue('ApproveRequest result');
    const result = await handleKeyringRequest(keyring, request);

    expect(keyring.approveRequest).toHaveBeenCalledWith(
      payload.id,
      payload.data,
    );
    expect(result).toBe('ApproveRequest result');
  });

  it('should fail to list requests with a non-UUIDv4 request ID', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: 'invalid-id-string',
      method: 'keyring_listRequests',
    };

    await expect(handleKeyringRequest(keyring, request)).rejects.toThrow(
      'At path: id -- Expected a string matching',
    );
  });

  it('should call keyring_rejectRequest', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      method: 'keyring_rejectRequest',
      params: { id: 'request_id' },
    };

    keyring.rejectRequest.mockResolvedValue('RejectRequest result');
    const result = await handleKeyringRequest(keyring, request);

    expect(keyring.rejectRequest).toHaveBeenCalledWith('request_id');
    expect(result).toBe('RejectRequest result');
  });

  it('should throw MethodNotSupportedError for an unknown method', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      method: 'unknown_method',
    };

    await expect(handleKeyringRequest(keyring, request)).rejects.toThrow(
      MethodNotSupportedError,
    );
  });
});
