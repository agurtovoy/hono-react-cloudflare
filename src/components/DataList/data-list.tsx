//
// BEGIN
//

// import { usePosts } from "@app/hooks/usePosts";
import { type Data } from "@app/model/posts";
import { Fragment } from "react";

// function DataList({ posts: prefetchedPosts } : { posts?: Data[] }) {
//   const posts = usePosts();
//   console.log('@@@DataList', { posts, prefetchedPosts });
//   return (
//     <Fragment>
//       <h2>Post</h2>
//       {posts.status === "pending" && !prefetchedPosts ? (
//         "Data is fetching..."
//       ) : posts.status === "success" || prefetchedPosts? (
//         <ul>
//           {(posts.data ?? prefetchedPosts ?? []).map((item) => (
//             <li>{item.title}</li>
//           ))}
//         </ul>
//       ) : null}
//     </Fragment>
//   );
// }

function DataList({ posts: prefetchedPosts } : { posts?: Data[] }) {
  return (
    <Fragment>
      <h2>Posts? Posts!</h2>
        <ul>
          {(prefetchedPosts ?? []).map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
    </Fragment>
  );
}

export default DataList;

//
// END
//
