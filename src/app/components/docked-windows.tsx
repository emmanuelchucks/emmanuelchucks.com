"use client";

import type { WindowStore } from "./window";
import { useSelector } from "@xstate/store/react";
import { clsx } from "clsx";
import { windowManagerStore, zIndex } from "./window-manager";

export function DockedWindows() {
  const dockedWindows = useSelector(
    windowManagerStore,
    (state) => state.context.dockedWindows,
  );

  const dockedWindowsArray = Array.from(dockedWindows);

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
        {dockedWindowsArray.map((dockedWindow) => {
          const windowId = dockedWindow.getSnapshot().context.windowId;

          return <DockedWindow key={windowId} dockedWindow={dockedWindow} />;
        })}
      </ul>
    </>
  );
}

interface DockedWindowProps {
  dockedWindow: WindowStore;
}

function DockedWindow({ dockedWindow }: DockedWindowProps) {
  const dockedWindowSnapshot = dockedWindow.getSnapshot();

  const [[firstInitial], [secondInitial]] =
    dockedWindowSnapshot.context.windowTitle.split(" ");
  const titleInitials = `${firstInitial}${secondInitial}`;

  return (
    <li key={dockedWindowSnapshot.context.windowId} className="relative p-0">
      <p className="sr-only">{dockedWindowSnapshot.context.windowTitle}</p>
      <button
        type="button"
        onMouseDown={(mouseEvent) =>
          windowManagerStore.trigger.removeDockedWindow({
            dockedWindow,
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
