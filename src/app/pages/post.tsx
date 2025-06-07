import type { RequestInfo } from "rwsdk/worker";
import * as v from "valibot";
import { getPost, postParamsSchema } from "../helpers/post";

export function Post({ params }: RequestInfo) {
  const validParams = v.parse(postParamsSchema, params);
  const post = getPost(validParams.slug);

  if (!post) {
    return new Response("Post not found", {
      status: 404,
    });
  }

  return <post.Content />;
}
