import { JsonStruct } from '@metamask/utils';
import {
  type Infer,
  array,
  literal,
  nullable,
  number,
  object,
  record,
  string,
  union,
} from 'superstruct';

const Common = {
  jsonrpc: literal('2.0'),
  id: nullable(union([string(), number()])),
  method: string(),
};

const Params = {
  params: union([array(JsonStruct), record(string(), JsonStruct)]),
};

export const JsonRpcRequestStruct = union([
  object({ ...Common }),
  object({ ...Common, ...Params }),
]);

/**
 * JSON-RPC request type.
 */
export type JsonRpcRequest = Infer<typeof JsonRpcRequestStruct>;
