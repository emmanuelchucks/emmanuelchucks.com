"use client";

import { useAtom, useSelector } from "@xstate/store/react";
import { use } from "react";
import { useWindowStore, WindowContext } from "./window";
import {
  activateWindow,
  activeWindowAtom,
  floatingWindowsAtom,
} from "./window-manager";

export function Browser({
  title,
  children,
}: React.PropsWithChildren<{ title: string }>) {
  const windowStore = useWindowStore(title);

  return (
    <WindowContext value={windowStore}>
      <Placeholder>
        <Shell>
          <TopBar>
            <CloseButton />
            <MinimizeButton />
            <FullscreenButton />
          </TopBar>
          <Content>{children}</Content>
        </Shell>
      </Placeholder>
    </WindowContext>
  );
}

function Placeholder({ children }: React.PropsWithChildren) {
  const windowStore = use(WindowContext);
  const windowId = useSelector(windowStore, (state) => state.context.windowId);

  return (
    <div
      id={`${windowId}-placeholder`}
      className={`
        not-prose relative aspect-square
        not-has-data-floating:has-data-closed:hidden
        not-has-data-floating:has-data-minimized:aspect-auto
        sm:aspect-[4/3]
      `}
    >
      {children}
    </div>
  );
}

function Shell({ children }: React.PropsWithChildren) {
  const windowStore = use(WindowContext);
  const windowId = useSelector(windowStore, (state) => state.context.windowId);
  const mode = useSelector(windowStore, (state) => state.context.mode);
  const windowRef = useSelector(
    windowStore,
    (state) => state.context.windowRef,
  );

  const floatingWindows = useAtom(floatingWindowsAtom);
  const activeWindow = useAtom(activeWindowAtom);

  const isFloatingWindow = floatingWindows.has(windowStore);

  const isActiveWindow =
    activeWindow?.getSnapshot().context.windowId ===
    windowStore.getSnapshot().context.windowId;

  return (
    <figure
      id={windowId}
      ref={windowRef}
      data-closed={mode === "closed" ? "true" : undefined}
      data-minimized={mode === "minimized" ? "true" : undefined}
      data-fullscreen={mode === "fullscreen" ? "true" : undefined}
      data-floating={isFloatingWindow ? "true" : undefined}
      data-active={isActiveWindow ? "true" : undefined}
      onFocusCapture={() => {
        activateWindow(windowStore);
      }}
      onMouseDownCapture={() => {
        activateWindow(windowStore);
      }}
      className={`
        group/shell relative h-full overflow-clip rounded-md
        will-change-transform
        data-closed:hidden
        data-floating:data-minimized:hidden
      `}
    >
      {children}
    </figure>
  );
}

function TopBar({ children }: React.PropsWithChildren) {
  const windowStore = use(WindowContext);
  const windowTitle = useSelector(
    windowStore,
    (state) => state.context.windowTitle,
  );

  return (
    <div
      onMouseDown={(mouseEvent) => {
        windowStore.trigger.startDragging({ mouseEvent });
      }}
      className={`
        flex flex-row-reverse items-center justify-end bg-neutral-200
        dark:bg-neutral-800
      `}
    >
      <figcaption className="group-not-data-minimized/shell:sr-only">
        <span className="sr-only">Demo for </span>
        {windowTitle}
      </figcaption>
      <div
        className={`
          group/top-bar-buttons flex gap-x-2 p-2
          group-data-minimized/shell:p-4
        `}
      >
        {children}
      </div>
    </div>
  );
}

function CloseButton() {
  const windowStore = use(WindowContext);

  return (
    <div
      className={`
        grid size-3 rounded-full bg-red-500
        [grid-template-areas:'stack']
        group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-300
        group-data-minimized/shell:hidden
        dark:group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-700
      `}
    >
      <button
        type="button"
        onMouseDown={(mouseEvent) => {
          windowStore.trigger.close({ mouseEvent });
        }}
        className={`
          hidden text-red-900 opacity-0
          [grid-area:stack]
          group-focus-within/top-bar-buttons:opacity-100
          group-hover/top-bar-buttons:opacity-100
          has-hover:block
        `}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <title>Close</title>
          <path
            fill="currentColor"
            d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94z"
          />
        </svg>
      </button>
    </div>
  );
}

function MinimizeButton() {
  const windowStore = use(WindowContext);
  const mode = useSelector(windowStore, (state) => state.context.mode);

  return (
    <div
      className={`
        grid size-3 rounded-full bg-yellow-500
        [grid-template-areas:'stack']
        group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-300
        group-data-fullscreen/shell:bg-neutral-300
        dark:group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-700
        dark:group-data-fullscreen/shell:bg-neutral-700
      `}
    >
      <button
        type="button"
        onMouseDown={(mouseEvent) => {
          windowStore.trigger.toggleMinimize({ mouseEvent });
        }}
        aria-disabled={mode === "fullscreen" ? "true" : undefined}
        className={`
          peer hidden text-yellow-900 opacity-0
          [grid-area:stack]
          group-focus-within/top-bar-buttons:opacity-100
          group-hover/top-bar-buttons:opacity-100
          aria-disabled:hidden
          not-aria-disabled:[@media(hover:hover)]:block
        `}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <title>{mode === "minimized" ? "Restore" : "Minimize"}</title>
          <path
            fill="currentColor"
            d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5z"
          />
        </svg>
      </button>
    </div>
  );
}

function FullscreenButton() {
  const windowStore = use(WindowContext);
  const mode = useSelector(windowStore, (state) => state.context.mode);

  return (
    <div
      className={`
        grid size-3 rounded-full bg-green-500
        [grid-template-areas:'stack']
        group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-300
        group-data-minimized/shell:hidden
        dark:group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-700
      `}
    >
      <button
        type="button"
        onMouseDown={(mouseEvent) => {
          windowStore.trigger.toggleFullscreen({ mouseEvent });
        }}
        className={`
          hidden text-green-900 opacity-0
          [grid-area:stack]
          group-focus-within/top-bar-buttons:opacity-100
          group-hover/top-bar-buttons:opacity-100
          has-hover:block
        `}
      >
        {mode === "fullscreen" ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <title>Exit fullscreen</title>
            <path fill="currentColor" d="M4 4h6l-6 6V4z" />
            <path fill="currentColor" d="M12 12H6l6-6v6z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <title>Enter fullscreen</title>
            <path fill="currentColor" d="M4 4h6l-6 6V4z" />
            <path fill="currentColor" d="M12 12H6l6-6v6z" />
          </svg>
        )}
      </button>
    </div>
  );
}

function Content({ children }: React.PropsWithChildren) {
  return (
    <div
      className={`
        h-full overflow-y-auto bg-neutral-100
        group-data-minimized/shell:hidden
        dark:bg-neutral-900
      `}
    >
      {children}
    </div>
  );
}
