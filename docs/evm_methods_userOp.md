# EVM Methods for ERC-4337 Accounts

Here we document the methods that an account Snap may implement to support
requests originated from dapps.

## eth_prepareUserOperation

Let the keyring prepare a user operation from transaction data.

### Parameters (Array)

1. **Transactions (required)**
   - Type: `array`
   - Properties:
     - Type: `object`
     - Properties:
       - `to`
         - Type: `string`
         - Pattern: `^0x[0-9a-fA-F]{40}$`
       - `value`
         - Type: `string`
         - Pattern: `^0x([1-9a-f][0-9a-f]*|0)$`
       - `data`
         - Type: `string`
         - Pattern: `^0x[0-9a-f]*$`

### Returns

- **UserOperation Details**
  - Type: `object`
  - Properties:
    - `callData`
      - Type: `string`
      - Pattern: `^0x[0-9a-f]*$`
    - `initCode`
      - Type: `string`
      - Pattern: `^0x[0-9a-f]*$`
    - `nonce`
      - Type: `string`
      - Pattern: `^0x([1-9a-f][0-9a-f]*|0)$`
    - `gasLimits` (optional)
      - Type: `object`
      - Properties
        - `callGasLimit`
          - Type: `string`
          - Pattern: `^0x([1-9a-f][0-9a-f]*|0)$`
        - `verificationGasLimit`
          - Type: `string`
          - Pattern: `^0x([1-9a-f][0-9a-f]*|0)$`
        - `preVerificationGas`
          - Type: `string`
          - Pattern: `^0x([1-9a-f][0-9a-f]*|0)$`
    - `dummySignature`
      - Type: `string`
      - Pattern: `^0x[0-9a-f]*$`
    - `dummyPaymasterAndData`
      - Type: `string`
      - Pattern: `^0x[0-9a-f]*$`
    - `bundler`
      - Type: `string`

### Example

**Request:**

```json
{
  "method": "eth_prepareUserOperation",
  "params": [
    {
      "to": "0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb",
      "value": "0x0",
      "data": "0x"
    },
    {
      "to": "0x660265edc169bab511a40c0e049cc1e33774443d",
      "value": "0x0",
      "data": "0x619a309f"
    }
  ]
}
```

**Response:**

```json
{
  "callData": "0x70641a22000000000000000000000000963a47cc81ea17c44dbb0e101b45406dc9713b9c00000000000000000000000000000000000000000000000001dae4c156fb940000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000",
  "initCode": "0x22ff1dc5998258faa1ea45a776b57484f8ab80a2296601cd0000000000000000000000005147ce3947a407c95687131be01a2b8d55fd0a400000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000007d91ea6a0bc4a4238cd72386d935e35e3d8c318400000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000",
  "nonce": "0x0",
  "gasLimits": {
    "callGasLimit": "21522",
    "verificationGasLimit": "483316",
    "preVerificationGas": "48180"
  },
  "dummySignature": "0x655dfd95b0f83370672f1519cc23962b96f7a21bdd9e25be22ee46a65a6208086b27e6cb6856de3b58b295760ba45b1b866a524e9d81a9be77e221cde05430c9d63f4c7b1c",
  "dummyPaymasterAndData": "0x",
  "bundlerUrl": "https://bundler.example.com/rpc-endpoint"
}
```

## eth_patchUserOperation

Let the keyring modify _some_ properties of a user operation.

### Parameters (Array)

1. UserOperation object
   - Type: `object`
   - Properties:
     - `sender`
       - Type: `string`
       - Pattern: `^0x[0-9a-fA-F]{40}$`
     - `nonce`
       - Type: `string`
       - Pattern: `^0x([1-9a-f][0-9a-f]*|0)$`
     - `initCode`
       - Type: `string`
       - Pattern: `^0x[0-9a-f]*$`
     - `callData`
       - Type: `string`
       - Pattern: `^0x[0-9a-f]*$`
     - `callGasLimit`
       - Type: `string`
       - Pattern: `^0x([1-9a-f][0-9a-f]*|0)$`
     - `verificationGasLimit`
       - Type: `string`
       - Pattern: `^0x([1-9a-f][0-9a-f]*|0)$`
     - `preVerificationGas`
       - Type: `string`
       - Pattern: `^0x([1-9a-f][0-9a-f]*|0)$`
     - `maxFeePerGas`
       - Type: `string`
       - Pattern: `^0x([1-9a-f][0-9a-f]*|0)$`
     - `maxPriorityFeePerGas`
       - Type: `string`
       - Pattern: `^0x([1-9a-f][0-9a-f]*|0)$`
     - `paymasterAndData`
       - Type: `string`
       - Pattern: `^0x[0-9a-f]*$`
     - `signature`
       - Type: `string`
       - Pattern: `^0x[0-9a-f]*$`

### Returns

- Partial UserOperation object
  - Type: `object`
  - Properties:
    - `paymasterAndData`
      - Type: `string`
      - Pattern: `^0x[0-9a-f]*$`

### Example

**Request:**

```json
{
  "method": "eth_patchUserOperation",
  "params": [
    {

    }
  ]
}
```
