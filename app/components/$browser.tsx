import { cx } from "hono/css";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { ScopeProvider } from "jotai-scope";
import {
	type PropsWithChildren,
	useEffect,
	useId,
	useRef,
	useState,
} from "react";

const floatingBrowsersAtom = atom<string[]>([]);

const browserIdAtom = atom(useId);
const browserRefAtom = atom(() => useRef<HTMLDivElement>(null));
const isClosedAtom = atom(false);
const isMinimizedAtom = atom(false);
const isFullscreenAtom = atom(false);
const positionAtom = atom({ x: 0, y: 0 });

const scopedAtoms = [
	browserIdAtom,
	browserRefAtom,
	isClosedAtom,
	isMinimizedAtom,
	isFullscreenAtom,
	positionAtom,
];

export function Browser({
	title,
	children,
}: PropsWithChildren<{ title: string }>) {
	if (!title) throw new Error("Browser must have a title");

	return (
		<ScopeProvider atoms={scopedAtoms}>
			<BrowserPlaceholder>
				<BrowserShell>
					<DockedBrowser title={title} />
					<TopBar title={title}>
						<CloseButton />
						<MinimizeButton />
						<FullscreenButton />
					</TopBar>
					<BrowserContent>{children}</BrowserContent>
				</BrowserShell>
			</BrowserPlaceholder>
		</ScopeProvider>
	);
}

function BrowserPlaceholder({ children }: PropsWithChildren) {
	const browserRef = useAtomValue(browserRefAtom);
	const browserPlaceholderRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new ResizeObserver(() => {
			if (getFullscreenElement()) return;
			if (!browserRef.current || !browserPlaceholderRef.current) return;
			if (browserRef.current.hasAttribute("data-floating")) return;
			const dimensions = browserRef.current.getBoundingClientRect();
			browserPlaceholderRef.current.style.width = `${dimensions.width}px`;
			browserPlaceholderRef.current.style.height = `${dimensions.height}px`;
		});

		if (browserRef.current) {
			observer.observe(browserRef.current);
		}

		return () => observer.disconnect();
	}, [browserRef]);

	return <div ref={browserPlaceholderRef}>{children}</div>;
}

function BrowserShell({ children }: PropsWithChildren) {
	const browserId = useAtomValue(browserIdAtom);
	const browserRef = useAtomValue(browserRefAtom);
	const isClosed = useAtomValue(isClosedAtom);
	const position = useAtomValue(positionAtom);
	const [floatingBrowsers, setFloatingBrowsers] = useAtom(floatingBrowsersAtom);

	const isFloating = floatingBrowsers.includes(browserId);
	const isActive = !isFloating || floatingBrowsers.at(-1) === browserId;

	const handleShellClick = () => {
		if (isFloating) {
			setFloatingBrowsers([
				...floatingBrowsers.filter((id) => id !== browserId),
				browserId,
			]);
		}
	};

	return (
		<div
			ref={browserRef}
			data-active={isActive ? "true" : undefined}
			data-closed={isClosed ? "true" : undefined}
			data-floating={isFloating ? "true" : undefined}
			onKeyDown={undefined}
			onFocusCapture={handleShellClick}
			onClick={handleShellClick}
			style={{
				top: browserRef.current?.offsetTop,
				left: browserRef.current?.offsetLeft,
				transform: `translate(${position.x}px, ${position.y}px)`,
			}}
			className={cx(
				"w-2xl rounded-md overflow-hidden",
				"data-active:z-1000 data-closed:hidden data-floating:absolute",
			)}
		>
			{children}
		</div>
	);
}

