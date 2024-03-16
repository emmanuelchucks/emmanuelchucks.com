import { cx } from "hono/css"
import { createRoute } from "honox/factory"
import { A } from "../../../components/primitives"
import { SearchInput } from "../../../components/search-input"
import { getPosts } from "../../../helpers/posts"

export default createRoute(async (c) => {
	const q = c.req.query("q")
	const posts = getPosts(q)

	return c.render(
		<main>
			<form>
				<fieldset>
					<legend class="sr-only">Search posts by title or description</legend>
					<SearchInput
						label="Search posts"
						name="q"
						id="serach-posts"
						type="search"
						placeholder="Search posts"
						value={q}
					/>
				</fieldset>
			</form>
			<section aria-live="polite" class="mt-8">
				<h1 class="sr-only">{q ? `Search results for ${q}` : "All posts"}</h1>
				{posts.length ? (
					posts.map(async (post) => (
						<div
							class={cx(
								"grid grid-cols-[auto_1fr] justify-between gap-x-1 gap-y-1",
								"sm:grid-flow-col sm:grid-cols-[auto_24em] sm:grid-rows-[auto_1fr]",
								"md:grid-cols-[auto_26em]",
							)}
						>
							<time datetime={post.publishedAt} class="self-end font-medium">
								{post.publishedAt}
							</time>
							<p
								class={cx(
									"self-center text-sm text-neutral-700",
									"sm:self-auto sm:text-end",
									"dark:text-neutral-300",
								)}
							>
								<span aria-hidden="true" class="sm:hidden">
									{" - "}
								</span>
								{post.readingTime}
							</p>
							<h2
								class={cx(
									"col-span-full text-2xl font-semibold",
									"sm:col-span-1",
								)}
							>
								<A href={post.href}>{post.title}</A>
							</h2>
							<p
								class={cx(
									"col-span-full mt-1 line-clamp-3 text-neutral-700",
									"dark:text-neutral-300",
									"sm:col-span-1",
								)}
							>
								{post.description}
							</p>
						</div>
					))
				) : (
					<p class={cx("text-neutral-600", "dark:text-neutral-400")}>
						No posts found
					</p>
				)}
			</section>
		</main>,
		{
			title: "Blog - Emmanuel Chucks",
			description:
				"Writing about all things tech and design related, sharing everything I learn on my engineering journey.",
		},
	)
})
