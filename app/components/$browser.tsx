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
				"grid [grid-template-areas:'stack']",
				"group-data-minimized/shell:hidden",
			)}
		>
			<div
				class={cx(
					"size-3 rounded-full bg-red-500 [grid-area:stack]",
					"group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-300",
					"dark:group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-700",
				)}
			/>
			<button
				type="button"
				onMouseDown={close}
				class={cx(
					"hidden opacity-0 [grid-area:stack] [@media(hover:hover)]:block",
					"group-hover/top-bar-buttons:opacity-100 group-focus-within/top-bar-buttons:opacity-100",
				)}
			>
				<span class="sr-only">Close</span>
			</button>
		</div>
	);
}

function MinimizeButton() {
	const mode = useWindowSelector((state) => state.context.mode);
	const { toggleMinimize } = useWindowAction();

	return (
		<div class="grid [grid-template-areas:'stack']">
			<div
				class={cx(
					"size-3 rounded-full bg-yellow-500 [grid-area:stack]",
					"group-data-fullscreen/shell:bg-neutral-300 dark:group-data-fullscreen/shell:bg-neutral-700",
					"group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-300",
					"dark:group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-700",
				)}
			/>
			<button
				type="button"
				onMouseDown={toggleMinimize}
				aria-disabled={mode === "fullscreen" ? "true" : undefined}
				class={cx(
					"peer hidden opacity-0 [grid-area:stack]",
					"aria-disabled:hidden not-aria-disabled:[@media(hover:hover)]:block",
					"group-hover/top-bar-buttons:opacity-100 group-focus-within/top-bar-buttons:opacity-100",
				)}
			>
				<span class="sr-only">Minimize</span>
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
				"grid [grid-template-areas:'stack']",
				"group-data-minimized/shell:hidden",
			)}
		>
			<div
				class={cx(
					"size-3 rounded-full bg-green-500 [grid-area:stack]",
					"group-data-minimized/shell:hidden",
					"group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-300",
					"dark:group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-700",
				)}
			/>
			<button
				type="button"
				onMouseDown={toggleFullscreen}
				class={cx(
					"hidden opacity-0 [grid-area:stack] [@media(hover:hover)]:block",
					"group-hover/top-bar-buttons:opacity-100 group-focus-within/top-bar-buttons:opacity-100",
				)}
			>
				<span class="sr-only">
					{mode === "fullscreen" ? "Exit Fullscreen" : "Enter Fullscreen"}
				</span>
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
