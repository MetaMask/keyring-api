import type { Json } from '@metamask/utils';
import type { Keyring, KeyringAccount, KeyringRequest, KeyringAccountData, KeyringResponse, CaipAssetType, Balance } from './api';
import type { JsonRpcRequest } from './JsonRpcRequest';
export type Sender = {
    send(request: JsonRpcRequest): Promise<Json>;
};
export declare class KeyringClient implements Keyring {
    #private;
    /**
     * Create a new instance of `KeyringClient`.
     *
     * @param sender - The `Sender` instance to use to send requests to the snap.
     */
    constructor(sender: Sender);
    listAccounts(): Promise<KeyringAccount[]>;
    getAccount(id: string): Promise<KeyringAccount>;
    getAccountBalances(id: string, assets: CaipAssetType[]): Promise<Record<CaipAssetType, Balance>>;
    createAccount(options?: Record<string, Json>): Promise<KeyringAccount>;
    filterAccountChains(id: string, chains: string[]): Promise<string[]>;
    updateAccount(account: KeyringAccount): Promise<void>;
    deleteAccount(id: string): Promise<void>;
    exportAccount(id: string): Promise<KeyringAccountData>;
    listRequests(): Promise<KeyringRequest[]>;
    getRequest(id: string): Promise<KeyringRequest>;
    submitRequest(request: KeyringRequest): Promise<KeyringResponse>;
    approveRequest(id: string, data?: Record<string, Json>): Promise<void>;
    rejectRequest(id: string): Promise<void>;
}
