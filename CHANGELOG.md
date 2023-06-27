# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.2]
### Uncategorized
- chore(deps): bump @metamask/snaps-utils from 0.34.1-flask.1 to 1.0.0-prerelease.1 ([#22](https://github.com/MetaMask/keyring-api/pull/22))
- chore(deps): bump @metamask/snaps-controllers from 0.34.1-flask.1 to 1.0.0-prerelease.1 ([#23](https://github.com/MetaMask/keyring-api/pull/23))
- chore(deps): bump @metamask/providers from 11.0.0 to 11.1.0 ([#19](https://github.com/MetaMask/keyring-api/pull/19))
- chore(deps): update snaps dependencies ([#21](https://github.com/MetaMask/keyring-api/pull/21))

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

[Unreleased]: https://github.com/MetaMask/keyring-api/compare/v0.1.2...HEAD
[0.1.2]: https://github.com/MetaMask/keyring-api/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/MetaMask/keyring-api/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/MetaMask/keyring-api/releases/tag/v0.1.0
