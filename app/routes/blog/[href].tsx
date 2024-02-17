import { cx } from "hono/css"
import { createRoute } from "honox/factory"
import { getPosts } from "../../../helpers/posts"

export default createRoute(async (c) => {
	const posts = getPosts()
	const post = posts.find((post) => c.req.param("href").endsWith(post.id))

	if (!post) {
		return c.notFound()
	}

	return c.render(
		<article
			class={cx(
				"prose prose-neutral min-w-0",
				"dark:prose-invert",
				"prose-pre:bg-white prose-pre:dark:bg-neutral-900",
				"[&_.shiki_span]:dark:!text-[--shiki-dark]",
			)}
		>
			<post.Content />
		</article>,
		{
			title: `${post.title} - Emmanuel Chucks`,
			description: post.description,
		},
	)
})
