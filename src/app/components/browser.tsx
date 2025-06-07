"use client";

import { useSelector } from "@xstate/store/react";
import { clsx } from "clsx";
import { use } from "react";
import { BrowserWindowContext, useBrowserWindowStore } from "./browser-window";
import { browserWindowManagerStore } from "./browser-window-manager";

export function Browser({
  title,
  children,
}: React.PropsWithChildren<{ title: string }>) {
  const browserWindowStore = useBrowserWindowStore(title);

  return (
    <BrowserWindowContext value={browserWindowStore}>
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
    </BrowserWindowContext>
  );
}

function Placeholder({ children }: React.PropsWithChildren) {
  const browserWindowStore = use(BrowserWindowContext);
  const browserWindowId = useSelector(
    browserWindowStore,
    (state) => state.context.browserWindowId,
  );

  return (
    <div
      id={`${browserWindowId}-placeholder`}
      className={clsx(
        "not-prose relative aspect-square sm:aspect-[4/3]",
        "not-has-data-floating:has-data-closed:hidden",
        "not-has-data-floating:has-data-minimized:aspect-auto",
      )}
    >
      {children}
    </div>
  );
}

function Shell({ children }: React.PropsWithChildren) {
  const browserWindowStore = use(BrowserWindowContext);
  const browserWindowId = useSelector(
    browserWindowStore,
    (state) => state.context.browserWindowId,
  );

  const browserWindowRef = useSelector(
    browserWindowStore,
    (state) => state.context.browserWindowRef,
  );

  const mode = useSelector(browserWindowStore, (state) => state.context.mode);

  const floatingBrowserWindows = useSelector(
    browserWindowManagerStore,
    (state) => state.context.floatingBrowserWindows,
  );

  const activeBrowserWindow = useSelector(
    browserWindowManagerStore,
    (state) => state.context.activeBrowserWindow,
  );

  const isFloatingBrowserWindow =
    floatingBrowserWindows.has(browserWindowStore);

  const isActiveBrowserWindow =
    activeBrowserWindow?.getSnapshot().context.browserWindowId ===
    browserWindowStore.getSnapshot().context.browserWindowId;

  return (
    <figure
      id={browserWindowId}
      ref={browserWindowRef}
      data-closed={mode === "closed" ? "true" : undefined}
      data-minimized={mode === "minimized" ? "true" : undefined}
      data-fullscreen={mode === "fullscreen" ? "true" : undefined}
      data-floating={isFloatingBrowserWindow ? "true" : undefined}
      data-active={isActiveBrowserWindow ? "true" : undefined}
      onFocusCapture={() => {
        browserWindowManagerStore.trigger.activateBrowserWindow({
          browserWindowStore,
        });
      }}
      onMouseDownCapture={() => {
        browserWindowManagerStore.trigger.activateBrowserWindow({
          browserWindowStore,
        });
      }}
      className={clsx(
        "group/shell relative h-full",
        "overflow-clip rounded-md will-change-transform",
        "data-closed:hidden data-floating:data-minimized:hidden",
      )}
    >
      {children}
    </figure>
  );
}

function TopBar({ children }: React.PropsWithChildren) {
  const browserWindowStore = use(BrowserWindowContext);
  const browserWindowTitle = useSelector(
    browserWindowStore,
    (state) => state.context.browserWindowTitle,
  );

  return (
    <div
      onMouseDown={(mouseEvent) => {
        browserWindowStore.trigger.startDragging({ mouseEvent });
      }}
      className={clsx(
        "flex flex-row-reverse items-center justify-end",
        "bg-neutral-200 dark:bg-neutral-800",
      )}
    >
      <figcaption className="group-not-data-minimized/shell:sr-only">
        <span className="sr-only">Demo for </span>
        {browserWindowTitle}
      </figcaption>
      <div
        className={clsx(
          "group/top-bar-buttons flex gap-x-2 p-2",
          "group-data-minimized/shell:p-4",
        )}
      >
        {children}
      </div>
    </div>
  );
}

function CloseButton() {
  const browserWindowStore = use(BrowserWindowContext);

  return (
    <div
      className={clsx(
        "grid size-3 rounded-full bg-red-500 [grid-template-areas:'stack']",
        "group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-300",
        "dark:group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-700",
        "group-data-minimized/shell:hidden",
      )}
    >
      <button
        type="button"
        onMouseDown={(mouseEvent) => {
          browserWindowStore.trigger.close({ mouseEvent });
        }}
        className={clsx(
          "hidden text-red-900 opacity-0 [grid-area:stack] [@media(hover:hover)]:block",
          "group-focus-within/top-bar-buttons:opacity-100 group-hover/top-bar-buttons:opacity-100",
        )}
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
  const browserWindowStore = use(BrowserWindowContext);
  const mode = useSelector(browserWindowStore, (state) => state.context.mode);

  return (
    <div
      className={clsx(
        "grid size-3 rounded-full bg-yellow-500 [grid-template-areas:'stack']",
        "group-data-fullscreen/shell:bg-neutral-300 dark:group-data-fullscreen/shell:bg-neutral-700",
        "group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-300",
        "dark:group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-700",
      )}
    >
      <button
        type="button"
        onMouseDown={(mouseEvent) => {
          browserWindowStore.trigger.toggleMinimize({ mouseEvent });
        }}
        aria-disabled={mode === "fullscreen" ? "true" : undefined}
        className={clsx(
          "peer hidden text-yellow-900 opacity-0 [grid-area:stack]",
          "aria-disabled:hidden not-aria-disabled:[@media(hover:hover)]:block",
          "group-focus-within/top-bar-buttons:opacity-100 group-hover/top-bar-buttons:opacity-100",
        )}
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
  const browserWindowStore = use(BrowserWindowContext);
  const mode = useSelector(browserWindowStore, (state) => state.context.mode);

  return (
    <div
      className={clsx(
        "grid size-3 rounded-full bg-green-500 [grid-template-areas:'stack']",
        "group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-300",
        "dark:group-data-floating/shell:group-not-data-active/shell:group-not-[:hover]/top-bar-buttons:bg-neutral-700",
        "group-data-minimized/shell:hidden",
      )}
    >
      <button
        type="button"
        onMouseDown={(mouseEvent) => {
          browserWindowStore.trigger.toggleFullscreen({ mouseEvent });
        }}
        className={clsx(
          "hidden text-green-900 opacity-0 [grid-area:stack] [@media(hover:hover)]:block",
          "group-focus-within/top-bar-buttons:opacity-100 group-hover/top-bar-buttons:opacity-100",
        )}
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
      className={clsx(
        "h-full overflow-y-auto",
        "bg-neutral-100 dark:bg-neutral-900",
        "group-data-minimized/shell:hidden",
      )}
    >
      {children}
    </div>
  );
}