function DockedBrowser({ title }: PropsWithChildren<{ title: string }>) {
	const [isMinimized, setIsMinimized] = useAtom(isMinimizedAtom);

	const handleMinimizedClick = () => {
		setIsMinimized(false);
	};

	return (
		<button
			type="button"
			aria-label="Undock"
			onClick={handleMinimizedClick}
			data-minimized={isMinimized ? "true" : undefined}
			className={cx(
				"hidden gap-x-2",
				"w-full px-4 py-2 font-medium",
				"bg-neutral-200 dark:bg-neutral-800",
				"data-minimized:flex",
			)}
		>
			{title}
		</button>
	);
}

function TopBar({ title, children }: PropsWithChildren<{ title: string }>) {
	const browserId = useAtomValue(browserIdAtom);
	const isMinimized = useAtomValue(isMinimizedAtom);
	const setFloatingBrowsers = useSetAtom(floatingBrowsersAtom);

	const { handleMouseDown } = useDraggable();

	const handleTopBarMouseDown = (e: MouseEvent) => {
		if (e.target === e.currentTarget && !getFullscreenElement()) {
			setFloatingBrowsers((floatingBrowsers) => [
				...floatingBrowsers.filter((id) => id !== browserId),
				browserId,
			]);
			handleMouseDown(e);
		}
	};

	return (
		<div
			onMouseDown={handleTopBarMouseDown}
			data-minimized={isMinimized ? "true" : undefined}
			className={cx(
				"flex",
				"bg-neutral-200 dark:bg-neutral-800",
				"data-minimized:hidden",
			)}
		>
			<div class="group flex gap-x-2 p-2">{children}</div>
			<span className="sr-only">{title}</span>
		</div>
	);
}

function CloseButton() {
	const browserId = useAtomValue(browserIdAtom);
	const isFullscreen = useAtomValue(isFullscreenAtom);
	const [floatingBrowsers, setFloatingBrowsers] = useAtom(floatingBrowsersAtom);
	const setIsClosed = useSetAtom(isClosedAtom);
	const { exitFullscreen } = useFullscreen();

	const isFloating = floatingBrowsers.includes(browserId);
	const isActive = !isFloating || floatingBrowsers.at(-1) === browserId;

	const handleClose = (e: MouseEvent) => {
		e.stopPropagation();
		setIsClosed(true);
		if (isFullscreen) {
			exitFullscreen();
		}
		if (isFloating) {
			setFloatingBrowsers((floatingBrowsers) => [
				browserId,
				...floatingBrowsers.filter((id) => id !== browserId),
			]);
		}
	};

	return (
		<div
			data-active={isActive ? "true" : undefined}
			className={cx(
				"relative w-3 h-3 rounded-full",
				"bg-red-500",
				"not-data-active:not-group-hover:bg-neutral-300 not-data-active:not-group-hover:dark:bg-neutral-700",
			)}
		>
			<button
				type="button"
				aria-label="Close"
				onClick={handleClose}
				class="absolute inset-0 [@media_(pointer:_coarse)]:hidden"
			/>
		</div>
	);
}

function MinimizeButton() {
	const browserId = useAtomValue(browserIdAtom);
	const isFullscreen = useAtomValue(isFullscreenAtom);
	const [floatingBrowsers, setFloatingBrowsers] = useAtom(floatingBrowsersAtom);
	const setIsMinimized = useSetAtom(isMinimizedAtom);

	const isFloating = floatingBrowsers.includes(browserId);
	const isActive = !isFloating || floatingBrowsers.at(-1) === browserId;

	const handleMinimize = (e: MouseEvent) => {
		e.stopPropagation();
		if (!isFullscreen) {
			setIsMinimized(true);
		}
		if (isFloating) {
			setFloatingBrowsers((floatingBrowsers) => [
				browserId,
				...floatingBrowsers.filter((id) => id !== browserId),
			]);
		}
	};

	return (
		<div
			data-active={isActive ? "true" : undefined}
			className={cx(
				"relative w-3 h-3 rounded-full",
				"bg-yellow-500",
				"has-aria-disabled:bg-neutral-300 has-aria-disabled:dark:bg-neutral-700",
				"not-data-active:not-group-hover:bg-neutral-300 not-data-active:not-group-hover:dark:bg-neutral-700",
			)}
		>
			<button
				type="button"
				aria-label="Minimize"
				onClick={handleMinimize}
				aria-disabled={isFullscreen ? "true" : undefined}
				class="absolute inset-0 [@media_(pointer:_coarse)]:hidden"
			/>
		</div>
	);
}

