import { JsonStruct } from '@metamask/utils';
import { literal, object } from 'superstruct';

import { KeyringAccountStruct } from '../api';
import { KeyringEvent } from '../events';
import { UuidStruct } from '../utils';

export const AccountCreatedEventStruct = object({
  method: literal<string>(KeyringEvent.AccountCreated),
  params: object({
    /**
     * New account object.
     */
    account: KeyringAccountStruct,
  }),
});

export const AccountUpdatedEventStruct = object({
  method: literal<string>(KeyringEvent.AccountUpdated),
  params: object({
    /**
     * Updated account object.
     */
    account: KeyringAccountStruct,
  }),
});

export const AccountDeletedEventStruct = object({
  method: literal<string>(KeyringEvent.AccountDeleted),
  params: object({
    /**
     * Deleted account ID.
     */
    id: UuidStruct,
  }),
});

export const RequestApprovedEventStruct = object({
  method: literal<string>(KeyringEvent.RequestApproved),
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
  method: literal<string>(KeyringEvent.RequestRejected),
  params: object({
    /**
     * Request ID.
     */
    id: UuidStruct,
  }),
});
