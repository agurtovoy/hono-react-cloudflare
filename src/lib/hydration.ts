
import { type Data } from "@app/model/posts";

export const SSR_DATA_KEY = '__HONO_SSR_DATA__'

export type SSRData = {
  posts: Data[]
}
