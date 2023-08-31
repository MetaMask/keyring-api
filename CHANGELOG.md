# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.1]
### Uncategorized
- fix: update snap object keys to be mandatory and move name to metadata ([#87](https://github.com/MetaMask/keyring-api/pull/87))
- chore(deps): bump @metamask/post-message-stream from 6.1.2 to 6.2.0 ([#88](https://github.com/MetaMask/keyring-api/pull/88))

## [0.2.0]
### Added
- Add `InternalAccount` type and create submodule `internal` ([#65](https://github.com/MetaMask/keyring-api/pull/65))
- Add keyring events and helper functions ([#74](https://github.com/MetaMask/keyring-api/pull/74))
- Add a `redirect` field to asynchronous request responses ([#75](https://github.com/MetaMask/keyring-api/pull/75))
- Add `exportAccount` method ([#60](https://github.com/MetaMask/keyring-api/pull/60))
- Add `getController` to client ([#43](https://github.com/MetaMask/keyring-api/pull/43))

### Changed
- Rename `erc4337` -> `eip4337` ([#42](https://github.com/MetaMask/keyring-api/pull/42))
- Make `options` a mandatory field of `KeyringAccount` ([#30](https://github.com/MetaMask/keyring-api/pull/30))
- Make `approveRequest` and `rejectRequest` optional ([#63](https://github.com/MetaMask/keyring-api/pull/63))
- Make `exportAccount`, `listRequests` and `getRequest` optional ([#73](https://github.com/MetaMask/keyring-api/pull/73))
- Export enums with account methods and types ([#66](https://github.com/MetaMask/keyring-api/pull/66))
- Make `approveRequest` accept a `result` argument ([#59](https://github.com/MetaMask/keyring-api/pull/59))
- Remove account name from `KeyringAccount` type ([#55](https://github.com/MetaMask/keyring-api/pull/55))
- Remove `eth_sendTransaction` method ([#50](https://github.com/MetaMask/keyring-api/pull/50))
- Rename `supportedMethods` to `methods` ([#35](https://github.com/MetaMask/keyring-api/pull/35))

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

[Unreleased]: https://github.com/MetaMask/keyring-api/compare/v0.2.1...HEAD
[0.2.1]: https://github.com/MetaMask/keyring-api/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/MetaMask/keyring-api/compare/v0.1.3...v0.2.0
[0.1.3]: https://github.com/MetaMask/keyring-api/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/MetaMask/keyring-api/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/MetaMask/keyring-api/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/MetaMask/keyring-api/releases/tag/v0.1.0
