import { Json } from '@metamask/utils';

/**
 * Supported EVM methods.
 */
export enum EvmMethod {
  PersonalSign = 'personal_sign',
  SendTransaction = 'eth_sendTransaction',
  Sign = 'eth_sign',
  SignTransaction = 'eth_signTransaction',
  SignTypedData = 'eth_signTypedData',
  SignTypedDataV1 = 'eth_signTypedData_v1',
  SignTypedDataV2 = 'eth_signTypedData_v2',
  SignTypedDataV3 = 'eth_signTypedData_v3',
  SignTypedDataV4 = 'eth_signTypedData_v4',
}

/**
 * Supported methods.
 */
export type Method = EvmMethod;

/**
 * Account types.
 *
 * For EVM accounts (EIP-155), the following account types are supported:
 * - `eip155:eoa`: Externally owned account.
 * - `eip155:sca:erc4337`: Smart contract account (ERC-4337).
 */
export type AccountType = 'eip155:eoa' | 'eip155:sca:erc4337';

/**
 * Account object.
 *
 * Represents an account with its properties and capabilities.
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
   * Keyring-dependent account options.
   */
  options: Record<string, Json> | null;

  /**
   * Account supported methods.
   */
  supportedMethods: Method[];

  /**
   * Account type.
   */
  type: AccountType;
};

/**
 * JSON-RPC request type.
 *
 * Represents a JSON-RPC request sent by a dApp. The request ID must be a
 * string and the params field cannot be undefined.
 */
export type KeyringJsonRpcRequest =
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
 *
 * Represents a request made to the keyring for account-related operations.
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
  request: KeyringJsonRpcRequest;
};

/**
 * Response returned when submitting a request to the Keyring.
 */
export type SubmitRequestResponse<Result extends Json> =
  | {
      pending: true;
    }
  | {
      pending: false;
      result: Result;
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
   * Creates a new account with the given name, supported chains, and optional
   * account options.
   *
   * @param name - The name of the account.
   * @param options - Keyring-defined options for the account (optional).
   * @returns A promise that resolves to the newly created KeyringAccount
   * object without any private information.
   */
  createAccount(
    name: string,
    options?: Record<string, Json> | null,
  ): Promise<KeyringAccount>;

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
  submitRequest<Result extends Json = null>(
    request: KeyringRequest,
  ): Promise<SubmitRequestResponse<Result>>;

  /**
   * Approve a request.
   *
   * Approves the request with the given ID and sets the response if provided.
   *
   * @param id - The ID of the request to approve.
   * @param result - The response to the request (optional).
   * @returns A promise that resolves when the request is successfully
   * approved.
   */
  approveRequest(id: string, result?: Json): Promise<void>;

  /**
   * Reject a request.
   *
   * Rejects the request with the given ID.
   *
   * @param id - The ID of the request to reject.
   * @returns A promise that resolves when the request is successfully
   * rejected.
   */
  rejectRequest(id: string): Promise<void>;
};
