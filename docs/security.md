# Security

## Guidelines for Account Snaps

Account Snap developers should adhere to the following security considerations.

### Don't add secret information to the account object

Account objects (i.e., `KeyringAccount` instances) are exposed to dapps and the
extension. Therefore, it's crucial not to store any secret information within
them.

**:x: DO NOT DO THIS:**

```ts
const account: KeyringAccount = {
  id: uuid(),
  options: {
    someSecret: '0x01234...78', // !!! DO NOT DO THIS !!!
  },
  address,
  methods: [
    EthMethod.PersonalSign,
    EthMethod.Sign,
    EthMethod.SignTransaction,
    EthMethod.SignTypedDataV1,
    EthMethod.SignTypedDataV3,
    EthMethod.SignTypedDataV4,
  ],
  type: EthAccountType.Eoa,
};
```

**:white_check_mark: DO THIS INSTEAD:**

Store any secret information that you need in the snap's state:

```ts
await snap.request({
  method: 'snap_manageState',
  params: {
    operation: 'update',
    newState: {
      someSecret: '0x01234...78',
    },
  },
});
```

### Verify the origin of all requests

It's essential for your snap to confirm the origin of all requests. This
measure prevents a malicious dapp from impersonating the user or a legitimate
dapp and sending requests to your snap.

**The following methods can be called by MetaMask:**

> [!IMPORTANT]
> The `origin` value for requests coming from MetaMask is: `'metamask'`.

- `keyring_listAccounts`
- `keyring_getAccount`
- `keyring_filterAccountChains`
- `keyring_deleteAccount`
- `keyring_listRequests`
- `keyring_getRequest`
- `keyring_submitRequest`
- `keyring_rejectRequest`

**And dapps can call the following methods:**

> [!IMPORTANT]
> The `origin` value for requests coming from a dapp is the dapp's URL. Ensure
> that the request originates from a legitimate dapp, and that any domain used
> for development purposes (e.g. `http://localhost`) is not authorized in your
> production snap.

- `keyring_listAccounts`
- `keyring_getAccount`
- `keyring_createAccount`
- `keyring_filterAccountChains`
- `keyring_updateAccount`
- `keyring_deleteAccount`
- `keyring_exportAccount`
- `keyring_listRequests`
- `keyring_getRequest`
- `keyring_approveRequest`
- `keyring_rejectRequest`

**Here is an example implementation:**

```ts
const originPermissions: Record<string, string[]> = {
  'metamask': [
    // List of allowed methods from MetaMask.
  ],
  'https://<dapp domain>': [
    // List of allowed methods from the dapp.
  ],
};

if (!originPermissions[origin]?.includes(request.method)) {
  // REJECT the request.
}
```

### Ensure that the redirect URL cannot be manipulated

If your snap implements the [asynchronous transaction
flow](./architecture.md#transaction-flow), ensure that the redirect URL is
valid and cannot be manipulated, otherwise the user could be redirected to a
malicious website.

```ts
async submitRequest(request: KeyringRequest): Promise<SubmitRequestResponse> {
  // Your snap's custom logic here...
  return {
    pending: true,
    redirect: {
      message: 'Please continue in the Dapp.',
      // !!! MAKE SURE THIS IS A SAFE URL !!!
      url: 'https://<dapp domain>/sign?tx=1234',
    },
  };
}
```

### Remove all debug code from your production Snap

Ensure that all debug code is removed from your production snap. This mistake
can lead to multiple security vulnerabilities. For example, secret information
may be logged to the console, or a security check may be bypassed by a
malicious dapp.
