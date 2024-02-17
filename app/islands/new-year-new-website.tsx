import { useState } from "hono/jsx"
import { SearchInput } from "../../components/search-input"

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
				<SearchInput
					name="q"
					id={searchQueryId}
					type="search"
					placeholder="Search names"
					onInput={(e) => {
						setSearchQuery((e.currentTarget as HTMLInputElement).value)
					}}
				/>
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
