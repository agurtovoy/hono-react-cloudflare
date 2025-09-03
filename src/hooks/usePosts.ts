//
// BEGIN
//

import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../model/posts";

export function usePosts() {
  return useQuery({
    queryKey: ["data"],
    queryFn: async () => fetchPosts(),
  });
}

//
// END
//
