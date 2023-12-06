# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0]

### Added

- **BREAKING**: Add support for ERC-4337 transactions ([#213](https://github.com/MetaMask/keyring-api/pull/213))
  - Enum `EthMethods` has been extended with `eth_prepareUserOperation`, `eth_patchUserOperation`, `eth_signUserOperation`
  - Enum `EthAccountType` has been extended with `eip155:erc4337`

### Changed

- **BREAKING**: Update `@metamask/providers` from `^13.0.0` to `^14.0.1` ([#209](https://github.com/MetaMask/keyring-api/pull/209))
  - Consolidation on `readable-stream@^3.6.2`. Users should upgrade to `extension-port-stream@^3.0.0` and `json-rpc-middleware-stream@^5.0.0`.
- Replace deprecated `@metamask/snaps-ui` with `@metamask/snaps-sdk` ([#204](https://github.com/MetaMask/keyring-api/pull/204))
  - Replace `@metamask/snaps-rpc-methods` with `@metamask/snaps-sdk`
  - Update `@metamask/snaps-controllers` and `@metamask/snaps-utils` to versions that don't rely on `@metamask/snaps-ui`
- Documentation updates ([#185](https://github.com/MetaMask/keyring-api/pull/185)) ([#201](https://github.com/MetaMask/keyring-api/pull/201))

### Removed

- **BREAKING** `EthAccountType.Eip4337` has been removed. `eip155:eip4337` should be replaced with `erc:4337`

### Fixed

- Exclude `*.test-d.ts` files from builds ([#184](https://github.com/MetaMask/keyring-api/pull/184))
- Remove `@metamask/snaps-ui` from dependency tree ([#204](https://github.com/MetaMask/keyring-api/pull/204))

## [1.1.0]

### Changed

- `UuidStruct` is now a named type ([#159](https://github.com/MetaMask/keyring-api/pull/159))
- Migrate from `@metamask/rpc-methods` to `@metamask/snaps-rpc-methods` ([#175](https://github.com/MetaMask/keyring-api/pull/175))

### Fixed

- Allow the request ID to be a string, number or null ([#156](https://github.com/MetaMask/keyring-api/pull/156))
- Documentation fixes ([#160](https://github.com/MetaMask/keyring-api/pull/160)) ([#174](https://github.com/MetaMask/keyring-api/pull/174)) ([#173](https://github.com/MetaMask/keyring-api/pull/173)) ([#172](https://github.com/MetaMask/keyring-api/pull/172))
- Use `UuidStruct` for IDs in the internal API ([#158](https://github.com/MetaMask/keyring-api/pull/158))
- Bump `@metamask/json-rpc-engine` from `^7.1.1` to `^7.2.0` ([#164](https://github.com/MetaMask/keyring-api/pull/164))

## [1.0.0]

### Added

- Add migration steps to 1.0.0 ([#149](https://github.com/MetaMask/keyring-api/pull/149)).
- Add Account Snaps security guidelines ([#143](https://github.com/MetaMask/keyring-api/pull/143)).

### Changed

- Bump @metamask/rpc-errors from 6.0.0 to 6.1.0 ([#151](https://github.com/MetaMask/keyring-api/pull/151)).
- Bump postcss from 8.4.24 to 8.4.31 ([#150](https://github.com/MetaMask/keyring-api/pull/150)).

## [1.0.0-rc.1]

### Added

- Document how to migrate from API 0.1.x to 0.2.x ([#124](https://github.com/MetaMask/keyring-api/pull/124)).

### Changed

- **BREAKING:** Use the `onKeyringRequest` snap export ([#145](https://github.com/MetaMask/keyring-api/pull/145)).
- **BREAKING:** Change the events' prefix to `notify:` ([#139](https://github.com/MetaMask/keyring-api/pull/139)).

## [0.2.7]

### Added

- Export events types ([#125](https://github.com/MetaMask/keyring-api/pull/125))

## [0.2.6]

### Changed

- Remove unused lavamoat allowed scripts ([#122](https://github.com/MetaMask/keyring-api/pull/122)).
- Update events in sequence diagram ([#121](https://github.com/MetaMask/keyring-api/pull/121)).
- Update Snap and ESLint dependencies ([#117](https://github.com/MetaMask/keyring-api/pull/117)).
- Bump @metamask/rpc-methods from 0.38.1-flask.1 to 2.0.0 ([#120](https://github.com/MetaMask/keyring-api/pull/120)).

## [0.2.5]

### Changed

- Remove `buildHandlersChain` ([#114](https://github.com/MetaMask/keyring-api/pull/114)).
- Update doc for `eth_signTransaction` ([#111](https://github.com/MetaMask/keyring-api/pull/111)).
- Remove un-versioned `eth_signTypedData` method ([#113](https://github.com/MetaMask/keyring-api/pull/113)).

## [0.2.4]

### Changed

- Fix linting and compatibility with older `tsc` ([#108](https://github.com/MetaMask/keyring-api/pull/108)).

## [0.2.3]

### Added

- Add redirection message to snap async response ([#102](https://github.com/MetaMask/keyring-api/pull/102)).

### Changed

- Use `Omit` instead of `OmitUnion` ([#106](https://github.com/MetaMask/keyring-api/pull/106)).
- Update `KeyringResponse` comment ([#103](https://github.com/MetaMask/keyring-api/pull/103)).
- Use `KeyringRpcMethod` enum instead of string ([#105](https://github.com/MetaMask/keyring-api/pull/105)).
- Refactor tests to match superstruct examples ([#104](https://github.com/MetaMask/keyring-api/pull/104)).
- Add `exactOptional()` superstruct type ([#100](https://github.com/MetaMask/keyring-api/pull/100)).
- Bump @metamask/providers from 11.1.2 to 12.0.0 ([#99](https://github.com/MetaMask/keyring-api/pull/99)).
- Bump @metamask/providers from 11.1.1 to 11.1.2 ([#98](https://github.com/MetaMask/keyring-api/pull/98)).

## [0.2.2]

### Added

- Add architecture and EVM methods docs ([#86](https://github.com/MetaMask/keyring-api/pull/86)).
- Add `lastSelected` and `lastActive` to metadata ([#92](https://github.com/MetaMask/keyring-api/pull/92)).

### Changed

- Make request `params` optional ([#96](https://github.com/MetaMask/keyring-api/pull/96)).
- Remove `lastActive` field from internal account model ([#95](https://github.com/MetaMask/keyring-api/pull/95)).
- Move request ID to outer request ([#94](https://github.com/MetaMask/keyring-api/pull/94)).

## [0.2.1]

### Changed

- Set `snap` object keys to be mandatory and move `name` to `metadata` ([#87](https://github.com/MetaMask/keyring-api/pull/87)).

## [0.2.0]

### Added

- Add `InternalAccount` type and create submodule `internal` ([#65](https://github.com/MetaMask/keyring-api/pull/65)).
- Add keyring events and helper functions ([#74](https://github.com/MetaMask/keyring-api/pull/74)).
- Add a `redirect` field to asynchronous request responses ([#75](https://github.com/MetaMask/keyring-api/pull/75)).
- Add `exportAccount` method ([#60](https://github.com/MetaMask/keyring-api/pull/60)).
- Add `getController` to client ([#43](https://github.com/MetaMask/keyring-api/pull/43)).

### Changed

- Rename `erc4337` -> `eip4337` ([#42](https://github.com/MetaMask/keyring-api/pull/42)).
- Make `options` a mandatory field of `KeyringAccount` ([#30](https://github.com/MetaMask/keyring-api/pull/30)).
- Make `approveRequest` and `rejectRequest` optional ([#63](https://github.com/MetaMask/keyring-api/pull/63)).
- Make `exportAccount`, `listRequests` and `getRequest` optional ([#73](https://github.com/MetaMask/keyring-api/pull/73)).
- Export enums with account methods and types ([#66](https://github.com/MetaMask/keyring-api/pull/66)).
- Make `approveRequest` accept a `result` argument ([#59](https://github.com/MetaMask/keyring-api/pull/59)).
- Remove account name from `KeyringAccount` type ([#55](https://github.com/MetaMask/keyring-api/pull/55)).
- Remove `eth_sendTransaction` method ([#50](https://github.com/MetaMask/keyring-api/pull/50)).
- Rename `supportedMethods` to `methods` ([#35](https://github.com/MetaMask/keyring-api/pull/35)).

## [0.1.3]

### Changed

- Downgrade snaps dependencies to `0.35.2-flask.1` ([#25](https://github.com/MetaMask/keyring-api/pull/25)).

## [0.1.2]

### Changed

- Update snaps dependencies ([#21](https://github.com/MetaMask/keyring-api/pull/21)).

## [0.1.1]

### Added

- Validate snap responses for type correctness ([#15](https://github.com/MetaMask/keyring-api/pull/15)).

### Changed

- Rename RPC handling functions ([#16](https://github.com/MetaMask/keyring-api/pull/16)).

## [0.1.0] - 2023-06-20

### Added

- Usage examples to [`README.md`](./README.md).
- Keyring API definition.
- JSON-RPC snap keyring client. It is intended to be used by a snap's companion dapp to send requests to the snap.
- SnapController keyring client. It is intended to be used by MetaMask to talk to the snap.
- Helper functions to create keyring handler in the snap.

[Unreleased]: https://github.com/MetaMask/keyring-api/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/MetaMask/keyring-api/compare/v1.1.0...v2.0.0
[1.1.0]: https://github.com/MetaMask/keyring-api/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/MetaMask/keyring-api/compare/v1.0.0-rc.1...v1.0.0
[1.0.0-rc.1]: https://github.com/MetaMask/keyring-api/compare/v0.2.7...v1.0.0-rc.1
[0.2.7]: https://github.com/MetaMask/keyring-api/compare/v0.2.6...v0.2.7
[0.2.6]: https://github.com/MetaMask/keyring-api/compare/v0.2.5...v0.2.6
[0.2.5]: https://github.com/MetaMask/keyring-api/compare/v0.2.4...v0.2.5
[0.2.4]: https://github.com/MetaMask/keyring-api/compare/v0.2.3...v0.2.4
[0.2.3]: https://github.com/MetaMask/keyring-api/compare/v0.2.2...v0.2.3
[0.2.2]: https://github.com/MetaMask/keyring-api/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/MetaMask/keyring-api/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/MetaMask/keyring-api/compare/v0.1.3...v0.2.0
[0.1.3]: https://github.com/MetaMask/keyring-api/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/MetaMask/keyring-api/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/MetaMask/keyring-api/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/MetaMask/keyring-api/releases/tag/v0.1.0
