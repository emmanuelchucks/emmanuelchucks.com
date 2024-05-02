import { useId, type PropsWithChildren } from "hono/jsx";

export function Wrong(
	props: PropsWithChildren<{
		heading: string;
	}>,
) {
	const wrongSectionHeading = useId();
	return (
		<section aria-labelledby={wrongSectionHeading}>
			<h3 id={wrongSectionHeading} class="text-base font-medium">
				<span aria-hidden="true">❌</span> Wrong
				<span class="sr-only"> version for '{props.heading}'</span>
			</h3>
			{props.children}
		</section>
	);
}

export function Correct(
	props: PropsWithChildren<{
		heading: string;
	}>,
) {
	const correctSectionHeading = useId();
	return (
		<section aria-labelledby={correctSectionHeading}>
			<h3 id={correctSectionHeading} class="text-base font-medium">
				<span aria-hidden="true">✅</span> Correct
				<span class="sr-only"> version for '{props.heading}'</span>
			</h3>
			{props.children}
		</section>
	);
}
