import type { PropsWithChildren } from "hono/jsx";

export function Wrong({
	heading,
	children,
}: PropsWithChildren<{
	heading: string;
}>) {
	return (
		<div>
			<p class="text-base font-medium">
				<span aria-hidden="true">❌</span> Wrong
				<span class="sr-only"> version for '{heading}'</span>
			</p>
			{children}
		</div>
	);
}

export function Correct({
	heading,
	children,
}: PropsWithChildren<{
	heading: string;
}>) {
	return (
		<div>
			<p class="text-base font-medium">
				<span aria-hidden="true">✅</span> Correct
				<span class="sr-only"> version for '{heading}'</span>
			</p>
			{children}
		</div>
	);
}
