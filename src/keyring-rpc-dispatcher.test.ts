import { Json, JsonRpcRequest } from '@metamask/utils';

import { KeyringMethod } from './keyring-internal-api';
import {
  MethodNotSupportedError,
  buildHandlersChain,
  keyringRpcDispatcher,
} from './keyring-rpc-dispatcher';

describe('buildHandlersChain', () => {
  const handler1 = jest.fn();
  const handler2 = jest.fn();
  const handler3 = jest.fn();

  const request: JsonRpcRequest<Json[] | Record<string, Json>> = {
    jsonrpc: '2.0',
    id: 'test-id',
    method: 'test_method',
    params: {},
  };

  const origin = 'metamask';

  it('should call the first handler and return its result', async () => {
    handler1.mockResolvedValue('Handler 1 result');

    const result = await buildHandlersChain([handler1, handler2, handler3])({
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

    const result = await buildHandlersChain([handler1, handler2, handler3])({
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

    const result = await buildHandlersChain([handler1, handler2, handler3])({
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
      buildHandlersChain([handler1, handler2, handler3])({ origin, request }),
    ).rejects.toThrow(MethodNotSupportedError);
    expect(handler1).toHaveBeenCalledWith({ origin, request });
    expect(handler2).toHaveBeenCalledWith({ origin, request });
    expect(handler3).toHaveBeenCalledWith({ origin, request });
  });

  it('should throw an error if a non-MethodNotSupportedError is thrown by any handler', async () => {
    const error = new Error('Something went wrong');
    handler1.mockRejectedValue(error);

    await expect(
      buildHandlersChain([handler1, handler2, handler3])({ origin, request }),
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
      method: KeyringMethod.ListAccounts,
    };

    keyring.listAccounts.mockResolvedValue('ListAccounts result');
    const result = await keyringRpcDispatcher(keyring, request);

    expect(keyring.listAccounts).toHaveBeenCalled();
    expect(result).toBe('ListAccounts result');
  });

  it('should call keyring_getAccount', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      method: KeyringMethod.GetAccount,
      params: { id: 'account_id' },
    };

    keyring.getAccount.mockResolvedValue('GetAccount result');
    const result = await keyringRpcDispatcher(keyring, request);

    expect(keyring.getAccount).toHaveBeenCalledWith('account_id');
    expect(result).toBe('GetAccount result');
  });

  it('should call keyring_createAccount', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      method: KeyringMethod.CreateAccount,
      params: { name: 'account_name', options: {} },
    };

    keyring.createAccount.mockResolvedValue('CreateAccount result');
    const result = await keyringRpcDispatcher(keyring, request);

    expect(keyring.createAccount).toHaveBeenCalledWith('account_name', {});
    expect(result).toBe('CreateAccount result');
  });

  it('should call keyring_filterAccountChains', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      method: KeyringMethod.FilterAccountChains,
      params: { id: 'account_id', chains: ['chain1', 'chain2'] },
    };

    keyring.filterAccountChains.mockResolvedValue(
      'FilterSupportedChains result',
    );
    const result = await keyringRpcDispatcher(keyring, request);

    expect(keyring.filterAccountChains).toHaveBeenCalledWith('account_id', [
      'chain1',
      'chain2',
    ]);
    expect(result).toBe('FilterSupportedChains result');
  });

  it('should call keyring_updateAccount', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      method: KeyringMethod.UpdateAccount,
      params: { account: { id: 'account_id' } },
    };

    keyring.updateAccount.mockResolvedValue('UpdateAccount result');
    const result = await keyringRpcDispatcher(keyring, request);

    expect(keyring.updateAccount).toHaveBeenCalledWith({ id: 'account_id' });
    expect(result).toBe('UpdateAccount result');
  });

  it('should call keyring_deleteAccount', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      method: KeyringMethod.DeleteAccount,
      params: { id: 'account_id' },
    };

    keyring.deleteAccount.mockResolvedValue('DeleteAccount result');
    const result = await keyringRpcDispatcher(keyring, request);

    expect(keyring.deleteAccount).toHaveBeenCalledWith('account_id');
    expect(result).toBe('DeleteAccount result');
  });

  it('should call keyring_listRequests', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      method: KeyringMethod.ListRequests,
    };

    keyring.listRequests.mockResolvedValue('ListRequests result');
    const result = await keyringRpcDispatcher(keyring, request);

    expect(keyring.listRequests).toHaveBeenCalled();
    expect(result).toBe('ListRequests result');
  });

  it('should call keyring_getRequest', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      method: KeyringMethod.GetRequest,
      params: { id: 'request_id' },
    };

    keyring.getRequest.mockResolvedValue('GetRequest result');
    const result = await keyringRpcDispatcher(keyring, request);

    expect(keyring.getRequest).toHaveBeenCalledWith('request_id');
    expect(result).toBe('GetRequest result');
  });

  it('should call keyring_submitRequest', async () => {
    const dappRequest = { method: 'eth_method', params: [1, 2, 3] };
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      method: KeyringMethod.SubmitRequest,
      params: dappRequest,
    };

    keyring.submitRequest.mockResolvedValue('SubmitRequest result');
    const result = await keyringRpcDispatcher(keyring, request);

    expect(keyring.submitRequest).toHaveBeenCalledWith(dappRequest);
    expect(result).toBe('SubmitRequest result');
  });

  it('should call keyring_approveRequest', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      method: KeyringMethod.ApproveRequest,
      params: { id: 'request_id' },
    };

    keyring.approveRequest.mockResolvedValue('ApproveRequest result');
    const result = await keyringRpcDispatcher(keyring, request);

    expect(keyring.approveRequest).toHaveBeenCalledWith('request_id');
    expect(result).toBe('ApproveRequest result');
  });

  it('should call keyring_rejectRequest', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      method: KeyringMethod.RejectRequest,
      params: { id: 'request_id' },
    };

    keyring.rejectRequest.mockResolvedValue('RejectRequest result');
    const result = await keyringRpcDispatcher(keyring, request);

    expect(keyring.rejectRequest).toHaveBeenCalledWith('request_id');
    expect(result).toBe('RejectRequest result');
  });

  it('should throw MethodNotSupportedError for an unknown method', async () => {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: '7c507ff0-365f-4de0-8cd5-eb83c30ebda4',
      method: 'unknown_method',
    };

    await expect(keyringRpcDispatcher(keyring, request)).rejects.toThrow(
      MethodNotSupportedError,
    );
  });
});
