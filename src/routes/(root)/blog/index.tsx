import { Meta, Title } from "@solidjs/meta"
import { useSearchParams } from "@solidjs/router"
import { For } from "solid-js"
import { formatDate, getPostsByQuery, handleSearchPosts } from "~/lib/posts"

export default function Blog() {
	const [searchParams, setSearchParams] = useSearchParams()
	const posts = () => getPostsByQuery(searchParams.q)

	return (
		<>
			<Title>Blog - Emmanuel Chucks</Title>
			<Meta
				name="description"
				content="Writing about all things tech and design related, sharing everything I learn on my engineering journey."
			/>
			<main class="grid gap-y-10">
				<form action={handleSearchPosts} method="post">
					<label for="query" class="sr-only">
						Search posts
					</label>
					<input
						name="q"
						id="query"
						type="search"
						placeholder="Search posts"
						onInput={(e) => {
							setSearchParams({ q: e.currentTarget.value })
						}}
						class="w-full rounded-md bg-neutral-100 px-4 py-2 placeholder:text-neutral-400 dark:bg-neutral-900 dark:placeholder:text-neutral-600 [&::-webkit-search-cancel-button]:ms-4"
					/>
					<noscript>
						<p class="prose prose-neutral mt-2 text-sm text-neutral-600 dark:prose-invert dark:text-neutral-400">
							Press
							<kbd class="mx-1 bg-neutral-100 dark:bg-neutral-900">Enter</kbd>
							to search
						</p>
					</noscript>
				</form>
				<section aria-live="polite">
					<h1 class="sr-only">
						{searchParams.q
							? `Search results for ${searchParams.q}`
							: "All posts"}
					</h1>
					<For each={posts()}>
						{(post) => (
							<div class="grid gap-y-2 sm:grid-cols-[auto_40ch] md:grid-cols-[auto_45ch]">
								<time
									datetime={post.frontmatter.publishedAt}
									class="text-sm text-neutral-600 dark:text-neutral-400"
								>
									{formatDate(post.frontmatter.publishedAt, "short")}
								</time>
								<div class="mx-4 grid gap-y-2 sm:mx-auto">
									<h2 class="text-2xl font-semibold">
										<a
											href={post.frontmatter.url}
											class="underline decoration-2 underline-offset-2"
										>
											{post.frontmatter.title}
										</a>
									</h2>
									<p class="line-clamp-3 text-neutral-700 dark:text-neutral-300">
										{post.frontmatter.description}
									</p>
								</div>
							</div>
						)}
					</For>
				</section>
			</main>
		</>
	)
}
