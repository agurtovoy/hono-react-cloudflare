//
// BEGIN
//

import Application from "@app/app";
import { fetchPosts } from "@app/model/posts";
import * as ReactDOMServer from "react-dom/server";

export async function SSRRender({API_ROOT}: {API_ROOT: string}) {
  console.log('\n\n@@@@@@@@@@ SSRRender\n\n')
  let posts = undefined;
  try {
    posts = await fetchPosts(API_ROOT);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return await ReactDOMServer.renderToReadableStream(<Application posts={posts} />, {
    bootstrapModules: ["/assets/main.js"],
  });
}

//
// END
//
