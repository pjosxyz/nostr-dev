import import2 from "import2"; // JUST TO AVOID TRANSPILING
import { is_node } from "tstl";

import { Event, Filter, SimplePool, SubCloser } from "nostr-tools";

import { SocketConfig, SocketOptions, socket_config } from "./config.js";

import * as util from "./utils.js";

if (is_node()) (global as any).WebSocket ??= import2("ws");

export class NostrSocket {
  readonly _pool: SimplePool;
  readonly filter: Filter;
  readonly relays: string[];
  readonly opt: SocketOptions;

  _sub: SubCloser;

  constructor(relays: string[], config?: SocketConfig) {
    this._pool = new SimplePool();
    this.relays = relays;
    this.opt = socket_config(config);

    this.filter = {
      kinds: [this.opt.kind],
      since: util.now(),
    };

    this._eventHandler = this._eventHandler.bind(this);
    this._sub = this.sub(this.filter);
  }

  get pool(): SimplePool {
    return this._pool;
  }

  _eventHandler(event: Event) {
    console.log("event", event);
  }

  sub(filter: Filter) {
    const sub = this.pool.subscribeMany(this.relays, [filter], {
      onevent: (event: Event) => {
        this._eventHandler(event);
      },
    });
    console.log(sub);
    return sub;
  }
}

export class Signer {
  readonly _secret: string;

  constructor(secret: string) {
    this._secret = secret;
  }
}
