import type { JSX } from "solid-js"
import { createUniqueId } from "solid-js"

export function Wrong(props: { heading: string; children: JSX.Element }) {
	const id = createUniqueId()
	return (
		<section aria-labelledby={id}>
			<h3 id={id}>
				<span aria-hidden="true">❌</span> Wrong
				<span class="sr-only"> version for {props.heading}</span>
			</h3>
			{props.children}
		</section>
	)
}

export function Correct(props: { heading: string; children: JSX.Element }) {
	const id = createUniqueId()
	return (
		<section aria-labelledby={id}>
			<h3 id={id}>
				<span aria-hidden="true">✅</span> Correct
				<span class="sr-only"> version for {props.heading}</span>
			</h3>
			{props.children}
		</section>
	)
}
