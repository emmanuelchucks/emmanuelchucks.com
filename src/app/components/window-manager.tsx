import type { WindowStore } from "./window";
import { createAtom } from "@xstate/store";

export const zIndexAtom = createAtom(0);
export const floatingWindowsAtom = createAtom(new Set<WindowStore>());
export const dockedWindowsAtom = createAtom(new Set<WindowStore>());
export const activeWindowAtom = createAtom<WindowStore>({} as WindowStore);

export function addFloatingWindow(windowStore: WindowStore): void {
  const currentFloatingWindows = floatingWindowsAtom.get();
  const updatedFloatingWindows = new Set(currentFloatingWindows);

  updatedFloatingWindows.add(windowStore);
  floatingWindowsAtom.set(updatedFloatingWindows);
  activeWindowAtom.set(windowStore);
}

export function addDockedWindow(windowStore: WindowStore): void {
  const currentFloatingWindows = floatingWindowsAtom.get();
  const currentDockedWindows = dockedWindowsAtom.get();
  const floatingWindowsArray = [...currentFloatingWindows];
  const currentWindowIndex = floatingWindowsArray.indexOf(windowStore);
  const remainingWindows = floatingWindowsArray.filter(
    (_, index) => index !== currentWindowIndex,
  );

  const nextFloatingWindow = remainingWindows.at(-1);
  const updatedDockedWindows = new Set(currentDockedWindows);

  updatedDockedWindows.add(windowStore);
  dockedWindowsAtom.set(updatedDockedWindows);

  if (nextFloatingWindow) {
    activeWindowAtom.set(nextFloatingWindow);
  }
}

export function removeDockedWindow(
  mouseEvent: React.MouseEvent<HTMLButtonElement>,
  dockedWindow: WindowStore,
): void {
  const currentDockedWindows = dockedWindowsAtom.get();
  const updatedDockedWindows = new Set(currentDockedWindows);

  updatedDockedWindows.delete(dockedWindow);
  dockedWindowsAtom.set(updatedDockedWindows);
  activeWindowAtom.set(dockedWindow);

  dockedWindow.trigger.toggleMinimize({ mouseEvent });
}

export function activateWindow(windowStore: WindowStore): void {
  const newActiveWindowSnapshot = windowStore.getSnapshot();
  const newActiveWindow = newActiveWindowSnapshot.context.windowRef.current;

  if (!newActiveWindow) return;

  zIndexAtom.set((value) => value + 1);
  newActiveWindow.style.zIndex = String(zIndexAtom.get());
  activeWindowAtom.set(windowStore);
}

export function getIsFloatingWindow(windowStore: WindowStore): boolean {
  const floatingWindows = floatingWindowsAtom.get();
  return floatingWindows.has(windowStore);
}
