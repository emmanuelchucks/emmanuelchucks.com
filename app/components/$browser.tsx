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
			<Shell>
				<TopBar>
					<CloseButton />
					<MinimizeButton />
					<FullscreenButton />
				</TopBar>
				<Content>{children}</Content>
			</Shell>
			<Placeholder />
		</WindowProvider>
	);
}

function Placeholder() {
	const id = useWindowSelector((state) => state.context.id);
	const dimensions = useWindowSelector((state) => state.context.dimensions);

	return (
		<div
			id={`${id}-placeholder`}
			style={{ height: `${dimensions.height}px` }}
		/>
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
		<div
			id={id}
			ref={ref}
			data-closed={mode === "closed" ? "true" : undefined}
			data-minimized={mode === "minimized" ? "true" : undefined}
			data-fullscreen={mode === "fullscreen" ? "true" : undefined}
			data-floating={isFloatingWindow ? "true" : undefined}
			data-active={isActiveWindow ? "true" : undefined}
			onFocusCapture={activate}
			onMouseDownCapture={activate}
			className={cx(
				"group/shell not-prose",
				"rounded-md overflow-hidden will-change-transform",
				"data-closed:hidden data-floating:absolute",
				"data-floating:data-minimized:hidden",
			)}
		>
			<figure>{children}</figure>
		</div>
	);
}

function TopBar({ children }: PropsWithChildren) {
	const title = useWindowSelector((state) => state.context.title);
	const { startDragging } = useWindowAction();

	return (
		<div
			onMouseDown={startDragging}
			className={cx(
				"flex items-center flex-row-reverse justify-end",
				"bg-neutral-200 dark:bg-neutral-800",
			)}
		>
			<figcaption className="group-not-data-minimized/shell:sr-only">
				<span class="sr-only">Demo for </span>
				{title}
			</figcaption>
			<div
				class={cx(
					"group/top-bar-buttons",
					"p-2 flex gap-x-2",
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
			onClick={close}
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
					"grid place-items-center opacity-0",
					"group-hover/top-bar-buttons:opacity-100 group-focus-within/top-bar-buttons:opacity-100",
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
			onClick={toggleMinimize}
			aria-disabled={mode === "fullscreen" ? "true" : undefined}
			class={cx(
				"group/minimized-button",
				"relative w-3 h-3 rounded-full bg-yellow-500",
				"has-aria-disabled:bg-neutral-300 dark:has-aria-disabled:bg-neutral-700",
				"group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-300",
				"dark:group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-700",
			)}
		>
			<span class="sr-only">Minimize</span>
			<span
				class={cx(
					"grid place-items-center opacity-0",
					"group-aria-disabled/minimized-button:opacity-0",
					"group-hover/top-bar-buttons:opacity-100 group-focus-within/top-bar-buttons:opacity-100",
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
			onClick={toggleFullscreen}
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
					"grid place-items-center opacity-0",
					"group-hover/top-bar-buttons:opacity-100 group-focus-within/top-bar-buttons:opacity-100",
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
			className={cx(
				"w-full aspect-square overflow-auto sm:aspect-[4/3]",
				"bg-neutral-100 dark:bg-neutral-900",
				"group-data-minimized/shell:hidden group-data-fullscreen/shell:h-svh",
			)}
		>
			{children}
		</div>
	);
}
