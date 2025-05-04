import type { WindowStore } from "./window";
import { createStore } from "@xstate/store";

export const windowManagerStore = createStore({
	context: {
		floatingWindows: new Set<WindowStore>(),
		dockedWindows: new Set<WindowStore>(),
		activeWindow: undefined as WindowStore | undefined,
	},
	on: {
		addFloatingWindow(context, event: { windowStore: WindowStore }) {
			const updatedFloatingWindows = new Set(context.floatingWindows);

			updatedFloatingWindows.add(event.windowStore);

			return {
				...context,
				floatingWindows: updatedFloatingWindows,
				activeWindow: event.windowStore,
			};
		},
		addDockedWindow(context, event: { windowStore: WindowStore }) {
			const nextFloatingWindow = [...context.floatingWindows].at(-2);
			const updatedDockedWindows = new Set(context.dockedWindows);

			updatedDockedWindows.add(event.windowStore);

			return {
				...context,
				dockedWindows: updatedDockedWindows,
				activeWindow: nextFloatingWindow,
			};
		},
		removeDockedWindow(
			context,
			event: { e: MouseEvent; dockedWindow: WindowStore },
		) {
			const updatedDockedWindows = new Set(context.dockedWindows);
			const updatedFloatingWindows = new Set(context.floatingWindows);

			updatedDockedWindows.delete(event.dockedWindow);
			event.dockedWindow.trigger.toggleMinimize({ e: event.e });

			return {
				...context,
				floatingWindows: updatedFloatingWindows,
				dockedWindows: updatedDockedWindows,
				activeWindow: event.dockedWindow,
			};
		},
		activateWindow(context, event: { windowStore: WindowStore }) {
			const currentActiveWindowSnapshot = context.activeWindow?.getSnapshot();
			const newActiveWindowSnapshot = event.windowStore.getSnapshot();

			const newZIndex = getIsActiveWindow(event.windowStore)
				? newActiveWindowSnapshot.context.zIndex
				: (currentActiveWindowSnapshot?.context.zIndex ?? 0) + 1;

			const newActiveWindow = newActiveWindowSnapshot.context.ref.current;

			if (!newActiveWindow) {
				return context;
			}

			const updatedFloatingWindows = new Set(context.floatingWindows);

			newActiveWindow.style.zIndex = String(newZIndex);
			event.windowStore.trigger.setZIndex({ zIndex: newZIndex });

			return {
				...context,
				floatingWindows: updatedFloatingWindows,
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

export function getIsFloatingWindow(windowStore: WindowStore) {
	const windowManagerSnapshot = windowManagerStore.getSnapshot();
	return windowManagerSnapshot.context.floatingWindows.has(windowStore);
}

export function getIsActiveWindow(windowStore: WindowStore) {
	const windowManagerSnapshot = windowManagerStore.getSnapshot();
	const activeWindowSnapshot =
		windowManagerSnapshot.context.activeWindow?.getSnapshot();
	return (
		activeWindowSnapshot?.context.id === windowStore.getSnapshot().context.id
	);
}
