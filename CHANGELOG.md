# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0]
### Uncategorized
- chore: revert version to 0.0.0 in package.json
- chore: apply linter
- chore: rename handler variable to match snaps naming
- chore: update API docs links
- chore: remove template usage section
- docs: add usage in snap
- docs: add module description
- feat: add unit tests
- This reverts commit b25e1b93b85f7a47626b1379e8a314c6f5a61a3d, reversing ([#6](https://github.com/MetaMask/keyring-api/pull/6))
- chore: update `yarn.lock`
- Merge branch 'main' into dependabot/npm_and_yarn/main/metamask/utils-6.0.1
- chore(deps): bump @metamask/approval-controller from 3.2.0 to 3.3.0 ([#7](https://github.com/MetaMask/keyring-api/pull/7))
- fix: needed to change prepack for now to unblock myself, may find a b… ([#6](https://github.com/MetaMask/keyring-api/pull/6))
- chore(deps): bump @metamask/approval-controller from 3.2.0 to 3.3.0
- fix: needed to change prepack for now to unblock myself, may find a better solution later
- chore: fix sonarlint warning
- refactor: replace enum with type union
- chore: update `chainHandlers` signature
- fix: remove `snaps-utils` runtime dependency
- chore: remove unused dependency
- chore: use `import type` for types
- chore: use types from `snaps-utils`
- Revert "chore: use JSON types from `snaps-types` instead of `utils`"
- Revert "chore: remove unused `snaps-utils` dependency"
- chore: remove unused `snaps-utils` dependency
- chore: use JSON types from `snaps-types` instead of `utils`
- fix: use `OnRpcRequestHandler` from `snaps-types`
- Add superstruct ([#4](https://github.com/MetaMask/keyring-api/pull/4))
- chore: remove unused dependency
- feat: define response types
- chore: remove `is-uuid` and move utils to another file
- chore: fix Markdown in comment
- refactor: set JSON-RPC header in the `send` method
- fix: use new `Sender` interface
- chore: remove some layers of "method names"
- chore: sort object fields
- chore: use enum values instead of literal strings
- chore: rename variable
- remove unused import
- fix test
- add id and jsonrpc to all internal request methods
- fix id and reqest type
- fix struct
- fix import for FilterAccountChainsRequest
- make supportedMethods an array
- make options for KeyringAccountStruct nullable
- add superstruct
- chore: update `package.json` and `yarn.lock`
- fix: use enum instead of strings in method names
- chore: cast `snapId` to `ValidatedSnapId`
- feat: rename method to `filterAccountChains`
- fix: fix dispatcher typing
- chore: remove dummy comments
- fix: allow requests to have undefined `params`
- chore(deps): bump @metamask/utils from 5.0.2 to 6.0.1
- chore: rename keyring RPC request class
- chore: simplify code
- chore: replace handler class with dispatcher func
- chore: remove unused argument
- fix: fix handle method signature
- fix: export handlers
- chore: rename handler class
- feat: add handler class and builder function
- feat: add `KeyringRpcDispatcher` class
- fix: fix typo in the `FilterSupportedChainsRequest` type name
- feat: remove `exportAccount` method
- chore: sort lines
- chore: fix typo
- chore: improve jsdoc
- feat: replace `chains` field with `filterSupportedChains` method
- fix: don't add `params` if undefined
- chore: remove traces
- chore: add traces
- fix: handle undefined params
- chore: allow request response to be typed
- chore: rename `snapId` variable
- chore: make `snapId` optional
- chore: add documentation
- feat: make `submitRequest` support sync calls
- chore: update typing of createAccount request
- chore: rename module in package.json and README
- chore: remove unused dependency
- chore: ignore snaps-controllers errors and update dependencies
- chore: configure lavamoat
- chore: prettier format
- chore: rename files and use internal request class
- chore: add type to `snapController` field
- chore: split clients into different files
- feat: add a SnapController client
- chore: accept null options on account creation
- chore: small improvements on the documentation
- chore: remove empty line
- chore: add doc strings
- chore: make JsonRpcRequest a Json subtype
- chore: make options mandatory in the account model
- feat: add API and snap API client
- Initial commit

[Unreleased]: https://github.com/MetaMask/keyring-api/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/MetaMask/keyring-api/releases/tag/v0.1.0
