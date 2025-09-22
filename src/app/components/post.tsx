import type { Post } from "content-collections";
import { format } from "date-fns";
import { getFormattedViewsCount } from "../utils/post";

interface PostMetaProps {
  post: Post;
}

export function PostMeta({ post }: PostMetaProps): React.JSX.Element {
  return (
    <p
      className={`flex flex-row gap-x-4 text-sm font-semibold text-neutral-600 dark:text-neutral-400`}
    >
      <time dateTime={post.publishedAt.toISOString()} className="sm:hidden">
        {format(post.publishedAt, "EE, MMMM d, yyyy")}
      </time>
      <time
        dateTime={post.publishedAt.toISOString()}
        className={`hidden sm:block`}
      >
        {format(post.publishedAt, "EEEE, MMMM d, yyyy")}
      </time>
      <span>{post.readingTime}</span>
      <span>{getFormattedViewsCount(post.id)} views</span>
    </p>
  );
}
