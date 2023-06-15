import type { SnapController } from '@metamask/snaps-controllers';
import { HandlerType, ValidatedSnapId } from '@metamask/snaps-utils';
import { Json } from '@metamask/utils';
import { assert } from 'superstruct';

import { KeyringClient, Sender } from './keyring-client';
import { InternalRequest, InternalRequestStruct } from './keyring-internal-api';

/**
 * Implementation of the `Sender` interface that can be used to send requests
 * to a snap through a `SnapController`.
 */
class SnapControllerSender implements Sender {
  #snapId: string;

  #origin: string;

  #controller: SnapController;

  #handler: HandlerType;

  /**
   * Create a new instance of `SnapControllerSender`.
   *
   * @param controller - The `SnapController` instance to send requests to.
   * @param snapId - The ID of the snap to use.
   * @param origin - The sender's origin.
   * @param handler - The handler type.
   */
  constructor(
    controller: any,
    snapId: string,
    origin: string,
    handler: HandlerType,
  ) {
    this.#controller = controller;
    this.#snapId = snapId;
    this.#origin = origin;
    this.#handler = handler;
  }

  /**
   * Send a request to the snap and return the response.
   *
   * @param internalRequest - The arguments of the request.
   * @returns A promise that resolves to the response of the request.
   */
  async send<Response extends Json>(
    internalRequest: InternalRequest,
  ): Promise<Response> {
    assert(internalRequest, InternalRequestStruct);
    return (await this.#controller.handleRequest({
      snapId: this.#snapId as ValidatedSnapId,
      origin: this.#origin,
      handler: this.#handler,
      request: internalRequest,
    })) as Response;
  }
}

/**
 * A `KeyringClient` that allows the communication with a snap through the
 * `SnapController`.
 */
export class KeyringSnapControllerClient extends KeyringClient {
  #controller: SnapController;

  /**
   * Create a new instance of `KeyringSnapControllerClient`.
   *
   * @param controller - The `SnapController` instance to use.
   * @param snapId - The ID of the snap to use (default: `'undefined'`).
   * @param origin - The sender's origin (default: `'metamask'`).
   * @param handler - The handler type (default: `HandlerType.OnRpcRequest`).
   */
  constructor(
    controller: SnapController,
    snapId = 'undefined',
    origin = 'metamask',
    handler: HandlerType = HandlerType.OnRpcRequest,
  ) {
    super(new SnapControllerSender(controller, snapId, origin, handler));
    this.#controller = controller;
  }

  /**
   * Create a new instance of `KeyringSnapControllerClient` with the specified
   * `snapId`.
   *
   * @param snapId - The ID of the snap to use in the new instance.
   * @returns A new instance of `KeyringSnapControllerClient` with the
   * specified snap ID.
   */
  withSnapId(snapId: string): KeyringSnapControllerClient {
    return new KeyringSnapControllerClient(this.#controller, snapId);
  }
}
