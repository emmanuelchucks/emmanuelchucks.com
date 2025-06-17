"use client";

import type { WindowStore } from "./window";
import { useSelector } from "@xstate/store/react";
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
        className={`
          fixed bottom-2 left-[50%] mx-auto grid -translate-x-[50%] list-none
          grid-flow-col place-content-center gap-x-2 rounded-xl
          border-neutral-300 bg-neutral-200
          not-empty:border not-empty:px-4 not-empty:py-2
          dark:border-neutral-700 dark:bg-neutral-800
        `}
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
        className={`
          grid place-content-center rounded-md border border-neutral-300
          bg-neutral-50 p-2
          dark:border-neutral-700 dark:bg-neutral-950
        `}
      >
        <span aria-hidden className="text-sm">
          {titleInitials}
        </span>
        <span className="sr-only">Undock</span>
      </button>
    </li>
  );
}
