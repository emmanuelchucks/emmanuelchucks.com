"use client";

import type { BrowserWindowStore } from "./browser-window";
import { useSelector } from "@xstate/store/react";
import { clsx } from "clsx";
import { browserWindowManagerStore, zIndex } from "./browser-window-manager";

export function DockedBrowserWindows() {
  const dockedBrowserWindows = useSelector(
    browserWindowManagerStore,
    (state) => state.context.dockedBrowserWindows,
  );

  const dockedBrowserWindowsArray = Array.from(dockedBrowserWindows);

  return (
    <>
      <h2 className="sr-only">Docked Windows</h2>
      <ul
        style={{ zIndex }}
        className={clsx(
          "mx-auto list-none rounded-xl bg-neutral-200 dark:bg-neutral-800",
          "border-neutral-300 not-empty:border dark:border-neutral-700",
          "fixed bottom-2 left-[50%] -translate-x-[50%] not-empty:px-4 not-empty:py-2",
          "grid grid-flow-col place-content-center gap-x-2",
        )}
      >
        {dockedBrowserWindowsArray.map((dockedBrowserWindow) => {
          const browserWindowId =
            dockedBrowserWindow.getSnapshot().context.browserWindowId;

          return (
            <DockedBrowserWindow
              key={browserWindowId}
              dockedBrowserWindow={dockedBrowserWindow}
            />
          );
        })}
      </ul>
    </>
  );
}

interface DockedBrowserWindowProps {
  dockedBrowserWindow: BrowserWindowStore;
}

function DockedBrowserWindow({
  dockedBrowserWindow,
}: DockedBrowserWindowProps) {
  const dockedBrowserWindowSnapshot = dockedBrowserWindow.getSnapshot();

  const [[firstInitial], [secondInitial]] =
    dockedBrowserWindowSnapshot.context.browserWindowTitle.split(" ");
  const titleInitials = `${firstInitial}${secondInitial}`;

  return (
    <li
      key={dockedBrowserWindowSnapshot.context.browserWindowId}
      className="relative p-0"
    >
      <p className="sr-only">
        {dockedBrowserWindowSnapshot.context.browserWindowTitle}
      </p>
      <button
        type="button"
        onMouseDown={(mouseEvent) =>
          browserWindowManagerStore.trigger.removeDockedBrowserWindow({
            dockedBrowserWindow,
            mouseEvent,
          })
        }
        className={clsx(
          "grid place-content-center",
          "rounded-md bg-neutral-50 p-2 dark:bg-neutral-950",
          "border border-neutral-300 dark:border-neutral-700",
        )}
      >
        <span aria-hidden className="text-sm">
          {titleInitials}
        </span>
        <span className="sr-only">Undock</span>
      </button>
    </li>
  );
}
