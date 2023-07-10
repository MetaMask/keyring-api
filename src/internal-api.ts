import { JsonStruct } from '@metamask/utils';
import {
  array,
  Infer,
  literal,
  never,
  nullable,
  object,
  record,
  string,
  union,
} from 'superstruct';

import {
  KeyringAccountStruct,
  KeyringRequestStruct,
  SubmitRequestResponseStruct,
} from './api';
import { UuidStruct } from './utils';

const CommonHeader = {
  jsonrpc: literal('2.0'),
  id: UuidStruct,
};

// ----------------------------------------------------------------------------
// List accounts

export const ListAccountsRequestStruct = object({
  ...CommonHeader,
  method: literal('keyring_listAccounts'),
});

export type ListAccountsRequest = Infer<typeof ListAccountsRequestStruct>;

export const ListAccountsResponseStruct = array(KeyringAccountStruct);

export type ListAccountsResponse = Infer<typeof ListAccountsResponseStruct>;

// ----------------------------------------------------------------------------
// Get account

export const GetAccountRequestStruct = object({
  ...CommonHeader,
  method: literal('keyring_getAccount'),
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
  ...CommonHeader,
  method: literal('keyring_createAccount'),
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
  ...CommonHeader,
  method: literal('keyring_filterAccountChains'),
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
  ...CommonHeader,
  method: literal('keyring_updateAccount'),
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
  ...CommonHeader,
  method: literal('keyring_deleteAccount'),
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
  ...CommonHeader,
  method: literal('keyring_listRequests'),
});

export type ListRequestsRequest = Infer<typeof ListRequestsRequestStruct>;

export const ListRequestsResponseStruct = array(KeyringRequestStruct);

export type ListRequestsResponse = Infer<typeof ListRequestsResponseStruct>;

// ----------------------------------------------------------------------------
// Get request

export const GetRequestRequestStruct = object({
  ...CommonHeader,
  method: literal('keyring_getRequest'),
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
  ...CommonHeader,
  method: literal('keyring_submitRequest'),
  params: KeyringRequestStruct,
});

export type SubmitRequestRequest = Infer<typeof SubmitRequestRequestStruct>;

// The response type is already defined in the `keyring-api.ts` file since it
// is used by the `Keyring` interface.

// ----------------------------------------------------------------------------
// Approve request

export const ApproveRequestRequestStruct = object({
  ...CommonHeader,
  method: literal('keyring_approveRequest'),
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
  ...CommonHeader,
  method: literal('keyring_rejectRequest'),
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
