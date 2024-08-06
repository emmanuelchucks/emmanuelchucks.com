import { cx } from "hono/css";
import { useState } from "hono/jsx";
import { Button } from "~/components/button";
import { Input } from "~/components/input";

const names = ["The Primeagen", "TJ DeVries", "Yusuke Wada"];

export default function StyledSearchInput() {
	const [searchQuery, setSearchQuery] = useState("");
	const filteredNames = names.filter((name) =>
		name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<search
			class={cx(
				"mx-auto",
				"grid content-center",
				"max-w-xs min-h-64 sm:max-w-md sm:min-h-72 md:max-w-lg",
			)}
		>
			<form
				action="#"
				class="grid grid-cols-[1fr_auto] gap-x-2"
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<fieldset>
					<legend class="sr-only">Search names of prolific programmers</legend>

					<label>
						<span class="sr-only">Search names</span>

						<Input
							name="q"
							type="search"
							placeholder="Search names"
							class="bg-neutral-50"
							onInput={(e) => {
								if (e.currentTarget instanceof HTMLInputElement) {
									setSearchQuery(e.currentTarget.value);
								}
							}}
						/>
					</label>
				</fieldset>

				<Button
					type="submit"
					class={cx(
						"rounded-md",
						"px-4 py-2",
						"bg-neutral-100 dark:bg-neutral-700",
					)}
				>
					Search
				</Button>
			</form>

			<section aria-live="polite" class="min-h-32">
				<h3 class="sr-only">
					{searchQuery ? `Results for '${searchQuery}'` : "All names"}
				</h3>

				{filteredNames.length ? (
					<ul>
						{filteredNames.map((name) => (
							<li key={name}>{name}</li>
						))}
					</ul>
				) : (
					<output>No results found</output>
				)}
			</section>
		</search>
	);
}