function FullscreenButton() {
	const browserId = useAtomValue(browserIdAtom);
	const browserRef = useAtomValue(browserRefAtom);
	const isFullscreen = useAtomValue(isFullscreenAtom);
	const floatingBrowsers = useAtomValue(floatingBrowsersAtom);
	const { exitFullscreen, requestFullscreen } = useFullscreen();

	const isFloating = floatingBrowsers.includes(browserId);
	const isActive = !isFloating || floatingBrowsers.at(-1) === browserId;

	const handleFullscreen = (e: MouseEvent) => {
		e.stopPropagation();
		if (isFullscreen) {
			exitFullscreen();
		} else if (browserRef.current) {
			requestFullscreen(browserRef.current);
		}
	};

	return (
		<div
			data-active={isActive ? "true" : undefined}
			className={cx(
				"relative w-3 h-3 rounded-full",
				"bg-green-500",
				"not-data-active:not-group-hover:bg-neutral-300 not-data-active:not-group-hover:dark:bg-neutral-700",
			)}
		>
			<button
				type="button"
				onClick={handleFullscreen}
				aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
				class="absolute inset-0 [@media_(pointer:_coarse)]:hidden"
			/>
		</div>
	);
}

function BrowserContent({ children }: PropsWithChildren) {
	const isMinimized = useAtomValue(isMinimizedAtom);
	const isFullscreen = useAtomValue(isFullscreenAtom);

	return (
		<div
			data-minimized={isMinimized ? "true" : undefined}
			data-fullscreen={isFullscreen ? "true" : undefined}
			className={cx(
				"w-full h-[400px] overflow-auto",
				"bg-neutral-100 dark:bg-neutral-900",
				"data-minimized:hidden data-fullscreen:h-full",
			)}
		>
			{children}
		</div>
	);
}

function getFullscreenElement() {
	return document.fullscreenElement;
}

function useFullscreen() {
	const setIsFullscreen = useSetAtom(isFullscreenAtom);

	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(!!getFullscreenElement());
		};

		document.addEventListener("fullscreenchange", handleFullscreenChange);
		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
		};
	}, [setIsFullscreen]);

	const requestFullscreen = async (element = document.documentElement) => {
		if (element.requestFullscreen) {
			document.documentElement.classList.remove("[scrollbar-gutter:stable]");
			await element.requestFullscreen();
		}
	};

	const exitFullscreen = async () => {
		if (document.exitFullscreen) {
			document.documentElement.classList.remove("[scrollbar-gutter:stable]");
			await document.exitFullscreen();
		}
	};

	return {
		requestFullscreen,
		exitFullscreen,
	};
}

function useDraggable() {
	const [isDragging, setIsDragging] = useState(false);
	const [position, setPosition] = useAtom(positionAtom);
	const dragStartRef = useRef({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (getFullscreenElement()) return;
			if (isDragging && dragStartRef.current) {
				setPosition({
					x: e.clientX - dragStartRef.current.x,
					y: e.clientY - dragStartRef.current.y,
				});
			}
		};

		const handleMouseUp = () => {
			document.body.removeAttribute("inert");
			setIsDragging(false);
		};

		if (isDragging) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
		}

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, [isDragging, setPosition]);

	const handleMouseDown = (e: MouseEvent) => {
		document.body.setAttribute("inert", "");
		setIsDragging(true);
		dragStartRef.current = {
			x: e.clientX - position.x,
			y: e.clientY - position.y,
		};
	};

	return {
		handleMouseDown,
	};
}
