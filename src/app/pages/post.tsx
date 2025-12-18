import { incrementViewsCount } from "#utils/post";
import { requestInfo } from "rwsdk/worker";

export function PostPage() {
  const MDXContent = requestInfo.ctx.post.mdxContent;
  void incrementViewsCount(requestInfo.ctx.post.id);

  return <MDXContent />;
}
