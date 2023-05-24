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

export type Keyring = {
  listAccounts(): Promise<KeyringAccount[]>;

  getAccount(id: string): Promise<KeyringAccount | undefined>;

  createAccount(
    name: string,
    chains: string[],
    options?: Record<string, Json>,
  ): Promise<KeyringAccount>;

  updateAccount(account: KeyringAccount): Promise<void>;

  deleteAccount(id: string): Promise<void>;

  exportAccount(id: string): Promise<Record<string, Json>>;

  listRequests(): Promise<KeyringRequest[]>;

  getRequest(id: string): Promise<KeyringRequest>;

  submitRequest(request: KeyringRequest): Promise<void>;

  approveRequest(id: string): Promise<void>;

  rejectRequest(id: string): Promise<void>;
};
