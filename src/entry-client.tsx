//
// BEGIN
//

import React from "react";
import ReactDOM from "react-dom/client";
import Application from "@app/app";

import { SSR_DATA_KEY, type SSRData } from "./lib/hydration";

function Client() {
  const data = (window as typeof window & { [SSR_DATA_KEY]: SSRData })[SSR_DATA_KEY];

  return (
    <React.StrictMode>
      <Application posts={data?.posts} />
    </React.StrictMode>
  );
}

ReactDOM.hydrateRoot(document!, <Client />);

//
// END
//
