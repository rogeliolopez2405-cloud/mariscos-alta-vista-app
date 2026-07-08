import type { KVNamespace } from "@cloudflare/workers-types";

declare global {
  interface CloudflareEnv {
    ORDERS_KV: KVNamespace;
  }
}

export {};
