# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0]
### Uncategorized
- chore(deps): bump @metamask/approval-controller from 3.5.0 to 3.5.1 ([#78](https://github.com/MetaMask/keyring-api/pull/78))
- chore(deps): bump @metamask/snaps-registry from 1.2.1 to 1.2.2 ([#79](https://github.com/MetaMask/keyring-api/pull/79))
- chore(deps): bump @metamask/base-controller from 3.2.0 to 3.2.1 ([#80](https://github.com/MetaMask/keyring-api/pull/80))
- chore(deps): bump @metamask/utils from 7.1.0 to 8.0.0 ([#81](https://github.com/MetaMask/keyring-api/pull/81))
- feat: add keyring events and helper functions ([#74](https://github.com/MetaMask/keyring-api/pull/74))
- chore: update CODEOWNERS ([#76](https://github.com/MetaMask/keyring-api/pull/76))
- feat: add a `redirect` field to asynchronous request responses ([#75](https://github.com/MetaMask/keyring-api/pull/75))
- refactor: make `exportAccount`, `listRequests` and `getRequest` optional ([#73](https://github.com/MetaMask/keyring-api/pull/73))
- chore(deps): bump @metamask/providers from 11.1.0 to 11.1.1 ([#67](https://github.com/MetaMask/keyring-api/pull/67))
- feat: add `InternalAccount` type and create submodule `internal` ([#65](https://github.com/MetaMask/keyring-api/pull/65))
- feat: move superstruct check to base `KeyringClient` ([#64](https://github.com/MetaMask/keyring-api/pull/64))
- feat: make `approveRequest` and `rejectRequest` optional ([#63](https://github.com/MetaMask/keyring-api/pull/63))
- chore(deps): bump ses from 0.18.4 to 0.18.7 ([#68](https://github.com/MetaMask/keyring-api/pull/68))
- feat: export enums with account methods and types ([#66](https://github.com/MetaMask/keyring-api/pull/66))
- chore(deps): bump @metamask/utils from 7.0.0 to 7.1.0 ([#62](https://github.com/MetaMask/keyring-api/pull/62))
- feat: add `exportAccount` method ([#60](https://github.com/MetaMask/keyring-api/pull/60))
- feat: remove versioned `eth_signTypedData` methods ([#61](https://github.com/MetaMask/keyring-api/pull/61))
- feat: make `approveRequest` accept a `result` argument ([#59](https://github.com/MetaMask/keyring-api/pull/59))
- chore: rename variables in unit tests ([#58](https://github.com/MetaMask/keyring-api/pull/58))
- chore: use `literal(null)` for nullable fields ([#57](https://github.com/MetaMask/keyring-api/pull/57))
- chore: update snaps dependencies to 0.38.0-flask.1 ([#56](https://github.com/MetaMask/keyring-api/pull/56))
- feat: remove account name from `KeyringAccount` type ([#55](https://github.com/MetaMask/keyring-api/pull/55))
- chore(deps): bump @metamask/utils from 6.2.0 to 7.0.0 ([#54](https://github.com/MetaMask/keyring-api/pull/54))
- chore(deps): bump `@metamask/snaps-*` to 0.36.0-flask.1 ([#51](https://github.com/MetaMask/keyring-api/pull/51))
- feat: remove `eth_sendTransaction` method ([#50](https://github.com/MetaMask/keyring-api/pull/50))
- feat: add `getController` to client ([#43](https://github.com/MetaMask/keyring-api/pull/43))
- chore(deps-dev): bump `@metamask/eslint-*` to 12.1.0 ([#49](https://github.com/MetaMask/keyring-api/pull/49))
- chore(deps): bump @metamask/approval-controller from 3.4.0 to 3.5.0 ([#47](https://github.com/MetaMask/keyring-api/pull/47))
- chore(deps-dev): bump @metamask/eslint-config-jest from 12.0.0 to 12.1.0 ([#37](https://github.com/MetaMask/keyring-api/pull/37))
- chore(deps): bump @metamask/base-controller from 3.0.0 to 3.2.0 ([#46](https://github.com/MetaMask/keyring-api/pull/46))
- chore(deps): bump word-wrap from 1.2.3 to 1.2.4 ([#48](https://github.com/MetaMask/keyring-api/pull/48))
- chore(deps-dev): bump @metamask/auto-changelog from 3.1.0 to 3.2.0 ([#44](https://github.com/MetaMask/keyring-api/pull/44))
- chore(deps): bump @metamask/utils from 6.1.0 to 6.2.0 ([#36](https://github.com/MetaMask/keyring-api/pull/36))
- fix: rename `erc4337` -> `eip4337` ([#42](https://github.com/MetaMask/keyring-api/pull/42))
- refactor: rename `supportedMethods` to `methods` ([#35](https://github.com/MetaMask/keyring-api/pull/35))
- chore(deps): bump semver from 6.3.0 to 6.3.1 ([#34](https://github.com/MetaMask/keyring-api/pull/34))
- chore(deps-dev): bump @metamask/eslint-config-jest from 11.1.0 to 12.0.0 ([#33](https://github.com/MetaMask/keyring-api/pull/33))
- feature: make `options` a mandatory field of `KeyringAccount` ([#30](https://github.com/MetaMask/keyring-api/pull/30))
- refactor: rename files for consistency ([#29](https://github.com/MetaMask/keyring-api/pull/29))
- refactor: move `JsonRpcRequest` to its own file ([#28](https://github.com/MetaMask/keyring-api/pull/28))
- chore(deps): bump @metamask/approval-controller from 3.3.0 to 3.4.0 ([#27](https://github.com/MetaMask/keyring-api/pull/27))

## [0.1.3]
### Changed
- Downgrade snaps dependencies to `0.35.2-flask.1`. ([#25](https://github.com/MetaMask/keyring-api/pull/25))

## [0.1.2]
### Changed
- Update snaps dependencies. ([#21](https://github.com/MetaMask/keyring-api/pull/21))

## [0.1.1]
### Added
- Validate snap responses for type correctness. ([#15](https://github.com/MetaMask/keyring-api/pull/15))

### Changed
- Rename RPC handling functions. ([#16](https://github.com/MetaMask/keyring-api/pull/16))

## [0.1.0] - 2023-06-20
### Added
- Usage examples to [`README.md`](./README.md).
- Keyring API definition.
- JSON-RPC snap keyring client. It is intended to be used by a snap's companion dApp to send requests to the snap.
- SnapController keyring client. It is intended to be used by MetaMask to talk to the snap.
- Helper functions to create keyring handler in the snap.

[Unreleased]: https://github.com/MetaMask/keyring-api/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/MetaMask/keyring-api/compare/v0.1.3...v0.2.0
[0.1.3]: https://github.com/MetaMask/keyring-api/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/MetaMask/keyring-api/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/MetaMask/keyring-api/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/MetaMask/keyring-api/releases/tag/v0.1.0
