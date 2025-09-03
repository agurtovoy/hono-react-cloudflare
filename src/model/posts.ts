//
// BEGIN
//

export type Data = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export async function fetchPosts() {
  const url = `https://jsonplaceholder.typicode.com/posts`;
  const response = await fetch(url);
  if (!response.ok) {
    const errorText = await response.text();
    const { status } = response;
    const msg = `Fetch to ${url} failed with status ${status}, body ${errorText}`;
    console.error(msg);
    throw new Error(msg);
  }

  const result: Data[] = await response.json();
  return result;
}

//
// END
//
