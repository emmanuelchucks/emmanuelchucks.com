import { requestInfo } from "rwsdk/worker";
import * as v from "valibot";
import {
  getPost,
  incrementViewsCount,
  postParamsSchema,
} from "../helpers/post";

export function PostPage() {
  const validParams = v.parse(postParamsSchema, requestInfo.params);
  const post = getPost(validParams.slug);

  if (!post) {
    return new Response("Post not found", {
      status: 404,
    });
  }

  const MDXContent = post.mdxContent;
  void incrementViewsCount(post.id);

  return <MDXContent />;
}
