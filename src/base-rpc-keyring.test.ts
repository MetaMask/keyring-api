import { JsonRpcRequest } from '@metamask/utils';

import { BaseRpcKeyring } from './base-rpc-keyring';
import { GetAccountRequest } from './keyring-internal-api';

describe('BaseRpcKeyring', () => {
  class MockRpcKeyring extends BaseRpcKeyring {
    listAccounts = jest.fn();

    getAccount = jest.fn();

    createAccount = jest.fn();

    filterAccountChains = jest.fn();

    updateAccount = jest.fn();

    deleteAccount = jest.fn();

    listRequests = jest.fn();

    getRequest = jest.fn();

    submitRequest = jest.fn();

    approveRequest = jest.fn();

    rejectRequest = jest.fn();
  }

  const mockKeyring = new MockRpcKeyring();

  describe('dispatch', () => {
    it('should dispatch the request', async () => {
      const request: JsonRpcRequest = {
        jsonrpc: '2.0',
        id: 'edbaab5d-c5b0-454e-8ef1-36334230f746',
        method: 'keyring_getAccount',
        params: { id: '29b781ba-ef79-49de-ab64-d0154231860e' },
      };
      await mockKeyring.dispatch(request);
      expect(mockKeyring.getAccount).toHaveBeenCalledWith(
        (request as GetAccountRequest).params.id,
      );
    });

    it('should throw a MethodNotFound error if the method does not exist', async () => {
      const request: JsonRpcRequest = {
        jsonrpc: '2.0',
        id: '1800984b-4a02-498a-b050-34db3543b85b',
        method: 'invalid_method',
      };
      await expect(mockKeyring.dispatch(request)).rejects.toThrow(
        'Method not supported: invalid_method',
      );
    });
  });
});
