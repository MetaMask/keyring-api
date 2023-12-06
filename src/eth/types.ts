import { definePattern } from '../superstruct';

export const EthBytesStruct = definePattern('EthBytes', /^0x[0-9a-f]*$/iu);

export const EthAddressStruct = definePattern(
  'EthAddress',
  /^0x[0-9a-f]{40}$/iu,
);

export const EthUint256Struct = definePattern(
  'EthUint256',
  /^0x([1-9a-f][0-9a-f]*|0)$/iu,
);
