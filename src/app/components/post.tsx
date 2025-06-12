import type { Post } from "content-collections";
import clsx from "clsx";
import { format } from "date-fns";
import { getFormattedViewsCount } from "../helpers/post";

interface PostMetaProps {
  post: Post;
}

export function PostMeta({ post }: PostMetaProps) {
  return (
    <p
      className={clsx(
        "text-sm font-semibold",
        "flex flex-row gap-x-4",
        "text-neutral-600 dark:text-neutral-400",
      )}
    >
      <time dateTime={post.publishedAt.toISOString()} className="sm:hidden">
        {format(post.publishedAt, "EE, MMMM d, yyyy")}
      </time>
      <time
        dateTime={post.publishedAt.toISOString()}
        className="hidden sm:block"
      >
        {format(post.publishedAt, "EEEE, MMMM d, yyyy")}
      </time>
      <span>{post.readingTime}</span>
      <span>{getFormattedViewsCount(post.id)} views</span>
    </p>
  );
}
