// Defines our options interface.
export interface SocketOptions {
  kind: number;
}

// For using partial config objects.
export type SocketConfig = Partial<SocketOptions>;

// Defines our default options.
export const DEFAULTS: SocketOptions = {
  kind: 20_000, // ephemeral events (not stored by relays. will receive, forward event to its subscribers)
};

export function socket_config(config: SocketConfig = {}): SocketOptions {
  /* Applies our default options, plus custom configs.
   */
  return { ...DEFAULTS, ...config };
}
