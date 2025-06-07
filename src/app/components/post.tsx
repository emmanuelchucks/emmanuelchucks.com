import type { Post } from "../helpers/post";
import { env } from "cloudflare:workers";
import clsx from "clsx";
import { format } from "date-fns";

async function getFormattedViewsCount(id: string) {
  const viewsCount = Number((await env.VIEWS_COUNTER.get(id)) ?? 2);
  return new Intl.NumberFormat().format(viewsCount);
}

export function PostMeta({ post }: { post: Post }) {
  return (
    <p
      className={clsx(
        "text-sm font-semibold",
        "flex flex-row gap-x-4",
        "text-neutral-600 dark:text-neutral-400",
      )}
    >
      <time dateTime={post.publishedAt} className="sm:hidden">
        {format(post.publishedAt, "EE, MMMM d, yyyy")}
      </time>
      <time dateTime={post.publishedAt} className="hidden sm:block">
        {format(post.publishedAt, "EEEE, MMMM d, yyyy")}
      </time>
      <span>{post.readingTime}</span>
      <span>{getFormattedViewsCount(post.id)} views</span>
    </p>
  );
}
