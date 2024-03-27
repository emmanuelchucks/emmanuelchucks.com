import { format } from "date-fns"
import { cx } from "hono/css"
import { createRoute } from "honox/factory"
import { A, Button, Input } from "~/components/primitives"
import { getPosts } from "~/helpers/posts"

export default createRoute(async (c) => {
	const q = c.req.query("q")
	const posts = getPosts(q)

	const viewsCountList = await c.env.VIEWS_COUNTER.list()
	const viewsCountPromiseResults = await Promise.allSettled(
		viewsCountList.keys.map(async (key) => [
			key.name,
			Number((await c.env.VIEWS_COUNTER.get(key.name)) ?? 2),
		]),
	)

	const formattedViewsCountMap = Object.fromEntries(
		viewsCountPromiseResults
			.filter(
				(result): result is PromiseFulfilledResult<[string, number]> =>
					result.status === "fulfilled",
			)
			.map((result) => [
				result.value[0],
				new Intl.NumberFormat().format(result.value[1]),
			]),
	)

	return c.render(
		<main>
			<form
				action={c.req.path}
				aria-labelledby="serach-posts-legend"
				class="grid grid-cols-[1fr_auto] gap-x-2"
			>
				<fieldset>
					<legend id="serach-posts-legend" class="sr-only">
						Search posts by title or description
					</legend>
					<label for="serach-posts" class="sr-only">
						Search posts
					</label>
					<Input
						name="q"
						id="serach-posts"
						type="search"
						placeholder="Search posts"
						value={q}
					/>
				</fieldset>
				<Button
					type="submit"
					class="rounded-md bg-neutral-100 px-4 py-2 dark:bg-neutral-900"
				>
					Search
				</Button>
			</form>
			<section
				aria-labelledby="search-posts-result-heading"
				aria-live="polite"
				class="mt-8"
			>
				<h1 id="search-posts-result-heading" class="sr-only">
					{q ? `Search results for '${q}'` : "All posts"}
				</h1>
				{posts.length ? (
					posts.map(
						(post): JSX.Element => (
							<div
								class={cx(
									"grid justify-between gap-y-1",
									"sm:grid-cols-[0.5fr_24em]",
									"md:grid-cols-[0.5fr_28em]",
								)}
							>
								<div
									class={cx(
										"flex flex-row gap-x-2 text-sm text-neutral-600",
										"dark:text-neutral-400",
										"sm:row-span-2 sm:flex-col sm:items-end",
									)}
								>
									<time
										datetime={post.publishedAt}
										class={cx(
											"font-medium",
											"sm:text-base sm:text-neutral-700 sm:dark:text-neutral-300",
										)}
									>
										{format(post.publishedAt, "MMM d, yyyy")}
									</time>
									<span aria-hidden="true" class="sm:hidden">
										{" · "}
									</span>
									<p>{post.readingTime}</p>
									<span aria-hidden="true" class="sm:hidden">
										{" · "}
									</span>
									<p>{formattedViewsCountMap[post.id]} views</p>
								</div>
								<h2 class={cx("text-2xl font-semibold")}>
									<A href={post.href}>{post.title}</A>
								</h2>
								<p
									class={cx(
										"mt-1 line-clamp-3 text-neutral-700",
										"dark:text-neutral-300",
										"sm:col-start-2",
									)}
								>
									{post.description}
								</p>
							</div>
						),
					)
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
