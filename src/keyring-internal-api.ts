import { Json } from '@metamask/utils';

import { KeyringAccount, KeyringRequest } from './keyring-api';

export enum KeyringMethod {
  ListAccounts = 'keyring_listAccounts',
  GetAccount = 'keyring_getAccount',
  CreateAccount = 'keyring_createAccount',
  FilterAccountChains = 'keyring_filterAccountChains',
  UpdateAccount = 'keyring_updateAccount',
  DeleteAccount = 'keyring_deleteAccount',
  ListRequests = 'keyring_listRequests',
  GetRequest = 'keyring_getRequest',
  SubmitRequest = 'keyring_submitRequest',
  ApproveRequest = 'keyring_approveRequest',
  RejectRequest = 'keyring_rejectRequest',
}

export type ListAccountsRequest = {
  method: KeyringMethod.ListAccounts;
};

export type GetAccountRequest = {
  method: KeyringMethod.GetAccount;
  params: { id: string };
};

export type CreateAccountRequest = {
  method: KeyringMethod.CreateAccount;
  params: {
    name: string;
    options: Record<string, Json> | null;
  };
};

export type FilterSupportedChainsRequest = {
  method: KeyringMethod.FilterAccountChains;
  params: { id: string; chains: string[] };
};

export type UpdateAccountRequest = {
  method: KeyringMethod.UpdateAccount;
  params: { account: KeyringAccount };
};

export type DeleteAccountRequest = {
  method: KeyringMethod.DeleteAccount;
  params: { id: string };
};

export type ListRequestsRequest = {
  method: KeyringMethod.ListRequests;
};

export type GetRequestRequest = {
  method: KeyringMethod.GetRequest;
  params: { id: string };
};

export type SubmitRequestRequest = {
  method: KeyringMethod.SubmitRequest;
  params: KeyringRequest;
};

export type ApproveRequestRequest = {
  method: KeyringMethod.ApproveRequest;
  params: { id: string };
};

export type RejectRequestRequest = {
  method: KeyringMethod.RejectRequest;
  params: { id: string };
};

export type InternalRequest =
  | ListAccountsRequest
  | GetAccountRequest
  | CreateAccountRequest
  | FilterSupportedChainsRequest
  | UpdateAccountRequest
  | DeleteAccountRequest
  | ListRequestsRequest
  | GetRequestRequest
  | SubmitRequestRequest
  | ApproveRequestRequest
  | RejectRequestRequest;
