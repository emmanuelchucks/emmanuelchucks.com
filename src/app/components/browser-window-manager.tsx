import type { BrowserWindowStore } from "./browser-window";
import { createStore } from "@xstate/store";

export let zIndex = 0;

export const browserWindowManagerStore = createStore({
  context: {
    floatingBrowserWindows: new Set<BrowserWindowStore>(),
    dockedBrowserWindows: new Set<BrowserWindowStore>(),
    activeBrowserWindow: undefined as BrowserWindowStore | undefined,
  },
  on: {
    addFloatingBrowserWindow(
      context,
      event: { browserWindowStore: BrowserWindowStore },
    ) {
      const updatedFloatingBrowserWindows = new Set(
        context.floatingBrowserWindows,
      );

      updatedFloatingBrowserWindows.add(event.browserWindowStore);

      return {
        ...context,
        floatingBrowserWindows: updatedFloatingBrowserWindows,
        activeBrowserWindow: event.browserWindowStore,
      };
    },
    addDockedBrowserWindow(
      context,
      event: { browserWindowStore: BrowserWindowStore },
    ) {
      const nextFloatingBrowserWindow = Array.from(
        context.floatingBrowserWindows,
      ).at(-2);

      const updatedDockedBrowserWindows = new Set(context.dockedBrowserWindows);
      updatedDockedBrowserWindows.add(event.browserWindowStore);

      return {
        ...context,
        dockedBrowserWindows: updatedDockedBrowserWindows,
        activeBrowserWindow: nextFloatingBrowserWindow,
      };
    },
    removeDockedBrowserWindow(
      context,
      event: {
        mouseEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>;
        dockedBrowserWindow: BrowserWindowStore;
      },
      enqueue,
    ) {
      const updatedDockedBrowserWindows = new Set(context.dockedBrowserWindows);
      const updatedFloatingBrowserWindows = new Set(
        context.floatingBrowserWindows,
      );

      updatedDockedBrowserWindows.delete(event.dockedBrowserWindow);

      enqueue.effect(() => {
        event.dockedBrowserWindow.trigger.toggleMinimize({
          mouseEvent: event.mouseEvent,
        });
        browserWindowManagerStore.trigger.activateBrowserWindow({
          browserWindowStore: event.dockedBrowserWindow,
        });
      });

      return {
        ...context,
        floatingBrowserWindows: updatedFloatingBrowserWindows,
        dockedBrowserWindows: updatedDockedBrowserWindows,
        activeBrowserWindow: event.dockedBrowserWindow,
      };
    },
    activateBrowserWindow(
      context,
      event: { browserWindowStore: BrowserWindowStore },
      enqueue,
    ) {
      const newActiveBrowserWindowSnapshot =
        event.browserWindowStore.getSnapshot();

      const newActiveBrowserWindow =
        newActiveBrowserWindowSnapshot.context.browserWindowRef.current;

      if (!newActiveBrowserWindow) {
        return context;
      }

      const updatedFloatingBrowserWindows = new Set(
        context.floatingBrowserWindows,
      );

      enqueue.effect(() => {
        zIndex++;
        newActiveBrowserWindow.style.zIndex = String(zIndex);
      });

      return {
        ...context,
        floatingBrowserWindows: updatedFloatingBrowserWindows,
        activeBrowserWindow: event.browserWindowStore,
      };
    },
  },
});

browserWindowManagerStore.inspect((event) => {
  if (event.type === "@xstate.snapshot" && "context" in event.snapshot) {
    // console.log(event.snapshot.context);
  }
});

export function getIsFloatingBrowserWindow(
  browserWindowStore: BrowserWindowStore,
) {
  const browserWindowManagerSnapshot = browserWindowManagerStore.getSnapshot();
  return browserWindowManagerSnapshot.context.floatingBrowserWindows.has(
    browserWindowStore,
  );
}
