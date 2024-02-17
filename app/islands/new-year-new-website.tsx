import { useState } from "hono/jsx"

const names = ["The Primeagen", "TJ DeVries", "Yusuke Wada"]

const searchQueryId = "search-query-" + Math.random().toString().substring(2)
const searchResultsId =
	"search-results-" + Math.random().toString().substring(2)

export async function StyledSearchInput() {
	const [searchQuery, setSearchQuery] = useState("")
	const filteredNames = names.filter((name) =>
		name.toLowerCase().includes(searchQuery.toLowerCase()),
	)

	return (
		<div class="grid h-72 content-center">
			<form
				aria-labelledby={searchQueryId}
				onSubmit={(e) => {
					e.preventDefault()
				}}
			>
				<label for={searchQueryId} class="sr-only">
					Search names
				</label>
				<input
					name="q"
					id={searchQueryId}
					type="search"
					placeholder="Search names"
					onInput={(event) => {
						setSearchQuery((event.currentTarget as HTMLInputElement).value)
					}}
					class="w-full rounded-md bg-neutral-50 px-4 py-2 placeholder:text-neutral-400 dark:bg-neutral-800 dark:placeholder:text-neutral-600 [&::-webkit-search-cancel-button]:ms-4"
				/>
				<noscript>
					<p class="prose prose-neutral dark:prose-invert mt-2 text-sm text-neutral-600 dark:text-neutral-400">
						Press
						<kbd class="mx-1 bg-neutral-100 dark:bg-neutral-900">Enter</kbd>
						to search
					</p>
				</noscript>
			</form>
			<section
				aria-live="polite"
				aria-labelledby={searchResultsId}
				class="min-h-32"
			>
				<h3 id={searchResultsId} class="sr-only">
					{searchQuery ? `Results for ${searchQuery}` : "All names"}
				</h3>
				{filteredNames.length ? (
					<ul>
						{filteredNames.map(async (name) => (
							<li>{name}</li>
						))}
					</ul>
				) : (
					<p>No results</p>
				)}
			</section>
		</div>
	)
}
