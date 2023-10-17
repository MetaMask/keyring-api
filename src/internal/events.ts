import { JsonStruct } from '@metamask/utils';
import { object } from 'superstruct';

import { KeyringAccountStruct } from '../api';
import { KeyringEvent } from '../events';
import { literal } from '../superstruct';
import { UuidStruct } from '../utils';

export const AccountCreatedEventStruct = object({
  method: literal(`${KeyringEvent.AccountCreated}`),
  params: object({
    /**
     * New account object.
     */
    account: KeyringAccountStruct,
  }),
});

export const AccountUpdatedEventStruct = object({
  method: literal(`${KeyringEvent.AccountUpdated}`),
  params: object({
    /**
     * Updated account object.
     */
    account: KeyringAccountStruct,
  }),
});

export const AccountDeletedEventStruct = object({
  method: literal(`${KeyringEvent.AccountDeleted}`),
  params: object({
    /**
     * Deleted account ID.
     */
    id: UuidStruct,
  }),
});

export const RequestApprovedEventStruct = object({
  method: literal(`${KeyringEvent.RequestApproved}`),
  params: object({
    /**
     * Request ID.
     */
    id: UuidStruct,

    /**
     * Request result.
     */
    result: JsonStruct,
  }),
});

export const RequestRejectedEventStruct = object({
  method: literal(`${KeyringEvent.RequestRejected}`),
  params: object({
    /**
     * Request ID.
     */
    id: UuidStruct,
  }),
});
