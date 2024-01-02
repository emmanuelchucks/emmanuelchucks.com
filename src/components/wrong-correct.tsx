import type { JSX } from "solid-js"

export function Wrong(props: { children: JSX.Element }) {
	return (
		<section>
			<h3>
				<span aria-hidden>❌</span> Wrong
			</h3>
			{props.children}
		</section>
	)
}

export function Correct(props: { children: JSX.Element }) {
	return (
		<section>
			<h3>
				<span aria-hidden>✅</span> Correct
			</h3>
			{props.children}
		</section>
	)
}
