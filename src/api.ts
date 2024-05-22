import type { Json } from '@metamask/utils';
import { JsonStruct } from '@metamask/utils';
import type { Infer } from 'superstruct';
import { enums, array, literal, record, string, union } from 'superstruct';

import { exactOptional, object } from './superstruct';
import { UuidStruct } from './utils';

// ! The `*AccountType` enums defined below should be kept in this file to
// ! avoid circular dependencies when the API is used by other files.

/**
 * Supported Ethereum account types.
 */
export enum EthAccountType {
  Eoa = 'eip155:eoa',
  Erc4337 = 'eip155:erc4337',
}

/**
 * Supported Bitcoin account types.
 */
export enum BtcAccountType {
  P2wpkh = 'bip122:p2wpkh',
}

/**
 * A struct which represents a Keyring account object. It is abstract enough to
 * be used with any blockchain. Specific blockchain account types should extend
 * this struct.
 *
 * See {@link KeyringAccount}.
 */
export const KeyringAccountStruct = object({
  /**
   * Account ID (UUIDv4).
   */
  id: UuidStruct,

  /**
   * Account type.
   */
  type: enums([
    `${EthAccountType.Eoa}`,
    `${EthAccountType.Erc4337}`,
    `${BtcAccountType.P2wpkh}`,
  ]),

  /**
   * Account main address.
   */
  address: string(),

  /**
   * Account options.
   */
  options: record(string(), JsonStruct),

  /**
   * Account supported methods.
   */
  methods: array(string()),
});

/**
 * Generic account type.
 *
 * Represents an account with its properties and capabilities.
 */
export type KeyringAccount = Infer<typeof KeyringAccountStruct>;

export const KeyringRequestStruct = object({
  /**
   * Keyring request ID (UUIDv4).
   */
  id: UuidStruct,

  /**
   * Request's scope (CAIP-2 chain ID).
   */
  scope: string(),

  /**
   * Account ID (UUIDv4).
   */
  account: UuidStruct,

  /**
   * Inner request sent by the client application.
   */
  request: object({
    method: string(),
    params: exactOptional(
      union([array(JsonStruct), record(string(), JsonStruct)]),
    ),
  }),
});

/**
 * Keyring request.
 *
 * Represents a request made to the keyring for account-related operations.
 */
export type KeyringRequest = Infer<typeof KeyringRequestStruct>;

export const KeyringAccountDataStruct = record(string(), JsonStruct);

/**
 * Response to a call to `exportAccount`.
 *
 * The exact response depends on the keyring implementation.
 */
export type KeyringAccountData = Infer<typeof KeyringAccountDataStruct>;

export const KeyringResponseStruct = union([
  object({
    /**
     * Pending flag.
     *
     * Setting the pending flag to true indicates that the request will be
     * handled asynchronously. The keyring must be called with `approveRequest`
     * or `rejectRequest` to resolve the request.
     */
    pending: literal(true),

    /**
     * Redirect URL.
     *
     * If present in the response, MetaMask will display a confirmation dialog
     * with a link to the redirect URL. The user can choose to follow the link
     * or cancel the request.
     */
    redirect: exactOptional(
      object({
        message: exactOptional(string()),
        url: exactOptional(string()),
      }),
    ),
  }),
  object({
    /**
     * Pending flag.
     *
     * Setting the pending flag to false indicates that the request will be
     * handled synchronously. The keyring must return the result of the
     * request execution.
     */
    pending: literal(false),

    /**
     * Request result.
     */
    result: JsonStruct,
  }),
]);

/**
 * Response to a call to `submitRequest`.
 *
 * Keyring implementations must return a response with `pending: true` if the
 * request will be handled asynchronously. Otherwise, the response must contain
 * the result of the request and `pending: false`.
 *
 * In the asynchronous case, the keyring can return a redirect URL and message
 * to be shown to the user. The user can choose to follow the link or cancel
 * the request. The main use case for this is to redirect the user to the snap
 * dapp to review the request.
 */
export type KeyringResponse = Infer<typeof KeyringResponseStruct>;

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
  exportAccount?(id: string): Promise<KeyringAccountData>;

  /**
   * List all submitted requests.
   *
   * Retrieves an array of KeyringRequest objects representing the submitted
   * requests.
   *
   * @returns A promise that resolves to an array of KeyringRequest objects.
   */
  listRequests?(): Promise<KeyringRequest[]>;

  /**
   * Get a request.
   *
   * Retrieves the KeyringRequest object for the given request ID.
   *
   * @param id - The ID of the request to retrieve.
   * @returns A promise that resolves to the KeyringRequest object if found, or
   * undefined otherwise.
   */
  getRequest?(id: string): Promise<KeyringRequest | undefined>;

  /**
   * Submit a request.
   *
   * Submits the given KeyringRequest object.
   *
   * @param request - The KeyringRequest object to submit.
   * @returns A promise that resolves to the request response.
   */
  submitRequest(request: KeyringRequest): Promise<KeyringResponse>;

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
