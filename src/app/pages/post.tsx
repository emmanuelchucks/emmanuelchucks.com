import { requestInfo } from "rwsdk/worker";
import { incrementViewsCount } from "../helpers/post";

export function PostPage() {
  const MDXContent = requestInfo.ctx.post.mdxContent;
  void incrementViewsCount(requestInfo.ctx.post.id);

  return <MDXContent />;
}
