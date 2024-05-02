import { format } from "date-fns";
import { cx } from "hono/css";
import { createRoute } from "honox/factory";
import { A } from "~/components/primitives";
import { getPosts } from "~/helpers/posts";
import DarkModeSwitcher from "~/islands/dark-mode-switcher";
import StyledSearchInput from "~/islands/styled-search-input";

export default createRoute(async (c) => {
	const posts = getPosts();
	const post = posts.find((post) => c.req.param("href").endsWith(post.id));

	if (!post) {
		return c.notFound();
	}

	const viewsCount = Number((await c.env.VIEWS_COUNTER.get(post.id)) ?? 2);
	void c.env.VIEWS_COUNTER.put(post.id, String(viewsCount + 1));

	const formattedViewsCount = new Intl.NumberFormat().format(viewsCount);

	return c.render(
		<main
			class={cx(
				"prose prose-neutral min-w-0",
				"dark:prose-invert",
				"prose-p:text-pretty",
				"prose-pre:bg-white prose-pre:outline-none prose-pre:ring-neutral-700",
				"prose-pre:dark:!bg-neutral-900 prose-pre:dark:!ring-neutral-300",
				"prose-h1:text-balance prose-h2:text-balance prose-h3:text-balance",
				"[&_.shiki_span]:dark:!text-[--shiki-dark]",
				"focus-visible:prose-pre:ring-2",
			)}
		>
			<article>
				<div
					class={cx(
						"not-prose flex flex-row gap-x-2 text-sm text-neutral-600",
						"dark:text-neutral-400",
						"sm:text-base",
					)}
				>
					<time datetime={post.publishedAt} class="font-medium">
						{format(post.publishedAt, "EEEE, MMMM d, yyyy")}
					</time>
					<span aria-hidden="true">{" · "}</span>
					<p>{post.readingTime}</p>
					<span aria-hidden="true">{" · "}</span>
					<p>{formattedViewsCount} views</p>
				</div>
				<post.Content
					components={{
						a: A,
						StyledSearchInput,
						DarkModeSwitcher,
					}}
				/>
			</article>
		</main>,
		{
			title: `${post.title} - Emmanuel Chucks`,
			description: post.description,
		},
	);
});
