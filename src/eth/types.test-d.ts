import { expectAssignable, expectNotAssignable } from 'tsd';

import type { EthEoaAccount, EthErc4337Account } from './types';
import { EthAccountType, EthErc4337Method, EthMethod } from './types';

// EOA

const id = '606a7759-b0fb-48e4-9874-bab62ff8e7eb';
const address = '0x000';

expectAssignable<EthEoaAccount>({
  type: EthAccountType.Eoa,
  id,
  address,
  options: {},
  methods: [],
});
expectAssignable<EthEoaAccount>({
  type: EthAccountType.Eoa,
  id,
  address,
  options: {},
  methods: [
    `${EthMethod.PersonalSign}`,
    `${EthMethod.Sign}`,
    `${EthMethod.SignTransaction}`,
    `${EthMethod.SignTypedDataV1}`,
    `${EthMethod.SignTypedDataV3}`,
    `${EthMethod.SignTypedDataV4}`,
  ],
});
expectNotAssignable<EthEoaAccount>({
  type: EthAccountType.Eoa,
  id,
  address,
  options: {},
  methods: [
    `${EthErc4337Method.PrepareUserOperation}`,
    `${EthErc4337Method.PatchUserOperation}`,
    `${EthErc4337Method.SignUserOperation}`,
  ],
});
expectNotAssignable<EthEoaAccount>({
  type: EthAccountType.Erc4337,
  id,
  address,
  options: {},
  methods: [
    `${EthErc4337Method.PrepareUserOperation}`,
    `${EthErc4337Method.PatchUserOperation}`,
    `${EthErc4337Method.SignUserOperation}`,
  ],
});

// ERC-4337

expectAssignable<EthErc4337Account>({
  type: EthAccountType.Erc4337,
  id,
  address,
  options: {},
  methods: [],
});
expectAssignable<EthErc4337Account>({
  type: EthAccountType.Erc4337,
  id,
  address,
  options: {},
  methods: [
    `${EthErc4337Method.PrepareUserOperation}`,
    `${EthErc4337Method.PatchUserOperation}`,
    `${EthErc4337Method.SignUserOperation}`,
  ],
});
expectNotAssignable<EthErc4337Account>({
  type: EthAccountType.Eoa,
  id,
  address,
  options: {},
  methods: [
    `${EthErc4337Method.PrepareUserOperation}`,
    `${EthErc4337Method.PatchUserOperation}`,
    `${EthErc4337Method.SignUserOperation}`,
  ],
});
