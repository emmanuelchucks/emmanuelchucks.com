import { cx } from "hono/css";
import { createRoute } from "honox/factory";
import { DockedWindows } from "~/components/$docked-windows";
import { A } from "~/components/a";
import { PostMeta } from "~/components/post-meta";
import { getPost } from "~/helpers/posts";
import { SOCIALS } from "~/helpers/socials";

export default createRoute(async (c) => {
	const post = getPost(c.req.param("slug"));

	if (!post) {
		return c.notFound();
	}

	const viewsCount = Number((await c.env.VIEWS_COUNTER.get(post.id)) ?? 2);
	c.env.VIEWS_COUNTER.put(post.id, String(viewsCount + 1));

	return c.render(
		<>
			<main
				class={cx(
					"mt-24",
					"prose prose-neutral dark:prose-invert",
					"prose-p:text-pretty",
					"prose-pre:bg-white prose-pre:dark:!bg-neutral-900",
					"prose-pre:outline-neutral-700 prose-pre:dark:outline-neutral-300",
					"prose-h1:text-balance prose-h2:text-balance prose-h3:text-balance",
					"[&_.shiki_span]:dark:!text-[var(--shiki-dark)]",
				)}
			>
				<article>
					<PostMeta post={post} />
					<post.Content />
					<footer class="mt-16">
						<A href={SOCIALS[1].href}>
							<span aria-hidden>→ </span>@emmanuelchucks
						</A>
					</footer>
				</article>
			</main>
			<DockedWindows />
		</>,
		{
			title: `${post.title} - Emmanuel Chucks`,
			description: post.description,
		},
	);
});
