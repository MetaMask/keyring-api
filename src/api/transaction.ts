import type { Infer } from 'superstruct';
import { array, enums, number, string } from 'superstruct';

import { object } from '../superstruct';
import { UuidStruct } from '../utils';

/**
 * This struct represents an asset.
 *
 * @example
 * ```ts
 * asset: {
 *   id: 'eip155:1/slip44:60',
 *   unit: 'ETH',
 * },
 * ```
 */
const AssetStruct = object({
  /**
   * Asset ID (CAIP-19).
   */
  id: string(),

  /**
   * Unit of the asset. This has to be one of the supported units for the
   * asset, as defined by MetaMask.
   */
  unit: string(),
});

/**
 * This struct represents an amount of an asset.
 *
 * @example
 * ```ts
 * fee: {
 *   amount: '0.01',
 *   asset: {
 *     id: 'eip155:1/slip44:60',
 *     unit: 'ETH',
 *   },
 * },
 * ```
 */
const AmountStruct = object({
  /**
   * Amount in decimal string format.
   */
  amount: string(),

  /**
   * Asset information.
   */
  asset: AssetStruct,
});

/**
 * This struct represents a participant in a transaction.
 *
 * @example
 * ```ts
 * from: [
 *   {
 *     address: '0x1234...',
 *     amount: '0.01',
 *     asset: {
 *       id: 'eip155:1/slip44:60',
 *       unit: 'ETH',
 *     },
 *   },
 * ],
 * ```
 */
const ParticipantStruct = object({
  /**
   * Amount transferred from or to the participant.
   */
  ...AmountStruct.schema,

  /**
   * Participant address.
   */
  address: string(),
});

/**
 * This struct represents a blockchain transaction.
 *
 * @example
 * ```ts
 * {
 *   "id": "f5d8ee39a430901c91a5917b9f2dc19d6d1a0e9cea205b009ca73dd04470b9a6",
 *   "chain": "bip122:000000000019d6689c085ae165831e93",
 *   "account": "b9beb861-9761-4b97-89ce-d992be5f34da",
 *   "status": "confirmed",
 *   "timestamp": 1716367781,
 *   "type": "send",
 *   "from": [
 *     {
 *       "address": "bc1qrp0yzgkf8rawkuvdlhnjfj2fnjwm0m8727kgah",
 *       "amount": "0.2001",
 *       "asset": {
 *         "id": "bip122:000000000019d6689c085ae165831e93/slip44:0",
 *         "unit": "BTC"
 *       }
 *     }
 *   ],
 *   "to": [
 *     {
 *       "address": "bc1qrp0yzgkf8rawkuvdlhnjfj2fnjwm0m8727kgah",
 *       "amount": "0.1",
 *       "asset": {
 *         "id": "bip122:000000000019d6689c085ae165831e93/slip44:0",
 *         "unit": "BTC"
 *       }
 *     },
 *     {
 *       "address": "bc1qrp0yzgkf8rawkuvdlhnjfj2fnjwm0m8727kgah",
 *       "amount": "0.1",
 *       "asset": {
 *         "id": "bip122:000000000019d6689c085ae165831e93/slip44:0",
 *         "unit": "BTC"
 *       }
 *     }
 *   ],
 *   "fee": {
 *     "amount": "0.0001",
 *     "asset": {
 *       "id": "bip122:000000000019d6689c085ae165831e93/slip44:0",
 *       "unit": "BTC"
 *     }
 *   }
 * }
 * ```
 */
export const TransactionStruct = object({
  /**
   * Chain-specific transaction ID.
   */
  id: string(),

  /**
   * Chain ID (CAIP-2).
   */
  chain: string(),

  /**
   * Account ID (UUIDv4).
   */
  account: UuidStruct,

  /**
   * Transaction status.
   */
  status: enums(['submitted', 'pending', 'confirmed', 'failed']),

  /**
   * Timestamp of when the transaction was added to the blockchain.
   */
  timestamp: number(),

  /**
   * Transaction type. This will be used by MetaMask to enrich the transaction
   * details on the UI.
   */
  type: enums([
    'send',
    'receive',
    'call',
    'swap',
    'bridge',
    'stake',
    'unstake',
  ]),

  /**
   * Transaction sender addresses and amounts.
   */
  from: array(ParticipantStruct),

  /**
   * Transaction receiver addresses and amounts.
   */
  to: array(ParticipantStruct),

  /**
   * Transaction fee.
   */
  fee: AmountStruct,
});

/**
 * Transaction object.
 *
 * See {@link TransactionStruct}.
 */
export type Transaction = Infer<typeof TransactionStruct>;
