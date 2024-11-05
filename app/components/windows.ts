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

type WindowManagerStore = typeof windowManagerStore;

const windowManagerStore = createStore({
	context: {
		floatingWindows: new Set<WindowStore>(),
		dockedWindows: new Set<WindowStore>(),
		activeWindow: undefined as WindowStore | undefined,
	},
	on: {
		addFloatingWindow(context, event: { windowStore: WindowStore }) {
			context.floatingWindows.add(event.windowStore);
			return {
				floatingWindows: new Set(context.floatingWindows),
				activeWindow: event.windowStore,
			};
		},
		removeFloatingWindow(context, event: { windowStore: WindowStore }) {
			context.floatingWindows.delete(event.windowStore);
			const nextFloatingWindow = [...context.floatingWindows].at(-1);
			return {
				floatingWindows: new Set(context.floatingWindows),
				activeWindow: nextFloatingWindow,
			};
		},
		addDockedWindow(context, event: { windowStore: WindowStore }) {
			context.dockedWindows.add(event.windowStore);
			const nextFloatingWindow = [...context.floatingWindows].at(-2);
			return {
				dockedWindows: new Set(context.dockedWindows),
				activeWindow: nextFloatingWindow,
			};
		},
		removeDockedWindow(
			context,
			event: { e: MouseEvent; windowStore: WindowStore },
		) {
			context.dockedWindows.delete(event.windowStore);
			event.windowStore.send({ type: "toggleMinimize", e: event.e });
			return {
				floatingWindows: new Set(context.floatingWindows),
				dockedWindows: new Set(context.dockedWindows),
				activeWindow: event.windowStore,
			};
		},
		activateWindow(context, event: { windowStore: WindowStore }) {
			const newZIndex = getIsActiveWindow(event.windowStore)
				? event.windowStore.getSnapshot().context.zIndex
				: (context.activeWindow?.getSnapshot().context.zIndex ?? 0) + 1;

			const newActiveWindow =
				event.windowStore.getSnapshot().context.ref.current;
			if (!newActiveWindow) return context;

			newActiveWindow.style.zIndex = String(newZIndex);
			event.windowStore.send({
				type: "setZIndex",
				zIndex: newZIndex,
			});

			if (getIsFloatingWindow(event.windowStore)) {
				context.floatingWindows.delete(event.windowStore);
				context.floatingWindows.add(event.windowStore);
			}

			return {
				floatingWindows: new Set(context.floatingWindows),
				activeWindow: event.windowStore,
			};
		},
	},
});

windowManagerStore.inspect((event) => {
	if (event.type === "@xstate.snapshot" && "context" in event.snapshot) {
		// console.log(event.snapshot.context);
	}
});

function getIsFloatingWindow(windowStore: WindowStore) {
	const windowManagerSnapshot = windowManagerStore.getSnapshot();
	return windowManagerSnapshot.context.floatingWindows.has(windowStore);
}

function getIsActiveWindow(windowStore: WindowStore) {
	const windowManagerSnapshot = windowManagerStore.getSnapshot();
	const activeWindowSnapshot =
		windowManagerSnapshot.context.activeWindow?.getSnapshot();
	return (
		activeWindowSnapshot?.context.id === windowStore.getSnapshot().context.id
	);
}

export function useWindowManagerSelector<T>(
	selector: (snapshot: SnapshotFromStore<WindowManagerStore>) => T,
) {
	return useSelector(windowManagerStore, selector);
}

export function useWindowManagerAction() {
	return {
		removeDockedWindow(e: MouseEvent, windowStore: WindowStore) {
			return windowManagerStore.send({
				type: "removeDockedWindow",
				windowStore,
				e,
			});
		},
	};
}

export type WindowStore = ReturnType<typeof initializeWindowStore>;

