import { cx } from "hono/css"
import { Input } from "./primitives"

export async function SearchInput(
	props: JSX.IntrinsicElements["input"] & {
		label: string
	},
) {
	return (
		<>
			<label for={props.id} class="sr-only">
				{props.label}
			</label>
			<Input {...props} />
			<noscript>
				<p
					class={cx(
						"prose prose-neutral mt-2 text-sm text-neutral-600",
						"dark:prose-invert dark:text-neutral-400",
					)}
				>
					Press
					<kbd class={cx("mx-1 bg-neutral-100", "dark:bg-neutral-900")}>
						Enter
					</kbd>
					to search
				</p>
			</noscript>
		</>
	)
}
