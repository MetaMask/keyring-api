import type { Infer } from 'superstruct';
import { string } from 'superstruct';

import { object } from '../superstruct';
import { StringNumberStruct } from '../utils';

export const BalanceStruct = object({
  amount: StringNumberStruct,
  unit: string(),
});

export type Balance = Infer<typeof BalanceStruct>;
