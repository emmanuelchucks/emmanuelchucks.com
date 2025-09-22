import { requestInfo } from "rwsdk/worker";
import { incrementViewsCount } from "../utils/post";

export function Post(): React.JSX.Element {
  const MDXContent = requestInfo.ctx.post.mdxContent;
  void incrementViewsCount(requestInfo.ctx.post.id);

  return <MDXContent />;
}
