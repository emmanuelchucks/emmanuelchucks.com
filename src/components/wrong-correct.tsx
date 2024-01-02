import type { JSX } from "solid-js"

export function Wrong(props: { children: JSX.Element }) {
	return (
		<section>
			<h3>❌ Wrong</h3>
			{props.children}
		</section>
	)
}

export function Correct(props: { children: JSX.Element }) {
	return (
		<section>
			<h3>✅ Correct</h3>
			{props.children}
		</section>
	)
}
