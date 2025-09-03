//
// BEGIN
//

export type Data = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export async function fetchPosts(baseUrl: string = "/") {
  const url = `${baseUrl}api/posts`;
  const response = await fetch(url);
  const result: Data[] = await response.json();
  return result;
}

//
// END
//
