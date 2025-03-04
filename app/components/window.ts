import { createStore } from "@xstate/store";
import {
	type PropsWithChildren,
	type RefObject,
	createContext,
	jsx,
	useContext,
	useState,
} from "hono/jsx";
import type { HtmlEscapedString } from "hono/utils/html";
import { getIsFloatingWindow, windowManagerStore } from "./window-manager";

export type WindowStore = ReturnType<typeof initializeWindowStore>;

function initializeWindowStore({ id, ref, title }: WindowProps) {
	const windowStore = createStore({
		context: {
			id,
			ref,
			title,
			zIndex: 0,
			windowScrollY: 0,
			movement: { x: 0, y: 0 },
			mode: "default" as
				| "default"
				| "closed"
				| "minimized"
				| "fullscreen",
		},
		on: {
			setZIndex(context, event: { zIndex: number }) {
				return {
					...context,
					zIndex: event.zIndex,
				};
			},
			close(context, event: { e: MouseEvent }) {
				event.e.stopPropagation();

				if (context.mode === "fullscreen") {
					exitFullscreen();
				}

				return {
					...context,
					mode: "closed" as const,
				};
			},
			toggleMinimize(context, event: { e: MouseEvent }) {
				event.e.stopPropagation();

				if (!context.ref.current || context.mode === "fullscreen") {
					return context;
				}

				if (context.mode === "minimized") {
					const scrollDelta = window.scrollY - context.windowScrollY;
					context.movement.y = context.movement.y + scrollDelta;
					context.ref.current.style.transform = `translate(${context.movement.x}px, ${context.movement.y}px)`;

					return {
						...context,
						mode: "default" as const,
					};
				}

				if (getIsFloatingWindow(windowStore)) {
					windowManagerStore.trigger.addDockedWindow({ windowStore });
				}

				context.windowScrollY = window.scrollY;

				return {
					...context,
					mode: "minimized" as const,
				};
			},
			toggleFullscreen(context, event: { e: MouseEvent }) {
				event.e.stopPropagation();

				if (!context.ref.current) {
					return context;
				}

				if (context.mode === "fullscreen") {
					exitFullscreen();

					return {
						...context,
						mode: "default" as const,
					};
				}

				requestFullscreen(context.ref.current);

				return {
					...context,
					mode: "fullscreen" as const,
				};
			},
			startDragging(context, event: { e: MouseEvent }) {
				event.e.stopPropagation();

				if (
					context.mode !== "default" ||
					event.e.target !== event.e.currentTarget
				) {
					return context;
				}

				const onMouseMove = (e: MouseEvent) => {
					if (!context.ref.current) {
						return context;
					}

					context.movement.x = context.movement.x + e.movementX;
					context.movement.y = context.movement.y + e.movementY;
					context.ref.current.style.transform = `translate(${context.movement.x}px, ${context.movement.y}px)`;
				};

				document.body.setAttribute("inert", "true");
				const controller = new AbortController();

				const onMouseUp = () => {
					document.body.removeAttribute("inert");
					controller.abort();
				};

				document.addEventListener("mousemove", onMouseMove, {
					signal: controller.signal,
				});

				document.addEventListener("mouseup", onMouseUp, {
					signal: controller.signal,
				});

				if (!getIsFloatingWindow(windowStore)) {
					windowManagerStore.trigger.addFloatingWindow({
						windowStore,
					});
				}

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

export function useWindowContext() {
	const windowStore = useContext(WindowContext);

	if (!windowStore) {
		throw new Error("WindowProvider not found");
	}

	return windowStore;
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
