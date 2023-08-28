# EVM Methods

Here we document the methods that a keyring snap may implement to support
requests originated from dApps.

> [!NOTE]
> The methods described here may have different returns values than the ones
> defined in the [Ethereum JSON-RPC Specification][execution-api] or in
> [MetaMask's API Reference][metamask-api-reference].

## personal_sign

Adds support to [`personal_sign`][personal-sign].

### Parameters (Array)

1. **Message to sign (required)**
   - Type: `string`
   - Pattern: `^0x[0-9a-fA-F]*$`
2. **Account address (required)**
   - Type: `string`
   - Pattern: `^0x[0-9a-fA-F]{40}$`

### Returns

- **Signature**
  - Type: `string`
  - Pattern: `^0x[0-9a-f]+$`

### Example

**Request:**

```json
{
  "method": "personal_sign",
  "params": [
    "0x4578616d706c652060706572736f6e616c5f7369676e60206d657373616765",
    "0x5874174dcf1ab6F7Efd8496f4f09404CD1c5bA84"
  ]
}
```

**Response:**

```json
"0x262d12322b75228d09bbe3c104b91c1df32794126ce6a851e5c2721deb42d60e20b6eff3a1e2b5d29c2680edfb42e8497dbd7e75d0591a390a9385861b40f73d1c"
```

## eth_sign

Adds support to [`eth_sign`][eth-sign].

## eth_signTransaction

Adds support to [`eth_sendTransaction`][eth-send-transaction].

## eth_signTypedData_v4

Adds support to [`eth_signtypeddata_v4`][eth-sign-typed-data].

### Parameters

1. **Account address (required)**
   - Type: `string`
   - Pattern: `^0x[0-9a-fA-F]{40}$`
2. **Typed data (required)**
   - Type: `object`
   - Properties:
     - `types`
       - Type: `object`
       - Properties:
         - `EIP712Domain`
           - Type: `array`
     - `primaryType`
       - Type: `string`
     - `domain`
       - Type: `object`
     - `message`
       - Type: `object`

### Returns

- **Signature**
  - Type: `string`
  - Pattern: `^0x[0-9a-f]+$`

### Example

**Request:**

```json
{
  "method": "eth_signTypedData_v4",
  "params": [
    "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
    {
      "types": {
        "EIP712Domain": [
          { "name": "name", "type": "string" },
          { "name": "version", "type": "string" },
          { "name": "chainId", "type": "uint256" },
          { "name": "verifyingContract", "type": "address" }
        ],
        "Person": [
          { "name": "name", "type": "string" },
          { "name": "wallet", "type": "address" }
        ],
        "Mail": [
          { "name": "from", "type": "Person" },
          { "name": "to", "type": "Person" },
          { "name": "contents", "type": "string" }
        ]
      },
      "primaryType": "Mail",
      "domain": {
        "name": "Ether Mail",
        "version": "1",
        "chainId": 1,
        "verifyingContract": "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"
      },
      "message": {
        "from": {
          "name": "Cow",
          "wallet": "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826"
        },
        "to": {
          "name": "Bob",
          "wallet": "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB"
        },
        "contents": "Hello, Bob!"
      }
    }
  ]
}
```

**Result:**

```json
"0x4355c47d63924e8a72e509b65029052eb6c299d53a04e167c5775fd466751c9d07299936d304c153f6443dfa05f40ff007d72911b6f72307f996231605b915621c"
```

[execution-api]: https://ethereum.github.io/execution-apis/api-documentation/
[metamask-api-reference]: https://docs.metamask.io/wallet/reference/
[personal-sign]: https://docs.metamask.io/wallet/reference/personal_sign/
[eth-sign-typed-data]: https://docs.metamask.io/wallet/reference/eth_signtypeddata_v4/
[eth-sign]: https://docs.metamask.io/wallet/concepts/signing-methods/#eth_sign
[eth-send-transaction]: https://docs.metamask.io/wallet/reference/eth_sendtransaction/