function initializeWindowStore({ id, ref, title }: WindowProps) {
	const windowStore = createStore({
		context: {
			id,
			ref,
			title,
			zIndex: 0,
			position: { x: 0, y: 0 },
			dimensions: { width: 0, height: 0 },
			dragStartPosition: { x: 0, y: 0 },
			mode: "default" as "default" | "closed" | "minimized" | "fullscreen",
		},
		on: {
			setZIndex: {
				zIndex(_context, event: { zIndex: number }) {
					return event.zIndex;
				},
			},
			close: {
				mode(context, event: { e: MouseEvent }) {
					event.e.stopPropagation();
					if (context.mode === "fullscreen") {
						exitFullscreen();
					}
					windowManagerStore.send({
						type: "removeFloatingWindow",
						windowStore,
					});
					return "closed" as const;
				},
			},
			toggleMinimize: {
				mode(context, event: { e: MouseEvent }) {
					event.e.stopPropagation();
					if (context.mode === "fullscreen") return context.mode;
					if (context.mode === "minimized") {
						return "default";
					}
					if (getIsFloatingWindow(windowStore)) {
						windowManagerStore.send({
							type: "addDockedWindow",
							windowStore,
						});
					}
					return "minimized";
				},
			},
			toggleFullscreen: {
				mode(context, event: { e: MouseEvent }) {
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
			startDragging(context, event: { e: MouseEvent }) {
				event.e.stopPropagation();
				if (!context.ref.current) return context;
				if (context.mode !== "default") return context;
				if (event.e.target !== event.e.currentTarget) {
					return context;
				}

				document.body.setAttribute("inert", "");
				context.dragStartPosition.x = event.e.clientX - context.position.x;
				context.dragStartPosition.y = event.e.clientY - context.position.y;

				if (!getIsFloatingWindow(windowStore)) {
					context.dimensions = context.ref.current.getBoundingClientRect();
					context.ref.current.style.width = `${context.dimensions.width}px`;
					windowManagerStore.send({
						type: "addFloatingWindow",
						windowStore,
					});
				}

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

	return windowStore;
}

const WindowContext = createContext<WindowStore | undefined>(undefined);

export type WindowProps = PropsWithChildren<{
	id: string;
	ref: RefObject<HTMLDivElement>;
	title: string;
}>;

export function WindowProvider({ id, ref, title, children }: WindowProps) {
	const [windowStore] = useState(initializeWindowStore({ id, ref, title }));
	return jsx(
		WindowContext.Provider,
		{ value: windowStore },
		children as HtmlEscapedString,
	) as unknown as HtmlEscapedString;
}

function useWindowContext() {
	const windowStore = useContext(WindowContext);
	if (!windowStore) throw new Error("WindowProvider not found");
	return windowStore;
}

export function useWindowSelector<T>(
	selector: (snapshot: SnapshotFromStore<WindowStore>) => T,
) {
	const windowStore = useWindowContext();
	return useSelector(windowStore, selector);
}

export function useIsFloatingWindow() {
	const windowStore = useWindowContext();
	const floatingWindows = useWindowManagerSelector(
		(state) => state.context.floatingWindows,
	);
	return floatingWindows.has(windowStore);
}

export function useIsActiveWindow() {
	const windowStore = useWindowContext();
	const activeWindow = useWindowManagerSelector(
		(state) => state.context.activeWindow,
	);
	return (
		activeWindow?.getSnapshot().context.id ===
		windowStore.getSnapshot().context.id
	);
}

export function useWindowAction() {
	const windowStore = useWindowContext();
	return {
		close(e: MouseEvent) {
			return windowStore.send({ type: "close", e });
		},
		toggleMinimize(e: MouseEvent) {
			return windowStore.send({ type: "toggleMinimize", e });
		},
		toggleFullscreen(e: MouseEvent) {
			return windowStore.send({ type: "toggleFullscreen", e });
		},
		activate() {
			return windowManagerStore.send({ type: "activateWindow", windowStore });
		},
		startDragging(e: MouseEvent) {
			return windowStore.send({ type: "startDragging", e });
		},
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
