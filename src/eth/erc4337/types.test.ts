import { assert } from 'superstruct';

import { EthUserOperationStruct } from './types';

describe('types', () => {
  it('is a valid UserOperation', () => {
    const userOp = {
      sender: '0x2A3e54af44480ad269cca53e3a4d90ce2DbEb23a',
      nonce: '0x1',
      initCode: '0x',
      callData: '0x70641a22000000000000000000000000',
      callGasLimit: '0x58a83',
      verificationGasLimit: '0xe8c4',
      preVerificationGas: '0xc57c',
      maxFeePerGas: '0x87f0878c0',
      maxPriorityFeePerGas: '0x1dcd6500',
      paymasterAndData: '0x1234',
      signature: '0x1234',
    };
    expect(() => assert(userOp, EthUserOperationStruct)).not.toThrow();
  });

  it('has an shorter sender address', () => {
    const userOp = {
      sender: '0x2A3e54af44480ad269cca53e3a4d90ce2DbEb2',
      nonce: '0x1',
      initCode: '0x',
      callData: '0x70641a22000000000000000000000000',
      callGasLimit: '0x58a83',
      verificationGasLimit: '0xe8c4',
      preVerificationGas: '0xc57c',
      maxFeePerGas: '0x87f0878c0',
      maxPriorityFeePerGas: '0x1dcd6500',
      paymasterAndData: '0x1234',
      signature: '0x1234',
    };
    expect(() => assert(userOp, EthUserOperationStruct)).toThrow(
      'At path: sender -- Expected a value of type `EthAddress`, but received: `"0x2A3e54af44480ad269cca53e3a4d90ce2DbEb2"`',
    );
  });

  it('has an longer sender address', () => {
    const userOp = {
      sender: '0x2A3e54af44480ad269cca53e3a4d90ce2DbEb23a00',
      nonce: '0x1',
      initCode: '0x',
      callData: '0x70641a22000000000000000000000000',
      callGasLimit: '0x58a83',
      verificationGasLimit: '0xe8c4',
      preVerificationGas: '0xc57c',
      maxFeePerGas: '0x87f0878c0',
      maxPriorityFeePerGas: '0x1dcd6500',
      paymasterAndData: '0x1234',
      signature: '0x1234',
    };
    expect(() => assert(userOp, EthUserOperationStruct)).toThrow(
      'At path: sender -- Expected a value of type `EthAddress`, but received: `"0x2A3e54af44480ad269cca53e3a4d90ce2DbEb23a00"`',
    );
  });

  it('has an nonce that starts with zero', () => {
    const userOp = {
      sender: '0x2A3e54af44480ad269cca53e3a4d90ce2DbEb23a',
      nonce: '0x01',
      initCode: '0x',
      callData: '0x70641a22000000000000000000000000',
      callGasLimit: '0x58a83',
      verificationGasLimit: '0xe8c4',
      preVerificationGas: '0xc57c',
      maxFeePerGas: '0x87f0878c0',
      maxPriorityFeePerGas: '0x1dcd6500',
      paymasterAndData: '0x1234',
      signature: '0x1234',
    };
    expect(() => assert(userOp, EthUserOperationStruct)).toThrow(
      'At path: nonce -- Expected a value of type `EthUint256`, but received: `"0x01"`',
    );
  });
});
