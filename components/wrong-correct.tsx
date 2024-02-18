export async function Wrong(props: { heading: string; children: JSX.Element }) {
	const id = "wrong-" + Math.random().toString().substring(2)
	return (
		<section aria-labelledby={id}>
			<h3 id={id} class="text-base font-medium">
				<span aria-hidden="true">❌</span> Wrong
				<span class="sr-only"> version for {props.heading}</span>
			</h3>
			{props.children}
		</section>
	)
}

export async function Correct(props: {
	heading: string
	children: JSX.Element
}) {
	const id = "correct-" + Math.random().toString().substring(2)
	return (
		<section aria-labelledby={id}>
			<h3 id={id} class="text-base font-medium">
				<span aria-hidden="true">✅</span> Correct
				<span class="sr-only"> version for {props.heading}</span>
			</h3>
			{props.children}
		</section>
	)
}
