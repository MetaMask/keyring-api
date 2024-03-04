import { refine, string } from 'superstruct';
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

export const BundlerUrlStruct = refine(
  string(),
  'BundlerUrl',
  (value: string) => {
    let url;

    try {
      url = new URL(value);
    } catch (_) {
      return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
  },
);
