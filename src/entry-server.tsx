//
// BEGIN
//

import Application from "@app/app";
import { fetchPosts } from "@app/model/posts";
import * as ReactDOMServer from "react-dom/server";

export async function SSRRender() {
  console.log('\n\n@@@@@@@@@@ SSRRender 3')
  const posts = await fetchPosts();

  return await ReactDOMServer.renderToReadableStream(<Application posts={posts} />, {
    bootstrapModules: ["/assets/main.js"],
  });
}

//
// END
//
