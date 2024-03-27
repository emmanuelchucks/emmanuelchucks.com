import { cx } from "hono/css"
import { useState } from "hono/jsx"
import { Button, Input } from "~/components/primitives"

const names = ["The Primeagen", "TJ DeVries", "Yusuke Wada"]

export default function StyledSearchInput(): JSX.Element {
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
				action="#"
				aria-labelledby="search-names-legend"
				class="grid grid-cols-[1fr_auto] gap-x-2"
				onSubmit={(e) => {
					e.preventDefault()
				}}
			>
				<fieldset>
					<legend id="search-names-legend" class="sr-only">
						Search names of prolific programmers
					</legend>
					<label for="search-names" class="sr-only">
						Search names
					</label>
					<Input
						id="search-names"
						name="q"
						type="search"
						placeholder="Search names"
						class="bg-neutral-50"
						onInput={(e) => {
							if (e.currentTarget instanceof HTMLInputElement) {
								setSearchQuery(e.currentTarget.value)
							}
						}}
					/>
				</fieldset>
				<Button
					type="submit"
					class="rounded-md bg-neutral-100 px-4 py-2 dark:bg-neutral-700"
				>
					Search
				</Button>
			</form>
			<section
				aria-labelledby="search-names-results-heading"
				aria-live="polite"
				class="min-h-32"
			>
				<h3 id="search-names-results-heading" class="sr-only">
					{searchQuery ? `Results for '${searchQuery}'` : "All names"}
				</h3>
				{filteredNames.length ? (
					<ul>
						{filteredNames.map(
							(name): JSX.Element => (
								<li>{name}</li>
							),
						)}
					</ul>
				) : (
					<p>No results</p>
				)}
			</section>
		</div>
	)
}
