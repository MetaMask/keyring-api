import type { SnapController } from '@metamask/snaps-controllers';
import type { HandlerType, ValidatedSnapId } from '@metamask/snaps-utils';

import type { InternalRequest, InternalResponse } from './internal/api';
import { KeyringClient, type Sender } from './KeyringClient';

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
   * @param request - JSON-RPC request to send to the snap.
   * @returns A promise that resolves to the response of the request.
   */
  async send(request: InternalRequest): Promise<InternalResponse> {
    return this.#controller.handleRequest({
      snapId: this.#snapId as ValidatedSnapId,
      origin: this.#origin,
      handler: this.#handler,
      request,
    }) as Promise<InternalResponse>;
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
   * @param args.handler - The handler type (default: `'onRpcRequest'`).
   */
  constructor({
    controller,
    snapId = 'undefined',
    origin = 'metamask',
    handler = 'onRpcRequest' as HandlerType,
  }: {
    controller: SnapController;
    snapId?: string;
    origin?: string;
    handler?: HandlerType;
  }) {
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
    return new KeyringSnapControllerClient({
      controller: this.#controller,
      snapId,
    });
  }

  /**
   * Get the `SnapController` instance used by this client.
   *
   * @returns The `SnapController` instance used by this client.
   */
  getController(): SnapController {
    return this.#controller;
  }
}
