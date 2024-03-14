import { cx } from "hono/css"
import { createRoute } from "honox/factory"
import { A } from "../../../components/primitives"
import { getPosts } from "../../../helpers/posts"

const islands = import.meta.glob<{
	default: () => JSX.Element
}>("/app/islands/*.tsx", {
	eager: true,
})

const islandComponents = Object.fromEntries(
	Object.values(islands).map((island) => [
		island.default.name.replace("Wrapped", ""),
		island.default,
	]),
)

export default createRoute(async (c) => {
	const posts = getPosts()
	const post = posts.find((post) => c.req.param("href").endsWith(post.id))

	if (!post) {
		return c.notFound()
	}

	return c.render(
		<main>
			<article
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
				<post.Content
					components={{
						a: A,
						...islandComponents,
					}}
				/>
			</article>
		</main>,
		{
			title: `${post.title} - Emmanuel Chucks`,
			description: post.description,
		},
	)
})
