import { cx } from "hono/css";
import { useId, type PropsWithChildren } from "hono/jsx";

export function DemoBox(
	props: PropsWithChildren<{
		heading: string;
	}>,
) {
	const demoHeading = useId();
	return (
		<section
			aria-labelledby={demoHeading}
			class={cx("overflow-clip rounded-md bg-white", "dark:bg-neutral-900")}
		>
			<h3 id={demoHeading} class="sr-only">
				Demo for '{props.heading}'
			</h3>
			{props.children}
		</section>
	);
}
