import { type SnapshotFromStore, createStore } from "@xstate/store";
import { useSelector } from "@xstate/store/react";
import {
	type PropsWithChildren,
	type RefObject,
	createContext,
	useContext,
	useState,
} from "hono/jsx";

type WindowManagerStore = typeof windowManagerStore;

const windowManagerStore = createStore({
	context: {
		floatingWindows: new Set<string>(),
		activeWindow: { id: "", zIndex: 0 },
	},
	on: {
		addFloatingWindow: {
			floatingWindows: (context, event: { id: string }) => {
				context.floatingWindows.add(event.id);
				return new Set(context.floatingWindows);
			},
		},
		removeFloatingWindow: (context, event: { id: string }) => {
			context.floatingWindows.delete(event.id);
			const nextFloatingWindowId = [...context.floatingWindows].at(-1);
			if (!nextFloatingWindowId) return context;
			return {
				floatingWindows: new Set(context.floatingWindows),
				activeWindow: {
					id: nextFloatingWindowId,
					zIndex: context.activeWindow.zIndex,
				},
			};
		},
		activateWindow: (context, event: { id: string }) => {
			if (getIsFloating(event.id)) {
				context.floatingWindows.delete(event.id);
				context.floatingWindows.add(event.id);
			}

			const newZIndex =
				context.activeWindow.id === event.id
					? context.activeWindow.zIndex
					: context.activeWindow.zIndex + 1;

			return {
				floatingWindows: new Set(context.floatingWindows),
				activeWindow: { id: event.id, zIndex: newZIndex },
			};
		},
	},
});

function getActiveWindow() {
	const windowManagerSnapshot = windowManagerStore.getSnapshot();
	return windowManagerSnapshot.context.activeWindow;
}

function getIsFloating(id: string) {
	const windowManagerSnapshot = windowManagerStore.getSnapshot();
	return windowManagerSnapshot.context.floatingWindows.has(id);
}

export function useWindowManager<T>(
	selector: (snapshot: SnapshotFromStore<WindowManagerStore>) => T,
) {
	return useSelector(windowManagerStore, selector);
}

export function useIsFloating(id: string) {
	const floatingWindows = useWindowManager(
		(state) => state.context.floatingWindows,
	);
	return floatingWindows.has(id);
}

export function useIsActive(id: string) {
	const activeWindow = useWindowManager((state) => state.context.activeWindow);
	return activeWindow.id === id;
}

type WindowStore = ReturnType<typeof initializeWindowStore>;

function initializeWindowStore({ id, ref }: WindowProps) {
	const windowStore = createStore({
		context: {
			id,
			ref,
			mode: "default" as "default" | "closed" | "minimized" | "fullscreen",
			position: { x: 0, y: 0 },
			dimensions: { width: 0, height: 0 },
			dragStartPosition: { x: 0, y: 0 },
		},
		on: {
			activate: {
				id: (context) => {
					if (!context.ref.current) return;
					windowManagerStore.send({ type: "activateWindow", id: context.id });
					const activeWindow = getActiveWindow();
					context.ref.current.style.zIndex = String(activeWindow.zIndex);
					return context.id;
				},
			},
			close: {
				mode: (context, event: { e: MouseEvent }) => {
					event.e.stopPropagation();
					if (context.mode === "fullscreen") {
						exitFullscreen();
					}
					windowManagerStore.send({
						type: "removeFloatingWindow",
						id: context.id,
					});
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
					windowManagerStore.send({
						type: "addFloatingWindow",
						id: context.id,
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
}>;

export function WindowProvider({ id, ref, children }: WindowProps) {
	const [windowStore] = useState(initializeWindowStore({ id, ref }));
	return (
		<WindowContext.Provider value={windowStore}>
			{children}
		</WindowContext.Provider>
	);
}

export function useWindow<T>(
	selector: (snapshot: SnapshotFromStore<WindowStore>) => T,
) {
	const windowStore = useContext(WindowContext);
	if (!windowStore) throw new Error("WindowProvider not found");
	return useSelector(windowStore, selector);
}

export function useWindowAction() {
	const windowStore = useContext(WindowContext);
	if (!windowStore) throw new Error("WindowProvider not found");

	const close = (e: MouseEvent) => windowStore.send({ type: "close", e });
	const toggleMinimize = (e: MouseEvent) =>
		windowStore.send({ type: "toggleMinimize", e });
	const toggleFullscreen = (e: MouseEvent) =>
		windowStore.send({ type: "toggleFullscreen", e });
	const activate = () => windowStore.send({ type: "activate" });
	const startDragging = (e: MouseEvent) =>
		windowStore.send({ type: "startDragging", e });

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
