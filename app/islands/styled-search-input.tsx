import { useState } from "hono/jsx"
import { SearchInput } from "../../components/search-input"

const names = ["The Primeagen", "TJ DeVries", "Yusuke Wada"]

/* eslint-disable-next-line @typescript-eslint/promise-function-async */
export default function StyledSearchInput() {
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
						if (!(e.currentTarget instanceof HTMLInputElement)) return
						setSearchQuery(e.currentTarget.value)
					}}
				/>
			</form>
			<section aria-live="polite" class="min-h-32">
				<h3 class="sr-only">
					{searchQuery ? `Results for ${searchQuery}` : "All names"}
				</h3>
				{filteredNames.length ? (
					<ul>
						{/* eslint-disable-next-line @typescript-eslint/promise-function-async */}
						{filteredNames.map((name) => (
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