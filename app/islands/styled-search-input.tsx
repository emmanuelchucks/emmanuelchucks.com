import { cx } from "hono/css"
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
		<div
			class={cx(
				"mx-auto grid min-h-64 max-w-xs content-center",
				"sm:min-h-72 sm:max-w-md",
				"md:max-w-lg",
			)}
		>
			<form
				onSubmit={(e) => {
					e.preventDefault()
				}}
			>
				<fieldset>
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
				</fieldset>
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
