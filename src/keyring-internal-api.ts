import { JsonStruct } from '@metamask/utils';
import {
  object,
  nullable,
  string,
  Infer,
  literal,
  array,
  union,
  record,
  never,
} from 'superstruct';

import {
  KeyringAccountStruct,
  KeyringRequestStruct,
  SubmitRequestResponseStruct,
} from './keyring-api';
import { UuidStruct } from './utils';

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

// ----------------------------------------------------------------------------
// List accounts

export const ListAccountsRequestStruct = object({
  id: UuidStruct,
  jsonrpc: literal('2.0'),
  method: literal(KeyringMethod.ListAccounts),
});

export type ListAccountsRequest = Infer<typeof ListAccountsRequestStruct>;

export const ListAccountsResponseStruct = array(KeyringAccountStruct);

export type ListAccountsResponse = Infer<typeof ListAccountsResponseStruct>;

// ----------------------------------------------------------------------------
// Get account

export const GetAccountRequestStruct = object({
  id: UuidStruct,
  jsonrpc: literal('2.0'),
  method: literal(KeyringMethod.GetAccount),
  params: object({
    id: string(),
  }),
});

export type GetAccountRequest = Infer<typeof GetAccountRequestStruct>;

export const GetAccountResponseStruct = KeyringAccountStruct;

export type GetAccountResponse = Infer<typeof GetAccountResponseStruct>;

// ----------------------------------------------------------------------------
// Create account

export const CreateAccountRequestStruct = object({
  id: UuidStruct,
  jsonrpc: literal('2.0'),
  method: literal(KeyringMethod.CreateAccount),
  params: object({
    name: string(),
    options: nullable(record(string(), JsonStruct)),
  }),
});

export type CreateAccountRequest = Infer<typeof CreateAccountRequestStruct>;

export const CreateAccountResponseStruct = KeyringAccountStruct;

export type CreateAccountResponse = Infer<typeof CreateAccountResponseStruct>;

// ----------------------------------------------------------------------------
// Filter account chains

export const FilterAccountChainsStruct = object({
  id: UuidStruct,
  jsonrpc: literal('2.0'),
  method: literal(KeyringMethod.FilterAccountChains),
  params: object({
    id: string(),
    chains: array(string()),
  }),
});

export type FilterAccountChainsRequest = Infer<
  typeof FilterAccountChainsStruct
>;

export const FilterAccountChainsResponseStruct = array(string());

export type FilterAccountChainsResponse = Infer<
  typeof FilterAccountChainsResponseStruct
>;

// ----------------------------------------------------------------------------
// Update account

export const UpdateAccountRequestStruct = object({
  id: UuidStruct,
  jsonrpc: literal('2.0'),
  method: literal(KeyringMethod.UpdateAccount),
  params: object({
    account: KeyringAccountStruct,
  }),
});

export type UpdateAccountRequest = Infer<typeof UpdateAccountRequestStruct>;

export const UpdateAccountResponseStruct = nullable(never());

export type UpdateAccountResponse = Infer<typeof UpdateAccountResponseStruct>;

// ----------------------------------------------------------------------------
// Delete account

export const DeleteAccountRequestStruct = object({
  id: UuidStruct,
  jsonrpc: literal('2.0'),
  method: literal(KeyringMethod.DeleteAccount),
  params: object({
    id: string(),
  }),
});

export type DeleteAccountRequest = Infer<typeof DeleteAccountRequestStruct>;

export const DeleteAccountResponseStruct = nullable(never());

export type DeleteAccountResponse = Infer<typeof DeleteAccountResponseStruct>;

// ----------------------------------------------------------------------------
// List requests

export const ListRequestsRequestStruct = object({
  id: UuidStruct,
  jsonrpc: literal('2.0'),
  method: literal(KeyringMethod.ListRequests),
});

export type ListRequestsRequest = Infer<typeof ListRequestsRequestStruct>;

export const ListRequestsResponseStruct = array(KeyringRequestStruct);

export type ListRequestsResponse = Infer<typeof ListRequestsResponseStruct>;

// ----------------------------------------------------------------------------
// Get request

export const GetRequestRequestStruct = object({
  id: UuidStruct,
  jsonrpc: literal('2.0'),
  method: literal(KeyringMethod.GetRequest),
  params: object({
    id: string(),
  }),
});

export type GetRequestRequest = Infer<typeof GetRequestRequestStruct>;

export const GetRequestResponseStruct = KeyringRequestStruct;

export type GetRequestResponse = Infer<typeof GetRequestResponseStruct>;

// ----------------------------------------------------------------------------
// Submit request

export const SubmitRequestRequestStruct = object({
  id: UuidStruct,
  jsonrpc: literal('2.0'),
  method: literal(KeyringMethod.SubmitRequest),
  params: KeyringRequestStruct,
});

export type SubmitRequestRequest = Infer<typeof SubmitRequestRequestStruct>;

// The response type is already defined in the `keyring-api.ts` file since it
// is used by the `Keyring` interface.

// ----------------------------------------------------------------------------
// Approve request

export const ApproveRequestRequestStruct = object({
  id: UuidStruct,
  jsonrpc: literal('2.0'),
  method: literal(KeyringMethod.ApproveRequest),
  params: object({
    id: string(),
  }),
});

export type ApproveRequestRequest = Infer<typeof ApproveRequestRequestStruct>;

export const ApproveRequestResponseStruct = nullable(never());

export type ApproveRequestResponse = Infer<typeof ApproveRequestResponseStruct>;

// ----------------------------------------------------------------------------
// Reject request

export const RejectRequestRequestStruct = object({
  id: UuidStruct,
  jsonrpc: literal('2.0'),
  method: literal(KeyringMethod.RejectRequest),
  params: object({
    id: string(),
  }),
});

export type RejectRequestRequest = Infer<typeof RejectRequestRequestStruct>;

export const RejectRequestResponseStruct = nullable(never());

export type RejectRequestResponse = Infer<typeof RejectRequestResponseStruct>;

// ----------------------------------------------------------------------------
// Internal request

export const InternalRequestStruct = union([
  ListAccountsRequestStruct,
  GetAccountRequestStruct,
  CreateAccountRequestStruct,
  FilterAccountChainsStruct,
  UpdateAccountRequestStruct,
  DeleteAccountRequestStruct,
  ListRequestsRequestStruct,
  GetRequestRequestStruct,
  SubmitRequestRequestStruct,
  ApproveRequestRequestStruct,
  RejectRequestRequestStruct,
]);

export type InternalRequest = Infer<typeof InternalRequestStruct>;

// ----------------------------------------------------------------------------
// Internal response

export const InternalResponseStruct = union([
  ListAccountsResponseStruct,
  GetAccountResponseStruct,
  CreateAccountResponseStruct,
  FilterAccountChainsResponseStruct,
  UpdateAccountResponseStruct,
  DeleteAccountResponseStruct,
  ListRequestsResponseStruct,
  GetRequestResponseStruct,
  SubmitRequestResponseStruct,
  ApproveRequestResponseStruct,
  RejectRequestResponseStruct,
]);

export type InternalResponse = Infer<typeof InternalResponseStruct>;
