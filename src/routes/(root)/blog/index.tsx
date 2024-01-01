import {
	createAsync,
	useSearchParams,
	type RouteDefinition,
} from "@solidjs/router"
import { For } from "solid-js"
import { getPostsByQuery, handleSearchPosts } from "~/lib/posts"

export const route = {
	load({ params }) {
		void getPostsByQuery(params.q)
	},
} satisfies RouteDefinition

export default function Blog() {
	const [searchParams, setSearchParams] = useSearchParams()
	const posts = createAsync(async () => getPostsByQuery(searchParams.q))

	return (
		<div class="grid gap-y-10">
			<form action={handleSearchPosts} method="post">
				<label for="query" class="sr-only">
					Search
				</label>
				<input
					name="q"
					id="query"
					type="search"
					placeholder="Search posts"
					onInput={(e) => {
						setSearchParams({ q: e.currentTarget.value })
					}}
					class="w-full rounded-md bg-neutral-100 px-4 py-2 placeholder:text-neutral-400 dark:bg-neutral-900 dark:placeholder:text-neutral-600"
				/>
				<noscript>
					<p class="mt-2 text-sm text-neutral-500">
						Press
						<kbd class="mx-1 rounded bg-neutral-100 px-2 py-1 dark:bg-neutral-900">
							Enter
						</kbd>
						to search
					</p>
				</noscript>
			</form>
			<For each={posts()}>
				{(post) => <a href={post.frontmatter.slug}>{post.frontmatter.title}</a>}
			</For>
		</div>
	)
}
