import type { WindowStore } from "./window";
import { createAtom } from "@xstate/store";

export const zIndexAtom = createAtom(0);
export const floatingWindowsAtom = createAtom(new Set<WindowStore>());
export const dockedWindowsAtom = createAtom(new Set<WindowStore>());
export const activeWindowAtom = createAtom<WindowStore | undefined>(undefined);

export function addFloatingWindow(windowStore: WindowStore) {
  const currentFloatingWindows = floatingWindowsAtom.get();
  const updatedFloatingWindows = new Set(currentFloatingWindows);

  updatedFloatingWindows.add(windowStore);
  floatingWindowsAtom.set(updatedFloatingWindows);
  activeWindowAtom.set(windowStore);
}

export function addDockedWindow(windowStore: WindowStore) {
  const currentFloatingWindows = floatingWindowsAtom.get();
  const currentDockedWindows = dockedWindowsAtom.get();
  const floatingWindowsArray = Array.from(currentFloatingWindows);
  const currentWindowIndex = floatingWindowsArray.indexOf(windowStore);
  const remainingWindows = floatingWindowsArray.filter(
    (_, index) => index !== currentWindowIndex,
  );

  const nextFloatingWindow = remainingWindows.at(-1);
  const updatedDockedWindows = new Set(currentDockedWindows);

  updatedDockedWindows.add(windowStore);
  dockedWindowsAtom.set(updatedDockedWindows);
  activeWindowAtom.set(nextFloatingWindow);
}

export function removeDockedWindow(
  mouseEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  dockedWindow: WindowStore,
) {
  const currentDockedWindows = dockedWindowsAtom.get();
  const updatedDockedWindows = new Set(currentDockedWindows);

  updatedDockedWindows.delete(dockedWindow);
  dockedWindowsAtom.set(updatedDockedWindows);
  activeWindowAtom.set(dockedWindow);

  dockedWindow.trigger.toggleMinimize({ mouseEvent });
}

export function activateWindow(windowStore: WindowStore) {
  const newActiveWindowSnapshot = windowStore.getSnapshot();
  const newActiveWindow = newActiveWindowSnapshot.context.windowRef.current;

  if (!newActiveWindow) return;

  zIndexAtom.set((value) => value + 1);
  newActiveWindow.style.zIndex = String(zIndexAtom.get());
  activeWindowAtom.set(windowStore);
}

export function getIsFloatingWindow(windowStore: WindowStore) {
  const floatingWindows = floatingWindowsAtom.get();
  return floatingWindows.has(windowStore);
}
