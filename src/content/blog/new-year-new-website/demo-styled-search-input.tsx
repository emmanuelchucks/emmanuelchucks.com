import { For, Show, createSignal } from "solid-js"

export function StyledSearchInput() {
	const [searchQuery, setSearchQuery] = createSignal("")
	const names = ["The Primeagen", "TJ DeVries", "Yusuke Wada"]
	const filteredNames = () =>
		names.filter((name) =>
			name.toLowerCase().includes(searchQuery().toLowerCase()),
		)

	return (
		<div class="grid h-72 content-center">
			<form
				aria-labelledby="name-search-query"
				onSubmit={(e) => {
					e.preventDefault()
				}}
			>
				<label for="name-search-query" class="sr-only">
					Search names
				</label>
				<input
					name="q"
					id="name-search-query"
					type="search"
					placeholder="Search names"
					onInput={(e) => {
						setSearchQuery(e.currentTarget.value)
					}}
					class="w-full rounded-md bg-neutral-50 px-4 py-2 placeholder:text-neutral-400 dark:bg-neutral-800 dark:placeholder:text-neutral-600 [&::-webkit-search-cancel-button]:ms-4"
				/>
				<noscript>
					<p class="prose prose-neutral mt-2 text-sm text-neutral-600 dark:prose-invert dark:text-neutral-400">
						Press
						<kbd class="mx-1 bg-neutral-100 dark:bg-neutral-900">Enter</kbd>
						to search
					</p>
				</noscript>
			</form>
			<section
				aria-live="polite"
				aria-labelledby="name-search-results"
				class="min-h-32"
			>
				<h3 id="name-search-results" class="sr-only">
					{searchQuery() ? `Results for ${searchQuery()}` : "All names"}
				</h3>
				<Show when={filteredNames().length} fallback={<p>No results</p>}>
					<ul>
						<For each={filteredNames()}>{(name) => <li>{name}</li>}</For>
					</ul>
				</Show>
			</section>
		</div>
	)
}
