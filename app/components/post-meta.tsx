import { format } from "date-fns";
import { cx } from "hono/css";
import type { Post } from "~/helpers/posts";
import { getFormattedViewsCount } from "~/helpers/views";

export function PostMeta({ post }: { post: Post }) {
	return (
		<p
			class={cx(
				"text-sm font-semibold",
				"flex flex-row gap-x-4",
				"text-neutral-600 dark:text-neutral-400",
			)}
		>
			<time datetime={post.publishedAt} class="sm:hidden">
				{format(post.publishedAt, "EE, MMMM d, yyyy")}
			</time>
			<time datetime={post.publishedAt} class="hidden sm:block">
				{format(post.publishedAt, "EEEE, MMMM d, yyyy")}
			</time>
			<span>{post.readingTime}</span>
			<span>{getFormattedViewsCount(post.id)} views</span>
		</p>
	);
}
