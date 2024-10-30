import { cx } from "hono/css";
import { createRoute } from "honox/factory";
import { A } from "~/components/a";
import { PostMeta } from "~/components/post-meta";
import { getPost } from "~/helpers/posts";
import DarkModeSwitcher from "~/islands/$dark-mode-switcher";
import StyledSearchInput from "~/islands/$styled-search-input";

export default createRoute((c) => {
	const post = getPost(c.req.param("href"));

	if (!post) {
		return c.notFound();
	}

	return c.render(
		<main
			class={cx(
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
