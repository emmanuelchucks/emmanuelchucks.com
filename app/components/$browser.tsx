import { cx } from "hono/css";
import { type PropsWithChildren, useId, useRef } from "hono/jsx";
import {
	type WindowProps,
	WindowProvider,
	useIsActive,
	useIsFloating,
	useWindow,
	useWindowAction,
} from "~/components/windows";

export function Browser({
	title,
	children,
}: PropsWithChildren<{ title: string }>) {
	const id = useId();
	const ref = useRef<HTMLDivElement>(null);

	if (!title) throw new Error("Browser must have a title");

	return (
		<WindowProvider id={id} ref={ref}>
			<Shell id={id} ref={ref}>
				<Minimized title={title} />
				<TopBar title={title}>
					<CloseButton />
					<MinimizeButton />
					<FullscreenButton />
				</TopBar>
				<Content>{children}</Content>
			</Shell>
			<Placeholder id={id} />
		</WindowProvider>
	);
}

function Placeholder({ id }: Pick<WindowProps, "id">) {
	const dimensions = useWindow((state) => state.context.dimensions);

	return (
		<div
			id={`${id}-placeholder`}
			style={{ height: `${dimensions.height}px` }}
		/>
	);
}

function Shell({ id, ref, children }: WindowProps) {
	const mode = useWindow((state) => state.context.mode);
	const isFloating = useIsFloating(id);
	const isActive = useIsActive(id);
	const { activate } = useWindowAction();

	return (
		<div
			id={id}
			ref={ref}
			data-closed={mode === "closed" ? "true" : undefined}
			data-minimized={mode === "minimized" ? "true" : undefined}
			data-fullscreen={mode === "fullscreen" ? "true" : undefined}
			data-floating={isFloating ? "true" : undefined}
			data-active={isActive ? "true" : undefined}
			onFocusCapture={activate}
			onMouseDownCapture={activate}
			className={cx(
				"group/shell rounded-md overflow-hidden will-change-transform",
				"data-closed:hidden data-floating:absolute",
				"data-floating:data-minimized:hidden",
			)}
		>
			{children}
		</div>
	);
}

function Minimized({ title }: PropsWithChildren<{ title: string }>) {
	const { toggleMinimize } = useWindowAction();

	return (
		<button
			type="button"
			aria-label="Undock"
			onClick={toggleMinimize}
			className={cx(
				"hidden gap-x-2",
				"w-full px-4 py-2 font-medium",
				"bg-neutral-200 dark:bg-neutral-800",
				"group-data-minimized/shell:flex",
			)}
		>
			{title}
		</button>
	);
}

function TopBar({ title, children }: PropsWithChildren<{ title: string }>) {
	const { startDragging } = useWindowAction();

	return (
		<div
			onMouseDown={startDragging}
			className={cx(
				"flex bg-neutral-200 dark:bg-neutral-800",
				"group-data-minimized/shell:hidden",
			)}
		>
			<div class="group/top-bar-buttons flex gap-x-2 p-2">{children}</div>
			<span className="sr-only">{title}</span>
		</div>
	);
}

function CloseButton() {
	const { close } = useWindowAction();

	return (
		<div
			className={cx(
				"relative w-3 h-3 rounded-full bg-red-500",
				"group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-300",
				"dark:group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-700",
			)}
		>
			<button
				type="button"
				onClick={close}
				class="absolute inset-0 [@media_(pointer:_coarse)]:hidden"
			>
				<span class="sr-only">Close</span>
			</button>
		</div>
	);
}

function MinimizeButton() {
	const mode = useWindow((state) => state.context.mode);
	const { toggleMinimize } = useWindowAction();

	return (
		<div
			className={cx(
				"relative w-3 h-3 rounded-full bg-yellow-500",
				"has-aria-disabled:bg-neutral-300 dark:has-aria-disabled:bg-neutral-700",
				"group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-300",
				"dark:group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-700",
			)}
		>
			<button
				type="button"
				onClick={toggleMinimize}
				aria-disabled={mode === "fullscreen" ? "true" : undefined}
				class="absolute inset-0 [@media_(pointer:_coarse)]:hidden"
			>
				<span class="sr-only">Minimize</span>
			</button>
		</div>
	);
}

function FullscreenButton() {
	const mode = useWindow((state) => state.context.mode);
	const { toggleFullscreen } = useWindowAction();

	return (
		<div
			className={cx(
				"relative w-3 h-3 rounded-full bg-green-500",
				"group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-300",
				"dark:group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-700",
			)}
		>
			<button
				type="button"
				onClick={toggleFullscreen}
				class="absolute inset-0 [@media_(pointer:_coarse)]:hidden"
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
			className={cx(
				"w-full aspect-square overflow-auto sm:aspect-[4/3]",
				"bg-neutral-100 dark:bg-neutral-900",
				"group-data-minimized/shell:hidden group-data-fullscreen/shell:h-full",
			)}
		>
			{children}
		</div>
	);
}
