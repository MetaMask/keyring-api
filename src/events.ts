/**
 * Supported keyring events.
 */
export enum KeyringEvent {
  // Account events
  AccountCreated = 'event:accountCreated',
  AccountUpdated = 'event:accountUpdated',
  AccountDeleted = 'event:accountDeleted',

  // Request events
  RequestApproved = 'event:requestApproved',
  RequestRejected = 'event:requestRejected',
}
