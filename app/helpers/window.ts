import { type SnapshotFromStore, createStore } from "@xstate/store";
import { useSelector } from "@xstate/store/react";
import {
	type PropsWithChildren,
	type RefObject,
	createContext,
	jsx,
	useContext,
	useState,
} from "hono/jsx";
import type { HtmlEscapedString } from "hono/utils/html";

type FloatingWindowsStore = typeof floatingWindowsStore;

const floatingWindowsStore = createStore({
	context: {
		windowIds: [] as string[],
	},
	on: {
		add: {
			windowIds: (context, event: { id: string }) => {
				const cleanedIds = context.windowIds.filter(
					(windowId) => windowId !== event.id,
				);
				return [...cleanedIds, event.id];
			},
		},
		remove: {
			windowIds: (context, event: { id: string }) => {
				return context.windowIds.filter((windowId) => windowId !== event.id);
			},
		},
	},
});

function getIsFloating(id: string) {
	const snapshot = floatingWindowsStore.getSnapshot();
	return snapshot.context.windowIds.includes(id);
}

export function useFloatingWindows<T>(
	selector: (snapshot: SnapshotFromStore<FloatingWindowsStore>) => T,
) {
	return useSelector(floatingWindowsStore, selector);
}

type Mode = "default" | "closed" | "minimized" | "fullscreen";
type WindowStore = ReturnType<typeof initializeWindowStore>;

function initializeWindowStore({ id, ref }: WindowProps) {
	const store = createStore({
		context: {
			id,
			ref,
			mode: "default" as Mode,
			position: { x: 0, y: 0 },
			dimensions: { width: 0, height: 0 },
			dragStartPosition: { x: 0, y: 0 },
		},
		on: {
			activate: {
				id: (context) => {
					if (!getIsFloating(context.id)) return context.id;
					floatingWindowsStore.send({ type: "add", id: context.id });
					return context.id;
				},
			},
			close: {
				mode: (context, event: { e: MouseEvent }) => {
					event.e.stopPropagation();
					if (context.mode === "fullscreen") {
						exitFullscreen();
					}
					floatingWindowsStore.send({ type: "remove", id: context.id });
					return "closed" as const;
				},
			},
			toggleMinimize: {
				mode: (context, event: { e: MouseEvent }) => {
					event.e.stopPropagation();
					if (context.mode === "fullscreen") return context.mode;
					if (context.mode === "minimized") {
						return "default";
					}
					return "minimized";
				},
			},
			toggleFullscreen: {
				mode: (context, event: { e: MouseEvent }) => {
					event.e.stopPropagation();
					if (!context.ref.current) return context.mode;
					if (context.mode === "fullscreen") {
						exitFullscreen();
						return "default";
					}
					requestFullscreen(context.ref.current);
					return "fullscreen";
				},
			},
			startDragging: (context, event: { e: MouseEvent }) => {
				event.e.stopPropagation();
				if (!context.ref.current) return context;
				if (context.mode !== "default") return context;
				if (event.e.target !== event.e.currentTarget) {
					return context;
				}

				document.body.setAttribute("inert", "");
				context.dragStartPosition.x = event.e.clientX - context.position.x;
				context.dragStartPosition.y = event.e.clientY - context.position.y;

				if (!getIsFloating(context.id)) {
					context.dimensions = context.ref.current.getBoundingClientRect();
					context.ref.current.style.width = `${context.dimensions.width}px`;
				}

				floatingWindowsStore.send({ type: "add", id: context.id });
				const onMouseMove = (e: MouseEvent) => {
					if (!context.ref.current) return;
					context.position.x = e.clientX - context.dragStartPosition.x;
					context.position.y = e.clientY - context.dragStartPosition.y;
					context.ref.current.style.transform = `translate(${context.position.x}px, ${context.position.y}px)`;
				};

				const onMouseUp = () => {
					document.body.removeAttribute("inert");
					document.removeEventListener("mousemove", onMouseMove);
					document.removeEventListener("mouseup", onMouseUp);
				};

				document.addEventListener("mousemove", onMouseMove);
				document.addEventListener("mouseup", onMouseUp);

				return context;
			},
		},
	});

	return store;
}

const WindowContext = createContext<WindowStore | undefined>(undefined);

export type WindowProps = PropsWithChildren<{
	id: string;
	ref: RefObject<HTMLDivElement>;
}>;

export function WindowProvider({ id, ref, children }: WindowProps) {
	const [windowStore] = useState(initializeWindowStore({ id, ref }));
	return jsx(
		WindowContext.Provider,
		{ value: windowStore },
		children as HtmlEscapedString,
	) as unknown as HtmlEscapedString;
}

export function useWindow<T>(
	selector: (snapshot: SnapshotFromStore<WindowStore>) => T,
) {
	const store = useContext(WindowContext);
	if (!store) throw new Error("WindowProvider not found");
	return useSelector(store, selector);
}

export function useWindowAction() {
	const windowStore = useContext(WindowContext);
	const close = (e: MouseEvent) => windowStore?.send({ type: "close", e });
	const toggleMinimize = (e: MouseEvent) =>
		windowStore?.send({ type: "toggleMinimize", e });
	const toggleFullscreen = (e: MouseEvent) =>
		windowStore?.send({ type: "toggleFullscreen", e });
	const activate = () => windowStore?.send({ type: "activate" });
	const startDragging = (e: MouseEvent) =>
		windowStore?.send({ type: "startDragging", e });
	return {
		close,
		toggleMinimize,
		toggleFullscreen,
		activate,
		startDragging,
	};
}

async function exitFullscreen() {
	if (document.exitFullscreen) {
		document.documentElement.classList.remove("[scrollbar-gutter:stable]");
		await document.exitFullscreen();
	}
}

async function requestFullscreen(element = document.documentElement) {
	if (element.requestFullscreen) {
		document.documentElement.classList.remove("[scrollbar-gutter:stable]");
		await element.requestFullscreen();
	}
}
