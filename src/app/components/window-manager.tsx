import type { WindowStore } from "./window";
import { createStore } from "@xstate/store";

export let zIndex = 0;

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
      const nextFloatingWindow = Array.from(context.floatingWindows).at(-2);

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
      event: {
        mouseEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>;
        dockedWindow: WindowStore;
      },
      enqueue,
    ) {
      const updatedDockedWindows = new Set(context.dockedWindows);
      const updatedFloatingWindows = new Set(context.floatingWindows);

      updatedDockedWindows.delete(event.dockedWindow);

      enqueue.effect(() => {
        event.dockedWindow.trigger.toggleMinimize({
          mouseEvent: event.mouseEvent,
        });
        windowManagerStore.trigger.activateWindow({
          windowStore: event.dockedWindow,
        });
      });

      return {
        ...context,
        floatingWindows: updatedFloatingWindows,
        dockedWindows: updatedDockedWindows,
        activeWindow: event.dockedWindow,
      };
    },
    activateWindow(context, event: { windowStore: WindowStore }, enqueue) {
      const newActiveWindowSnapshot = event.windowStore.getSnapshot();

      const newActiveWindow = newActiveWindowSnapshot.context.windowRef.current;

      if (!newActiveWindow) {
        return context;
      }

      const updatedFloatingWindows = new Set(context.floatingWindows);

      enqueue.effect(() => {
        zIndex++;
        newActiveWindow.style.zIndex = String(zIndex);
      });

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

export function getIsFloatingWindow(WindowStore: WindowStore) {
  const windowManagerSnapshot = windowManagerStore.getSnapshot();
  return windowManagerSnapshot.context.floatingWindows.has(WindowStore);
}
