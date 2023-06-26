# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.1]
### Uncategorized
- refactor: rename RPC handling functions ([#16](https://github.com/MetaMask/keyring-api/pull/16))
- feat: validate snap response using superstruct ([#15](https://github.com/MetaMask/keyring-api/pull/15))
- fix: fix `keyring_listAccounts` method literal and assertions ([#13](https://github.com/MetaMask/keyring-api/pull/13))
- chore(deps): bump fast-xml-parser from 4.2.4 to 4.2.5 ([#17](https://github.com/MetaMask/keyring-api/pull/17))
- ci: update workflows ([#14](https://github.com/MetaMask/keyring-api/pull/14))
- chore(deps): bump @metamask/key-tree from 7.0.0 to 7.1.1 ([#12](https://github.com/MetaMask/keyring-api/pull/12))
- chore(deps): bump @metamask/utils from 6.0.1 to 6.1.0 ([#11](https://github.com/MetaMask/keyring-api/pull/11))

## [0.1.0] - 2023-06-20
### Added
- Usage examples to [`README.md`](./README.md).
- Keyring API definition.
- JSON-RPC snap keyring client. It is intended to be used by a snap's companion dApp to send requests to the snap.
- SnapController keyring client. It is intended to be used by MetaMask to talk to the snap.
- Helper functions to create keyring handler in the snap.

[Unreleased]: https://github.com/MetaMask/keyring-api/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/MetaMask/keyring-api/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/MetaMask/keyring-api/releases/tag/v0.1.0
