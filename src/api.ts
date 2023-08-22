import { type Json, JsonStruct } from '@metamask/utils';
import {
  type Infer,
  array,
  enums,
  literal,
  object,
  record,
  string,
  union,
} from 'superstruct';

import { JsonRpcRequestStruct } from './JsonRpcRequest';
import { UuidStruct } from './utils';

/**
 * Supported Ethereum methods.
 */
export enum EthMethod {
  PersonalSign = 'personal_sign',
  Sign = 'eth_sign',
  SignTransaction = 'eth_signTransaction',
  SignTypedData = 'eth_signTypedData',
  SignTypedDataV1 = 'eth_signTypedData_v1',
  SignTypedDataV3 = 'eth_signTypedData_v3',
  SignTypedDataV4 = 'eth_signTypedData_v4',
}

/**
 * Supported Ethereum account types.
 */
export enum EthAccountType {
  Eoa = 'eip155:eoa',
  Eip4337 = 'eip155:eip4337',
}

export const KeyringAccountStruct = object({
  /**
   * Account ID (UUIDv4).
   */
  id: UuidStruct,

  /**
   * Account address or next receive address (UTXO).
   */
  address: string(),

  /**
   * Keyring-dependent account options.
   */
  options: record(string(), JsonStruct),

  /**
   * Account supported methods.
   */
  methods: array(
    enums([
      `${EthMethod.PersonalSign}`,
      `${EthMethod.Sign}`,
      `${EthMethod.SignTransaction}`,
      `${EthMethod.SignTypedData}`,
      `${EthMethod.SignTypedDataV1}`,
      `${EthMethod.SignTypedDataV3}`,
      `${EthMethod.SignTypedDataV4}`,
    ]),
  ),

  /**
   * Account type.
   */
  type: enums([`${EthAccountType.Eoa}`, `${EthAccountType.Eip4337}`]),
});

/**
 * Account object.
 *
 * Represents an account with its properties and capabilities.
 */
export type KeyringAccount = Infer<typeof KeyringAccountStruct>;

export const KeyringRequestStruct = object({
  /**
   * Account ID (UUIDv4).
   */
  account: UuidStruct,

  /**
   * Request's scope (CAIP-2 chain ID).
   */
  scope: string(),

  /**
   * JSON-RPC request sent by the client application.
   *
   * Note: The request ID must be a string.
   */
  request: JsonRpcRequestStruct,
});

/**
 * Keyring request.
 *
 * Represents a request made to the keyring for account-related operations.
 */
export type KeyringRequest = Infer<typeof KeyringRequestStruct>;

export const ExportAccountResponseStruct = record(string(), JsonStruct);

export type ExportAccountResponse = Infer<typeof ExportAccountResponseStruct>;

export const SubmitRequestResponseStruct = union([
  object({
    pending: literal(true),
  }),
  object({
    pending: literal(false),
    result: JsonStruct,
  }),
]);

export type SubmitRequestResponse = Infer<typeof SubmitRequestResponseStruct>;

/**
 * Keyring interface.
 *
 * Represents the functionality and operations related to managing accounts and
 * handling requests.
 */
export type Keyring = {
  /**
   * List accounts.
   *
   * Retrieves an array of KeyringAccount objects representing the available
   * accounts.
   *
   * @returns A promise that resolves to an array of KeyringAccount objects.
   */
  listAccounts(): Promise<KeyringAccount[]>;

  /**
   * Get an account.
   *
   * Retrieves the KeyringAccount object for the given account ID.
   *
   * @param id - The ID of the account to retrieve.
   * @returns A promise that resolves to the KeyringAccount object if found, or
   * undefined otherwise.
   */
  getAccount(id: string): Promise<KeyringAccount | undefined>;

  /**
   * Create an account.
   *
   * Creates a new account with optional, keyring-defined, account options.
   *
   * @param options - Keyring-defined options for the account (optional).
   * @returns A promise that resolves to the newly created KeyringAccount
   * object without any private information.
   */
  createAccount(options?: Record<string, Json>): Promise<KeyringAccount>;

  /**
   * Filter supported chains for a given account.
   *
   * @param id - ID of the account to be checked.
   * @param chains - List of chains (CAIP-2) to be checked.
   * @returns A Promise that resolves to a filtered list of CAIP-2 IDs
   * representing the supported chains.
   */
  filterAccountChains(id: string, chains: string[]): Promise<string[]>;

  /**
   * Update an account.
   *
   * Updates the account with the given account object. Does nothing if the
   * account does not exist.
   *
   * @param account - The updated account object.
   * @returns A promise that resolves when the account is successfully updated.
   */
  updateAccount(account: KeyringAccount): Promise<void>;

  /**
   * Delete an account from the keyring.
   *
   * Deletes the account with the given ID from the keyring.
   *
   * @param id - The ID of the account to delete.
   * @returns A promise that resolves when the account is successfully deleted.
   */
  deleteAccount(id: string): Promise<void>;

  /**
   * Exports an account's private key.
   *
   * If the keyring cannot export a private key, this function should throw an
   * error.
   *
   * @param id - The ID of the account to export.
   * @returns A promise that resolves to the exported account.
   */
  exportAccount(id: string): Promise<ExportAccountResponse>;

  /**
   * List all submitted requests.
   *
   * Retrieves an array of KeyringRequest objects representing the submitted
   * requests.
   *
   * @returns A promise that resolves to an array of KeyringRequest objects.
   */
  listRequests(): Promise<KeyringRequest[]>;

  /**
   * Get a request.
   *
   * Retrieves the KeyringRequest object for the given request ID.
   *
   * @param id - The ID of the request to retrieve.
   * @returns A promise that resolves to the KeyringRequest object if found, or
   * undefined otherwise.
   */
  getRequest(id: string): Promise<KeyringRequest | undefined>;

  /**
   * Submit a request.
   *
   * Submits the given KeyringRequest object.
   *
   * @param request - The KeyringRequest object to submit.
   * @returns A promise that resolves to the request response.
   */
  submitRequest(request: KeyringRequest): Promise<SubmitRequestResponse>;

  /**
   * Approve a request.
   *
   * Approves the request with the given ID and sets the response if provided.
   *
   * @param id - The ID of the request to approve.
   * @param data - The response to the request (optional).
   * @returns A promise that resolves when the request is successfully
   * approved.
   */
  approveRequest?(id: string, data?: Record<string, Json>): Promise<void>;

  /**
   * Reject a request.
   *
   * Rejects the request with the given ID.
   *
   * @param id - The ID of the request to reject.
   * @returns A promise that resolves when the request is successfully
   * rejected.
   */
  rejectRequest?(id: string): Promise<void>;
};
