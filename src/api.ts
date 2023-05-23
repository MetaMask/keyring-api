import { Json, JsonRpcRequest } from '@metamask/utils';

export type AccountCapability = 'sign';

export type AccountType = 'eip155:eoa' | 'eip155:sca:erc4337';

export type KeyringAccount = {
  id: string; // Random ID (UUIDv4)
  name: string; // User-chosen account name (must be unique)
  address: string; // Account address or next receive address (UTXO)
  chains: string[]; // Supported chains (CAIP-2 IDs)
  options?: Json; // Other account information, keyring-dependent
  capabilities: AccountCapability[]; // Account capabilities
  type: AccountType; // Account type
};

export type KeyringRequest = {
  account: string; // Account ID
  scope: string; // CAIP-2 chain ID
  request: JsonRpcRequest<Json[] | Record<string, Json>>; // Submitted JSON-RPC request
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
