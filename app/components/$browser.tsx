import { cx } from "hono/css";
import { type PropsWithChildren, useId, useRef } from "hono/jsx";
import {
	WindowProvider,
	useIsActiveWindow,
	useIsFloatingWindow,
	useWindowAction,
	useWindowSelector,
} from "./windows";

export function Browser({
	title,
	children,
}: PropsWithChildren<{ title: string }>) {
	const id = useId();
	const ref = useRef<HTMLDivElement>(null);

	if (!title) throw new Error("Browser must have a title");

	return (
		<WindowProvider id={id} ref={ref} title={title}>
			<Placeholder>
				<Shell>
					<TopBar>
						<CloseButton />
						<MinimizeButton />
						<FullscreenButton />
					</TopBar>
					<Content>{children}</Content>
				</Shell>
			</Placeholder>
		</WindowProvider>
	);
}

function Placeholder({ children }: PropsWithChildren) {
	const id = useWindowSelector((state) => state.context.id);

	return (
		<div
			id={`${id}-placeholder`}
			class={cx(
				"not-prose relative aspect-square sm:aspect-[4/3]",
				"not-has-data-floating:has-data-closed:hidden",
				"not-has-data-floating:has-data-minimized:aspect-auto",
			)}
		>
			{children}
		</div>
	);
}

function Shell({ children }: PropsWithChildren) {
	const id = useWindowSelector((state) => state.context.id);
	const ref = useWindowSelector((state) => state.context.ref);
	const isFloatingWindow = useIsFloatingWindow();
	const isActiveWindow = useIsActiveWindow();
	const mode = useWindowSelector((state) => state.context.mode);
	const { activate } = useWindowAction();

	return (
		<figure
			id={id}
			ref={ref}
			data-closed={mode === "closed" ? "true" : undefined}
			data-minimized={mode === "minimized" ? "true" : undefined}
			data-fullscreen={mode === "fullscreen" ? "true" : undefined}
			data-floating={isFloatingWindow ? "true" : undefined}
			data-active={isActiveWindow ? "true" : undefined}
			onFocusCapture={activate}
			onMouseDownCapture={activate}
			class={cx(
				"group/shell h-full relative",
				"rounded-md overflow-clip will-change-transform",
				"data-closed:hidden data-floating:data-minimized:hidden",
			)}
		>
			{children}
		</figure>
	);
}

function TopBar({ children }: PropsWithChildren) {
	const title = useWindowSelector((state) => state.context.title);
	const { startDragging } = useWindowAction();

	return (
		<div
			onMouseDown={startDragging}
			class={cx(
				"flex items-center flex-row-reverse justify-end",
				"bg-neutral-200 dark:bg-neutral-800",
			)}
		>
			<figcaption class="group-not-data-minimized/shell:sr-only">
				<span class="sr-only">Demo for </span>
				{title}
			</figcaption>
			<div
				class={cx(
					"group/top-bar-buttons p-2 flex gap-x-2",
					"group-data-minimized/shell:p-4",
				)}
			>
				{children}
			</div>
		</div>
	);
}

function CloseButton() {
	const { close } = useWindowAction();

	return (
		<div
			class={cx(
				"grid [grid-template-areas:'stack'] size-3 rounded-full bg-red-500",
				"group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-300",
				"dark:group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-700",
				"group-data-minimized/shell:hidden",
			)}
		>
			<button
				type="button"
				onMouseDown={close}
				class={cx(
					"hidden opacity-0 [grid-area:stack] [@media(hover:hover)]:block text-red-900",
					"group-hover/top-bar-buttons:opacity-100 group-focus-within/top-bar-buttons:opacity-100",
				)}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
					<title>Close</title>
					<path
						fill="currentColor"
						d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94z"
					/>
				</svg>
			</button>
		</div>
	);
}

function MinimizeButton() {
	const mode = useWindowSelector((state) => state.context.mode);
	const { toggleMinimize } = useWindowAction();

	return (
		<div
			class={cx(
				"grid [grid-template-areas:'stack'] size-3 rounded-full bg-yellow-500",
				"group-data-fullscreen/shell:bg-neutral-300 dark:group-data-fullscreen/shell:bg-neutral-700",
				"group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-300",
				"dark:group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-700",
			)}
		>
			<button
				type="button"
				onMouseDown={toggleMinimize}
				aria-disabled={mode === "fullscreen" ? "true" : undefined}
				class={cx(
					"peer hidden opacity-0 [grid-area:stack] text-yellow-900",
					"aria-disabled:hidden not-aria-disabled:[@media(hover:hover)]:block",
					"group-hover/top-bar-buttons:opacity-100 group-focus-within/top-bar-buttons:opacity-100",
				)}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
					<title>{mode === "minimized" ? "Restore" : "Minimize"}</title>
					<path
						fill="currentColor"
						d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5z"
					/>
				</svg>
			</button>
		</div>
	);
}

function FullscreenButton() {
	const mode = useWindowSelector((state) => state.context.mode);
	const { toggleFullscreen } = useWindowAction();

	return (
		<div
			class={cx(
				"grid [grid-template-areas:'stack'] size-3 rounded-full bg-green-500",
				"group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-300",
				"dark:group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-700",
				"group-data-minimized/shell:hidden",
			)}
		>
			<button
				type="button"
				onMouseDown={toggleFullscreen}
				class={cx(
					"hidden opacity-0 [grid-area:stack] [@media(hover:hover)]:block text-green-900",
					"group-hover/top-bar-buttons:opacity-100 group-focus-within/top-bar-buttons:opacity-100",
				)}
			>
				{mode === "fullscreen" ? (
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
						<title>Exit fullscreen</title>
						<path fill="currentColor" d="M4 4h6l-6 6V4z" />
						<path fill="currentColor" d="M12 12H6l6-6v6z" />
					</svg>
				) : (
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
						<title>Enter fullscreen</title>
						<path fill="currentColor" d="M4 4h6l-6 6V4z" />
						<path fill="currentColor" d="M12 12H6l6-6v6z" />
					</svg>
				)}
			</button>
		</div>
	);
}

function Content({ children }: PropsWithChildren) {
	return (
		<div
			class={cx(
				"h-full overflow-y-auto",
				"bg-neutral-100 dark:bg-neutral-900",
				"group-data-minimized/shell:hidden",
			)}
		>
			{children}
		</div>
	);
}
