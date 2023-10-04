# MetaMask Keyring API

> This TypeScript module is maintained in the style of the MetaMask team.

This TypeScript module simplifies the integration of snaps with MetaMask using
the Keyring API.

Features:

- **Keyring API Interface**: The module exposes an interface representing the
  Keyring API. Snaps can implement this interface to seamlessly interact with
  MetaMask and leverage its functionality.

- **DApp Client**: The module includes a client that enables dApps to
  communicate with the Keyring snap. This client allows dApps to send requests
  to the snap, such as retrieving account information or submitting requests.

- **MetaMask Client**: The module provides a client specifically designed for
  MetaMask integration. This client enables MetaMask to send requests directly
  to the Keyring snap, facilitating smooth interoperability between the two
  applications.

- **Request Handler Helper Functions**: The module offers a set of helper
  functions to simplify the implementation of the request handler in the
  Keyring snap. These functions assist in processing incoming requests,
  validating data, and handling various request types from dApps and MetaMask.

## Installation

`yarn add @metamask/keyring-api`

or

`npm install @metamask/keyring-api`

## Usage

### In a snap

Inside the snap, implement the `Keyring` API:

```typescript
class MySnapKeyring implements Keyring {
  // Implement the required methods.
}
```

Then create a handler that uses an instance of your keyring:

```typescript
import { keyringRpcDispatcher } from '@metamask/keyring-api';

// Create a new MySnapKeyring instance
keyring = new MySnapKeyring(keyringState);
// ...

// And wrap it in a handler
const keyringHandler: OnRpcRequestHandler = async ({ request }) => {
  // Load the keyring state if needed
  // ...
  return await keyringRpcDispatcher(keyring, request);
};
```

Now expose this handler:

```typescript
export const onRpcRequest: OnRpcRequestHandler = keyringHandler;
```

Or chain it with other handlers:

```typescript
import { chainHandlers } from '@metamask/keyring-api';

export const onRpcRequest: OnRpcRequestHandler = chainHandlers(
  // Other handlers...
  keyringHandler,
  // Other handlers...
);
```

### Migrating from API 0.1.x to 0.2.x

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

  > [!IMPORTANT]
  > For all events above, MetaMask may return an error indicating that the
  > event was not handled, possibly because it contains invalid arguments.

- Keyrings that implement the [async transaction
  flow](./docs/architecture.md#transaction-flow) can now return an optional
  `redirect` property that contains an URL and a message to be displayed to the
  user. This will, in a future release of MetaMask, be used to inform the user
  on how to continue the transaction flow.

  ```ts
  return {
    pending: true,
    redirect: {
      message:
        'Please go to the Snap Dapp to finish sining the transaction.',
      url: 'https://example.com/sign?tx=1234',
    },
  };
  ```

- The `buildHandlersChain` helper function was removed from the API. Instead,
  should implement your own handler. For example:

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
    return handleKeyringRequest(await getKeyring(), request as any);
  };
  ```

## API

See our documentation:

- [Latest published API documentation](https://metamask.github.io/keyring-api/latest/)
- [Latest development API documentation](https://metamask.github.io/keyring-api/staging/)

## Contributing

### Setup

- Install [Node.js](https://nodejs.org) version 16
  - If you are using [nvm](https://github.com/creationix/nvm#installation) (recommended) running `nvm use` will automatically choose the right node version for you.
- Install [Yarn v3](https://yarnpkg.com/getting-started/install)
- Run `yarn install` to install dependencies and run any required post-install scripts

### Testing and Linting

Run `yarn test` to run the tests once. To run tests on file changes, run `yarn test:watch`.

Run `yarn lint` to run the linter, or run `yarn lint:fix` to run the linter and fix any automatically fixable issues.

### Release & Publishing

The project follows the same release process as the other libraries in the MetaMask organization. The GitHub Actions [`action-create-release-pr`](https://github.com/MetaMask/action-create-release-pr) and [`action-publish-release`](https://github.com/MetaMask/action-publish-release) are used to automate the release process; see those repositories for more information about how they work.

1. Choose a release version.

   - The release version should be chosen according to SemVer. Analyze the changes to see whether they include any breaking changes, new features, or deprecations, then choose the appropriate SemVer version. See [the SemVer specification](https://semver.org/) for more information.

2. If this release is backporting changes onto a previous release, then ensure there is a major version branch for that version (e.g. `1.x` for a `v1` backport release).

   - The major version branch should be set to the most recent release with that major version. For example, when backporting a `v1.0.2` release, you'd want to ensure there was a `1.x` branch that was set to the `v1.0.1` tag.

3. Trigger the [`workflow_dispatch`](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#workflow_dispatch) event [manually](https://docs.github.com/en/actions/managing-workflow-runs/manually-running-a-workflow) for the `Create Release Pull Request` action to create the release PR.

   - For a backport release, the base branch should be the major version branch that you ensured existed in step 2. For a normal release, the base branch should be the main branch for that repository (which should be the default value).
   - This should trigger the [`action-create-release-pr`](https://github.com/MetaMask/action-create-release-pr) workflow to create the release PR.

4. Update the changelog to move each change entry into the appropriate change category ([See here](https://keepachangelog.com/en/1.0.0/#types) for the full list of change categories, and the correct ordering), and edit them to be more easily understood by users of the package.

   - Generally any changes that don't affect consumers of the package (e.g. lockfile changes or development environment changes) are omitted. Exceptions may be made for changes that might be of interest despite not having an effect upon the published package (e.g. major test improvements, security improvements, improved documentation, etc.).
   - Try to explain each change in terms that users of the package would understand (e.g. avoid referencing internal variables/concepts).
   - Consolidate related changes into one change entry if it makes it easier to explain.
   - Run `yarn auto-changelog validate --rc` to check that the changelog is correctly formatted.

5. Review and QA the release.

   - If changes are made to the base branch, the release branch will need to be updated with these changes and review/QA will need to restart again. As such, it's probably best to avoid merging other PRs into the base branch while review is underway.

6. Squash & Merge the release.

   - This should trigger the [`action-publish-release`](https://github.com/MetaMask/action-publish-release) workflow to tag the final release commit and publish the release on GitHub.

7. Publish the release on npm.

   - Wait for the `publish-release` GitHub Action workflow to finish. This should trigger a second job (`publish-npm`), which will wait for a run approval by the [`npm publishers`](https://github.com/orgs/MetaMask/teams/npm-publishers) team.
   - Approve the `publish-npm` job (or ask somebody on the npm publishers team to approve it for you).
   - Once the `publish-npm` job has finished, check npm to verify that it has been published.
