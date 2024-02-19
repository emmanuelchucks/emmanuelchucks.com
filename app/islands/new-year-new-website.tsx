import { useState } from "hono/jsx"
import { SearchInput } from "../../components/search-input"

const names = ["The Primeagen", "TJ DeVries", "Yusuke Wada"]

export async function StyledSearchInput() {
	const [searchQuery, setSearchQuery] = useState("")
	const filteredNames = names.filter((name) =>
		name.toLowerCase().includes(searchQuery.toLowerCase()),
	)

	return (
		<div class="grid h-72 content-center">
			<form
				onSubmit={(e) => {
					e.preventDefault()
				}}
			>
				<legend class="sr-only">Search names of prolific programmers</legend>
				<SearchInput
					label="Search names"
					id="search-names"
					name="q"
					type="search"
					placeholder="Search names"
					onInput={(e) => {
						setSearchQuery((e.currentTarget as HTMLInputElement).value)
					}}
				/>
			</form>
			<section aria-live="polite" class="min-h-32">
				<h3 class="sr-only">
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
