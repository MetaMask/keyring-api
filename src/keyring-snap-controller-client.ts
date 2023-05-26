import { HandlerType } from '@metamask/snap-utils/*';
import { Json } from '@metamask/utils';
import { v4 as uuid } from 'uuid';

import { KeyringClient, Sender } from './keyring-client';

class SnapControllerSender implements Sender {
  #snapId: string;

  #origin: string;

  #controller: any;

  #handler: HandlerType;

  constructor(
    controller: any,
    snapId: string,
    origin = 'metamask',
    handler: HandlerType = HandlerType.OnRpcRequest,
  ) {
    this.#controller = controller;
    this.#snapId = snapId;
    this.#origin = origin;
    this.#handler = handler;
  }

  async send<Response extends Json>({
    method,
    params,
  }: {
    method: string;
    params?: Json[] | Record<string, Json>;
  }): Promise<Response> {
    return await this.#controller.handleRequest({
      snapId: this.#snapId,
      origin: this.#origin,
      handler: this.#handler,
      request: {
        jsonrpc: '2.0',
        id: uuid(),
        method,
        params,
      },
    });
  }
}

export class KeyringSnapControllerClient extends KeyringClient {
  constructor(controller: any, snapID: string) {
    super(new SnapControllerSender(controller, snapID));
  }
}
