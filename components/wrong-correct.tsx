export async function Wrong(props: { heading: string; children: JSX.Element }) {
	return (
		<section>
			<h3 class="text-base font-medium">
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
	return (
		<section>
			<h3 class="text-base font-medium">
				<span aria-hidden="true">✅</span> Correct
				<span class="sr-only"> version for {props.heading}</span>
			</h3>
			{props.children}
		</section>
	)
}
