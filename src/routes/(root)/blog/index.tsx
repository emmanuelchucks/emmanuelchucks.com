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
		<div class="grid gap-y-16">
			<form action={handleSearchPosts} method="post">
				<label for="q" class="sr-only">
					Search
				</label>
				<input
					id="q"
					name="q"
					type="search"
					onInput={(e) => {
						setSearchParams({ q: e.currentTarget.value })
					}}
					class="w-full rounded-md bg-neutral-100 px-2 py-1 text-lg dark:bg-neutral-900"
				/>
			</form>
			<For each={posts()}>
				{(post) => <a href={post.frontmatter.slug}>{post.frontmatter.title}</a>}
			</For>
		</div>
	)
}
