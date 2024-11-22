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
		<button
			type="button"
			onMouseDown={close}
			class={cx(
				"relative w-3 h-3 rounded-full bg-red-500",
				"group-data-minimized/shell:hidden",
				"group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-300",
				"dark:group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-700",
			)}
		>
			<span class="sr-only">Close</span>
			<span
				class={cx(
					"bg-purple-900",
					"place-items-center hidden",
					"group-hover/top-bar-buttons:grid group-focus-within/top-bar-buttons:grid",
				)}
			>
				<span class="w-2 h-0.5 bg-red-900/50 rotate-45 absolute" />
				<span class="w-2 h-0.5 bg-red-900/50 -rotate-45 absolute" />
			</span>
		</button>
	);
}

function MinimizeButton() {
	const mode = useWindowSelector((state) => state.context.mode);
	const { toggleMinimize } = useWindowAction();

	return (
		<button
			type="button"
			onMouseDown={toggleMinimize}
			aria-disabled={mode === "fullscreen" ? "true" : undefined}
			class={cx(
				"group/minimized-button",
				"relative w-3 h-3 rounded-full bg-yellow-500",
				"aria-disabled:bg-neutral-300 dark:aria-disabled:bg-neutral-700",
				"group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-300",
				"dark:group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-700",
			)}
		>
			<span class="sr-only">Minimize</span>
			<span
				class={cx(
					"place-items-center hidden",
					"group-aria-disabled/minimized-button:hidden",
					"group-hover/top-bar-buttons:grid group-focus-within/top-bar-buttons:grid",
				)}
			>
				<span class="w-1.5 h-0.5 bg-yellow-900/50 absolute" />
			</span>
		</button>
	);
}

function FullscreenButton() {
	const mode = useWindowSelector((state) => state.context.mode);
	const { toggleFullscreen } = useWindowAction();

	return (
		<button
			type="button"
			onMouseDown={toggleFullscreen}
			class={cx(
				"relative w-3 h-3 rounded-full bg-green-500",
				"group-data-minimized/shell:hidden",
				"group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-300",
				"dark:group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-700",
			)}
		>
			<span class="sr-only">
				{mode === "fullscreen" ? "Exit Fullscreen" : "Enter Fullscreen"}
			</span>
			<span
				class={cx(
					"place-items-center hidden",
					"group-hover/top-bar-buttons:grid group-focus-within/top-bar-buttons:grid",
				)}
			>
				<div class="absolute top-[1px] left-[1px] border-[3px] border-transparent border-t-green-900/75 border-l-green-900/75" />
				<div class="absolute bottom-[2px] right-[2px] border-[3px] border-transparent border-b-green-900/75 border-r-green-900/75" />
			</span>
		</button>
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
