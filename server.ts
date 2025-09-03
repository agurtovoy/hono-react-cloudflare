//
// BEGIN
//

import { Hono } from "hono";
import {
  MethodNotAllowedError,
  NotFoundError,
  getAssetFromKV,
  serveSinglePageApp,
} from "@cloudflare/kv-asset-handler";
import { SSRRender } from "src/entry-server";
import assetManifest from "__STATIC_CONTENT_MANIFEST";
import { cache } from "hono/cache";
import { env } from 'hono/adapter'
import { fetchPosts } from "@app/model/posts";


type Bindings = {
  __STATIC_CONTENT: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

app
  .get(
    "*",
    cache({
      cacheName: "route cache",
      cacheControl: "max-age=3600",
    })
  )
  .get("/api/posts", async (c) => {
    return c.json(await fetchPosts());
  })
  .get("/assets/*", async (c) => {
    try {
      return await getAssetFromKV(
        {
          request: c.req.raw,
          waitUntil: async (p) => c.executionCtx.waitUntil(p),
        },
        {
          ASSET_NAMESPACE: c.env.__STATIC_CONTENT,
          ASSET_MANIFEST: assetManifest,
          defaultETag: "strong",
          mapRequestToAsset: serveSinglePageApp,
          cacheControl: {
            browserTTL: undefined,
            edgeTTL: 2 * 60 * 60 * 24,
            bypassCache: true,
          },
        }
      );
    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new Error(e.message);
      } else if (e instanceof MethodNotAllowedError) {
        throw new Error(e.message);
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  })
  .get("*", async (c) => {
    const { API_ROOT, CF_PAGES_URL } = env<{ API_ROOT: string, CF_PAGES_URL: string }>(c)
    console.log(`\n\n@@@@@@@@@@ ${API_ROOT}, ${CF_PAGES_URL}`)

    return c.newResponse(await SSRRender())
  })
  .notFound((c) =>
    c.json(
      {
        message: "Not Found",
        ok: false,
      },
      404
    )
  )
  .onError((err, c) =>
    c.json(
      {
        name: err.name,
        message: err.message,
      },
      500
    )
  );

export default app;

//
// END
//
