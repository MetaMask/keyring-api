# MetaMask Keyring API

The Keyring API defines a standard interface for account management in MetaMask
and account Snaps. Its goal is to enable easy integration of new account types
in the MetaMask ecosystem.

Features:

- **Keyring API interface**: The interface that should be implemented by new
  keyrings and account Snaps to support account management in MetaMask.

- **Keyring clients**: Helper classes that simplify the integration of keyrings
  in MetaMask, and abstract away from dapps the complexity of having to deal
  with raw JSON-RPC requests to interact with account Snaps.

## Installation

```bash
yarn add @metamask/keyring-api
```

or

```bash
npm install @metamask/keyring-api
```

## Account Snaps

> :point_up: **Important**: Before implementing your Snap, please make sure to
> read the [security recommendations](./docs/security.md) and the [architecture
> document](./docs/architecture.md).

Starting with MetaMask 11.4, Snaps can implement the Keyring API. This allows
users to manage their accounts in a more flexible way, and enables developers
to build new types of accounts.

> :pencil2: **Note:** You can also build MetaMask from [source][extension-repo]
> from the `develop` branch.

Follow these steps to implement the Keyring API in your Snap. Please note that
these instruction assume that you are already familiar with the process of
[developing a Snap](https://docs.metamask.io/snaps/).

1. **Implement the Keyring API:**

   Inside your Snap, implement the `Keyring` API:

   ```typescript
   class MySnapKeyring implements Keyring {
     // Implement the required methods here...
   }
   ```

   > :point_up: **Important**: Ensure that your keyring implements the [methods
   > called by MetaMask][exposed-methods], otherwise some features may not
   > work.

2. **Handle requests submitted by MetaMask:**

   MetaMask will submit requests through the `submitRequest` method of your the
   Keyring API (check the supported [EVM methods](./docs/evm-methods.md)). Here
   is an example of request:

   ```json
   {
     "id": "d6e23af6-4bea-48dd-aeb0-7d3c30ea67f9",
     "scope": "",
     "account": "69438371-bef3-4957-9f91-c3f22c1d75f3",
     "request": {
       "method": "personal_sign",
       "params": [
         "0x4578616d706c652060706572736f6e616c5f7369676e60206d657373616765",
         "0x5874174dcf1ab6F7Efd8496f4f09404CD1c5bA84"
       ]
     }
   }
   ```

   Where:

   - `id` is unique identifier for the request.

   - `scope` is the CAIP-2 chain ID of the selected chain. Currently, this
     property is always an empty string. Your Snap should use the chain ID
     present in the request object instead.

   - `account` is the ID of the account that should handle the request.

   - `request` is the request object.

   Your Snap must respond with either a synchronous result:

   ```typescript
   return { pending: false, result };
   ```

   Or an asynchronous result:

   ```typescript
   return { pending: true, redirect: { message, url } };
   ```

   The redirect message and URL will be displayed to the user to inform them
   about how to continue the transaction flow.

3. **Notify MetaMask about events:**

   The following actions must be notified to MetaMask:

   1. When an account is created:

      ```typescript
      try {
        emitSnapKeyringEvent(snap, KeyringEvent.AccountCreated, { account });
        // Update your snap's state...
      } catch (error) {
        // Handle the error...
      }
      ```

      MetaMask will return an error if the account already exists or if the
      account object is invalid.

   2. When an account is updated:

      ```typescript
      try {
        emitSnapKeyringEvent(snap, KeyringEvent.AccountUpdated, { account });
        // Update your snap's state...
      } catch (error) {
        // Handle the error...
      }
      ```

      MetaMask will return an error if the account does not exist, if the
      account object is invalid, or if the account address changed.

   3. When an account is deleted:

      ```typescript
      try {
        emitSnapKeyringEvent(snap, KeyringEvent.AccountDeleted, {
          id: account.id,
        });
        // Update your snap's state...
      } catch (error) {
        // Handle the error...
      }
      ```

      The delete event is idempotent, so it is safe to emit it even if the
      account does not exist.

   4. When a request is approved:

      ```typescript
      try {
        emitSnapKeyringEvent(snap, KeyringEvent.RequestApproved, {
          id: request.id,
          result,
        });
        // Update your snap's state...
      } catch (error) {
        // Handle the error...
      }
      ```

      MetaMask will return an error if the request does not exist.

      > :pencil2: **Note:** This only applies to Snaps that implement the
      > [asynchronous transaction flow][async-flow].

   5. When a request is rejected:

      ```typescript
      try {
        emitSnapKeyringEvent(snap, KeyringEvent.RequestRejected, {
          id: request.id,
        });
        // Update your snap's state...
      } catch (error) {
        // Handle the error...
      }
      ```

      MetaMask will return an error if the request does not exist.

      > :pencil2: **Note:** This only applies to Snaps that implement the
      > [asynchronous transaction flow][async-flow].

4. **Expose the Keyring API:**

   Then create a handler to expose the keyring methods to MetaMask and your dapp:

   ```typescript
   export const onKeyringRequest: OnKeyringRequestHandler = async ({
     origin,
     request,
   }) => {
     // Your custom logic here...
     return handleKeyringRequest(keyring, request);
   };
   ```

5. **Call the keyring methods from your dapp:**

   Now you should be able to call your account Snap from your dapp, for
   example:

   ```typescript
   const client = new KeyringSnapRpcClient(snapId, window.ethereum);
   const accounts = await client.listAccounts();
   ```

## Migrating from 0.1.x to 0.2.x

The following changes were made to the API, which may require changes to your
implementation:

- In the `KeyringAccount` type, the `supportedMethods` property was renamed to
  `methods`.

  ```diff
  - supportedMethods: string[];
  + methods: string[];
  ```

- In the `KeyringAccount` type, the `name` property was removed.

  ```diff
  - name: string;
  ```

- In the `KeyringAccount` type, add the `options` property can no longer be
  null.

  ```diff
  - options: Record<string, unknown> | null;
  + options: Record<string, unknown>;
  ```

- In the `KeyringAccount` type, the `eth_signTypedData` method was removed from
  the list of available methods.

  ```diff
  - 'eth_signTypedData',
  ```

  It was an alias for the `eth_signTypedData_v1` method, which is still
  present.

- Snaps should now use the `emitSnapKeyringEvent()` helper function to notify
  MetaMask about events:

  ```ts
  // Emit an event to indicate that an account was created.
  emitSnapKeyringEvent(snap, KeyringEvent.AccountCreated, { account });

  // Emit an event to indicate that an account was updated.
  emitSnapKeyringEvent(snap, KeyringEvent.AccountUpdated, { account });

  // Emit an event to indicate that an account was deleted.
  emitSnapKeyringEvent(snap, KeyringEvent.AccountDeleted, { id: account.id });

  // Emit an event to indicate that a request was approved.
  emitSnapKeyringEvent(snap, KeyringEvent.RequestApproved, {
    id: request.id,
    result,
  });

  // Emit an event to indicate that a request was rejected.
  emitSnapKeyringEvent(snap, KeyringEvent.RequestRejected, { id: request.id });
  ```

  > :point_up: **Important**: For all events above, MetaMask may return an error
  > indicating that the event was not handled, possibly because it contains
  > invalid arguments.

- Keyrings that implement the [asynchronous transaction flow][async-flow] can
  now return an optional `redirect` property that contains an URL and a message
  to be displayed to the user. This will, in a future release of MetaMask, be
  used to inform the user on how to continue the transaction flow.

  ```ts
  return {
    pending: true,
    redirect: {
      message: 'Please go to the Snap Dapp to finish sining the transaction.',
      url: 'https://example.com/sign?tx=1234',
    },
  };
  ```

- The `buildHandlersChain` helper function was removed from the API. Instead,
  you must implement your own handler. For example:

  ```ts
  export const onRpcRequest: OnRpcRequestHandler = async ({
    request,
    origin,
  }) => {
    // Check if origin is allowed to call the method.
    if (!hasPermission(origin, request.method)) {
      throw new Error(
        `Origin '${origin}' is not allowed to call '${request.method}'`,
      );
    }

    // Dispatch the request to the keyring.
    return handleKeyringRequest(keyring, request);
  };
  ```

## Migrating from 0.2.x to 1.x.x

The following changes were made to the API, which may require changes to your
implementation:

- Your Snap must expose the Keyring methods through the `onKeyringRequest`
  export instead of the `onRpcRequest` export.

- Your Snap must request the new `endowment:keyring` endowment, and list any
  dapp that should be allowed to call the Keyring methods.

For more details about the changes, please refer to the [security
guidelines](./docs/security.md).

## API reference

The latest API documentation is available here:

- [Release version](https://metamask.github.io/keyring-api/latest/)
- [Development version](https://metamask.github.io/keyring-api/staging/)

## Contributing

Check the [contributing guidelines](./CONTRIBUTING.md) for more details.

[extension-repo]: https://github.com/MetaMask/metamask-extension
[exposed-methods]: ./docs/security.md#limit-the-methods-exposed-to-dapps
[async-flow]: ./docs/architecture.md#asynchronous-transaction-flow
