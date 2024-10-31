import { cx } from "hono/css";
import type { Post } from "~/helpers/posts";
import { A } from "./a";
import { PostMeta } from "./post-meta";

export function PostCard({ key, post }: { key: string; post: Post }) {
	return (
		<div key={key} class="grid gap-y-3">
			<h2 class="text-3xl font-semibold">
				<A href={post.href}>{post.title}</A>
			</h2>

			<PostMeta post={post} />

			<p class={cx("line-clamp-3", "text-neutral-700 dark:text-neutral-300")}>
				{post.description}
			</p>
		</div>
	);
}
