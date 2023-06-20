import type { SnapController } from '@metamask/snaps-controllers';
import type { HandlerType, ValidatedSnapId } from '@metamask/snaps-utils';
import type { Json } from '@metamask/utils';
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
   * @param handlerType - The handler type.
   */
  constructor(
    controller: any,
    snapId: string,
    origin: string,
    handlerType: HandlerType,
  ) {
    this.#controller = controller;
    this.#snapId = snapId;
    this.#origin = origin;
    this.#handler = handlerType;
  }

  /**
   * Send a request to the snap and return the response.
   *
   * @param request - JSON-RPC request to send to the snap.
   * @returns A promise that resolves to the response of the request.
   */
  async send<Response extends Json>(
    request: InternalRequest,
  ): Promise<Response> {
    assert(request, InternalRequestStruct);
    return (await this.#controller.handleRequest({
      snapId: this.#snapId as ValidatedSnapId,
      origin: this.#origin,
      handler: this.#handler,
      request,
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
   * The `handlerType` argument has a hard-coded default `string` value instead
   * of a `HandlerType` value to prevent the `@metamask/snaps-utils` module
   * from being required at runtime.
   *
   * @param args - Constructor arguments.
   * @param args.controller - The `SnapController` instance to use.
   * @param args.snapId - The ID of the snap to use (default: `'undefined'`).
   * @param args.origin - The sender's origin (default: `'metamask'`).
   * @param args.handlerType - The handler type (default: `'onRpcRequest'`).
   */
  constructor({
    controller,
    snapId = 'undefined',
    origin = 'metamask',
    handlerType = 'onRpcRequest' as HandlerType,
  }: {
    controller: SnapController;
    snapId?: string;
    origin?: string;
    handlerType?: HandlerType;
  }) {
    super(new SnapControllerSender(controller, snapId, origin, handlerType));
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
    return new KeyringSnapControllerClient({
      controller: this.#controller,
      snapId,
    });
  }
}
