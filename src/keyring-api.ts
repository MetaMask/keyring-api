import { Json } from '@metamask/utils';

/**
 * Account capabilities.
 *
 * The following account capabilities are supported:
 * - sign: The account can sign (has a private key).
 */
export type AccountCapability = 'sign';

/**
 * Account types.
 *
 * For EVM accounts (EIP-155), the following account types are supported:
 * - eip155:eoa: Externally owned account.
 * - eip155:sca:erc4337: Smart contract account (ERC-4337).
 */
export type AccountType = 'eip155:eoa' | 'eip155:sca:erc4337';

/**
 * Account object.
 */
export type KeyringAccount = {
  /**
   * Account ID (UUIDv4).
   */
  id: string;

  /**
   * User-chosen account name.
   */
  name: string;

  /**
   * Account address or next receive address (UTXO).
   */
  address: string;

  /**
   * Chains supported by the account (CAIP-2 IDs).
   */
  chains: string[];

  /**
   * Keyring-dependent account options.
   */
  options: Record<string, Json> | null;

  /**
   * Account capabilities.
   */
  capabilities: AccountCapability[];

  /**
   * Account type.
   */
  type: AccountType;
};

/**
 * JSON-RPC request type.
 *
 * It represents a JSON-RPC request sent by a client application.
 * The request ID must be a string and the params field cannot be undefined.
 */
export type JsonRpcRequest =
  | {
      jsonrpc: '2.0';
      id: string;
      method: string;
      params: Json[] | Record<string, Json>;
    }
  | {
      jsonrpc: '2.0';
      id: string;
      method: string;
    };

/**
 * Keyring request.
 */
export type KeyringRequest = {
  /**
   * Account ID (UUIDv4).
   */
  account: string;

  /**
   * Request's scope (CAIP-2 chain ID).
   */
  scope: string;

  /**
   * JSON-RPC request sent by the client application.
   *
   * Note: The request ID must be a string.
   */
  request: JsonRpcRequest;
};

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
   * @returns A promise that resolves to an array of KeyringAccount objects
   * representing the available accounts.
   */
  listAccounts(): Promise<KeyringAccount[]>;

  /**
   * Get an account.
   *
   * @param id - The ID of the account to retrieve.
   * @returns A promise that resolves to the KeyringAccount object if found, or undefined otherwise.
   */
  getAccount(id: string): Promise<KeyringAccount | undefined>;

  /**
   * Create an account.
   *
   * @param name - The name of the account.
   * @param chains - Chains supported by the account (CAIP-2 chain IDs).
   * @param options - Keyring-defined options for the account (optional).
   * @returns A promise that resolves to the newly created KeyringAccount
   * object without any private information.
   */
  createAccount(
    name: string,
    chains: string[],
    options?: Record<string, Json> | null,
  ): Promise<KeyringAccount>;

  /**
   * Update an account.
   *
   * The account ID is used to find the matching account. Does nothing if the
   * account does not exist.
   *
   * @param account - The updated account object.
   * @returns A promise that resolves when the account is successfully updated.
   */
  updateAccount(account: KeyringAccount): Promise<void>;

  /**
   * Delete an account from the keyring.
   *
   * @param id - The ID of the account to delete.
   * @returns A promise that resolves when the account is successfully deleted.
   */
  deleteAccount(id: string): Promise<void>;

  /**
   * Export the private information of an account.
   *
   * @param id - The ID of the account to export.
   * @returns A promise that resolves to the keyring-defined private
   * information of the account.
   */
  exportAccount(id: string): Promise<Record<string, Json>>;

  /**
   * List all submitted requests.
   *
   * @returns A promise that resolves to an array of KeyringRequest objects
   * representing the submitted requests.
   */
  listRequests(): Promise<KeyringRequest[]>;

  /**
   * Get a request.
   *
   * @param id - The ID of the request to retrieve.
   * @returns A promise that resolves to the KeyringRequest object if found, or
   * undefined otherwise.
   */
  getRequest(id: string): Promise<KeyringRequest | undefined>;

  /**
   * Submit a request.
   *
   * Generally used to submit a signing request.
   *
   * @param request - The KeyringRequest object to submit.
   * @returns A promise that resolves when the request is successfully
   * submitted.
   */
  submitRequest(request: KeyringRequest): Promise<void>;

  /**
   * Approve a request.
   *
   * @param id - The ID of the request to approve.
   * @returns A promise that resolves when the request is successfully
   * approved.
   */
  approveRequest(id: string): Promise<void>;

  /**
   * Reject a request.
   *
   * @param id - The ID of the request to reject.
   * @returns A promise that resolves when the request is successfully
   * rejected.
   */
  rejectRequest(id: string): Promise<void>;
};
