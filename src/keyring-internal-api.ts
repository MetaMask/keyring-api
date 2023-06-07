import { Json } from '@metamask/utils';

import { KeyringAccount, KeyringRequest } from './keyring-api';

export type ListAccountsRequest = {
  method: 'keyring_listAccounts';
};

export type GetAccountRequest = {
  method: 'keyring_getAccount';
  params: { id: string };
};

export type CreateAccountRequest = {
  method: 'keyring_createAccount';
  params: {
    name: string;
    options: Record<string, Json> | null;
  };
};

export type FilterSupportedChains = {
  method: 'keyring_filterSupportedChains';
  params: { id: string; chains: string[] };
};

export type UpdateAccountRequest = {
  method: 'keyring_updateAccount';
  params: { account: KeyringAccount };
};

export type DeleteAccountRequest = {
  method: 'keyring_deleteAccount';
  params: { id: string };
};

export type ExportAccountRequest = {
  method: 'keyring_exportAccount';
  params: { id: string };
};

export type ListRequestsRequest = {
  method: 'keyring_listRequests';
};

export type GetRequestRequest = {
  method: 'keyring_getRequest';
  params: { id: string };
};

export type SubmitRequestRequest = {
  method: 'keyring_submitRequest';
  params: KeyringRequest;
};

export type ApproveRequestRequest = {
  method: 'keyring_approveRequest';
  params: { id: string };
};

export type RejectRequestRequest = {
  method: 'keyring_rejectRequest';
  params: { id: string };
};

export type KeyringInternalRequest =
  | ListAccountsRequest
  | GetAccountRequest
  | CreateAccountRequest
  | FilterSupportedChains
  | UpdateAccountRequest
  | DeleteAccountRequest
  | ExportAccountRequest
  | ListRequestsRequest
  | GetRequestRequest
  | SubmitRequestRequest
  | ApproveRequestRequest
  | RejectRequestRequest;
