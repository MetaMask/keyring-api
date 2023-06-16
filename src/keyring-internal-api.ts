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

export const ListAccountsRequestStruct = object({
  id: Uuid,
  jsonrpc: literal('2.0'),
  method: literal(KeyringMethod.ListAccounts),
});

export type ListAccountsRequest = Infer<typeof ListAccountsRequestStruct>;

export const GetAccountRequestStruct = object({
  id: Uuid,
  jsonrpc: literal('2.0'),
  method: literal(KeyringMethod.GetAccount),
  params: object({
    id: string(),
  }),
});

export type GetAccountRequest = Infer<typeof GetAccountRequestStruct>;

export const CreateAccountRequestStruct = object({
  id: Uuid,
  jsonrpc: literal('2.0'),
  method: literal(KeyringMethod.CreateAccount),
  params: object({
    name: string(),
    options: nullable(record(string(), JsonStruct)),
  }),
});

export type CreateAccountRequest = Infer<typeof CreateAccountRequestStruct>;

export const FilterAccountChainsStruct = object({
  id: Uuid,
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

export const UpdateAccountRequestStruct = object({
  id: Uuid,
  jsonrpc: literal('2.0'),
  method: literal(KeyringMethod.UpdateAccount),
  params: object({
    account: KeyringAccountStruct,
  }),
});

export type UpdateAccountRequest = Infer<typeof UpdateAccountRequestStruct>;

export const DeleteAccountRequestStruct = object({
  id: Uuid,
  jsonrpc: literal('2.0'),
  method: literal(KeyringMethod.DeleteAccount),
  params: object({
    id: string(),
  }),
});

export type DeleteAccountRequest = Infer<typeof DeleteAccountRequestStruct>;

export const ListRequestsRequestStruct = object({
  id: Uuid,
  jsonrpc: literal('2.0'),
  method: literal(KeyringMethod.ListRequests),
});

export type ListRequestsRequest = Infer<typeof ListRequestsRequestStruct>;

export const GetRequestRequestStruct = object({
  id: Uuid,
  jsonrpc: literal('2.0'),
  method: literal(KeyringMethod.GetRequest),
  params: object({
    id: string(),
  }),
});

export type GetRequestRequest = Infer<typeof GetRequestRequestStruct>;

export const SubmitRequestRequestStruct = object({
  id: Uuid,
  jsonrpc: literal('2.0'),
  method: literal(KeyringMethod.SubmitRequest),
  params: KeyringRequestStruct,
});

export type SubmitRequestRequest = Infer<typeof SubmitRequestRequestStruct>;

export const ApproveRequestRequestStruct = object({
  id: Uuid,
  jsonrpc: literal('2.0'),
  method: literal(KeyringMethod.ApproveRequest),
  params: object({
    id: string(),
  }),
});

export type ApproveRequestRequest = Infer<typeof ApproveRequestRequestStruct>;

export const RejectRequestRequestStruct = object({
  id: Uuid,
  jsonrpc: literal('2.0'),
  method: literal(KeyringMethod.RejectRequest),
  params: object({
    id: string(),
  }),
});

export type RejectRequestRequest = Infer<typeof RejectRequestRequestStruct>;

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
