import { JsonStruct } from '@metamask/utils';
import type { Infer } from 'superstruct';
import { array, literal, number, record, string, union } from 'superstruct';

import { exactOptional, object } from './superstruct';

export const JsonRpcRequestStruct = object({
  jsonrpc: literal('2.0'),
  id: union([string(), number(), literal(null)]),
  method: string(),
  params: exactOptional(
    union([array(JsonStruct), record(string(), JsonStruct)]),
  ),
});

/**
 * JSON-RPC request type.
 */
export type JsonRpcRequest = Infer<typeof JsonRpcRequestStruct>;
