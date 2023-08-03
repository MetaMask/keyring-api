# EVM Methods

Here we document the methods that a keyring snap may implement to support
requests originated from dApps.

> [!NOTE]
> The methods described here may have different returns values than the ones
> defined in the [Ethereum JSON-RPC Specification][execution-api] or in
> [MetaMask's API Reference][metamask-api-reference].

## personal_sign

Adds support to [`personal_sign`][personal-sign].

## eth_sign

Adds support to [`eth_sign`][eth-sign].

## eth_signTransaction

Adds support to [`eth_sendTransaction`][eth-send-transaction].

## eth_signTypedData

Adds support to [`eth_signtypeddata_v4`][eth-sign-typed-data].

[execution-api]: https://ethereum.github.io/execution-apis/api-documentation/
[metamask-api-reference]: https://docs.metamask.io/wallet/reference/
[personal-sign]: https://docs.metamask.io/wallet/reference/personal_sign/
[eth-sign-typed-data]: https://docs.metamask.io/wallet/reference/eth_signtypeddata_v4/
[eth-sign]: https://docs.metamask.io/wallet/concepts/signing-methods/#eth_sign
[eth-send-transaction]: https://docs.metamask.io/wallet/reference/eth_sendtransaction/
