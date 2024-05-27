import { number, string } from 'superstruct';

import { object } from '../superstruct';

export const BalanceStruct = object({
  amount: number(),
  unit: string(),
});
