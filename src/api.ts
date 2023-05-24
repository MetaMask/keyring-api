import { Json } from '@metamask/utils';

/**
 * Account capabilities.
 *
 * The following account capabilities are supported:
 *
 * - sign: The account can sign (has a private key)
 */
export type AccountCapability = 'sign';

/**
 * Account types.
 *
 * For EVM accounts (EIP-155), the following account types are supported:
 *
 * - eip155:eoa: Externally owned account
 * - eip155:sca:erc4337: Smart contract account (ERC-4337)
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
 * It's different from the type defined in '@metamask/utils'. The type defined
 * below is a valid JSON object because the params field cannot be undefined.
 *
 * It also forces the request ID to be a string so the request can be handled
 * asynchronously.
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
   * JSON-RPC request sent by the dapp.
   *
   * Note that the request ID must be a string.
   */
  request: JsonRpcRequest;
};

/**
 * Keyring defines the interface of a keyring.
 */
export type Keyring = {
  /**
   * List accounts.
   */
  listAccounts(): Promise<KeyringAccount[]>;

  /**
   * Get an account.
   *
   * @param id - Account ID.
   * @returns The account object if any, undefined otherwise.
   */
  getAccount(id: string): Promise<KeyringAccount | undefined>;

  /**
   * Create an account.
   *
   * @param name - Account name.
   * @param chains - Chains supported by the account.
   * @param options - Keyring-defined options.
   * @returns The new account object (without any private information).
   */
  createAccount(
    name: string,
    chains: string[],
    options?: Record<string, Json>,
  ): Promise<KeyringAccount>;

  /**
   * Update an account.
   *
   * The account ID is used to find the matching account. Does nothing if the
   * account does not exist.
   *
   * @param account - New account object.
   */
  updateAccount(account: KeyringAccount): Promise<void>;

  /**
   * Delete an account from the keyring.
   *
   * @param id - ID of the account to be deleted.
   */
  deleteAccount(id: string): Promise<void>;

  /**
   * Export the private information of an account.
   *
   * @param id - ID of the account to be exported.
   * @returns Keyring-defined account's private information.
   */
  exportAccount(id: string): Promise<Record<string, Json>>;

  /**
   * List all submitted requests.
   *
   * @returns List of submitted requests.
   */
  listRequests(): Promise<KeyringRequest[]>;

  /**
   * Get a request.
   *
   * @param id - Request ID.
   * @returns The request object if any, undefined otherwise.
   */
  getRequest(id: string): Promise<KeyringRequest | undefined>;

  /**
   * Submit a request.
   *
   * Generally, it's used to submit a signing request.
   *
   * @param request - Keyring request.
   */
  submitRequest(request: KeyringRequest): Promise<void>;

  /**
   * Approve a request.
   *
   * @param id - ID of the request to approve.
   */
  approveRequest(id: string): Promise<void>;

  /**
   * Reject a request.
   *
   * @param id - ID of the request to reject.
   */
  rejectRequest(id: string): Promise<void>;
};
