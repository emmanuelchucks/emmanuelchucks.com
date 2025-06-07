import { useStore } from "@xstate/store/react";
import { createContext, useId, useRef } from "react";
import {
  browserWindowManagerStore,
  getIsFloatingBrowserWindow,
} from "./browser-window-manager";

export type BrowserWindowStore = ReturnType<typeof useBrowserWindowStore>;

export function useBrowserWindowStore(browserWindowTitle: string) {
  const browserWindowId = useId();
  const browserWindowRef = useRef<HTMLElement>(null);
  const windowScrollYRef = useRef(0);
  const movementXRef = useRef(0);
  const movementYRef = useRef(0);

  const browserWindowStore = useStore({
    context: {
      browserWindowId,
      browserWindowRef,
      browserWindowTitle,
      mode: "default" as "default" | "closed" | "minimized" | "fullscreen",
    },
    on: {
      close(
        context,
        event: { mouseEvent: React.MouseEvent<HTMLButtonElement, MouseEvent> },
        enqueue,
      ) {
        enqueue.effect(() => {
          event.mouseEvent.stopPropagation();

          if (context.mode === "fullscreen") {
            exitFullscreen();
          }
        });

        return {
          ...context,
          mode: "closed" as const,
        };
      },
      toggleMinimize(
        context,
        event: { mouseEvent: React.MouseEvent<HTMLButtonElement, MouseEvent> },
        enqueue,
      ) {
        enqueue.effect(() => {
          event.mouseEvent.stopPropagation();
        });

        if (context.mode === "fullscreen") {
          return context;
        }

        if (context.mode === "minimized") {
          enqueue.effect(() => {
            if (!context.browserWindowRef.current) return;
            const scrollDelta = window.scrollY - windowScrollYRef.current;
            windowScrollYRef.current = windowScrollYRef.current + scrollDelta;
            context.browserWindowRef.current.style.transform = `translate(${movementXRef.current}px, ${movementYRef.current}px)`;
          });

          return {
            ...context,
            mode: "default" as const,
          };
        }

        enqueue.effect(() => {
          if (getIsFloatingBrowserWindow(browserWindowStore)) {
            browserWindowManagerStore.trigger.addDockedBrowserWindow({
              browserWindowStore,
            });
          }

          windowScrollYRef.current = window.scrollY;
        });

        return {
          ...context,
          mode: "minimized" as const,
        };
      },
      toggleFullscreen(
        context,
        event: { mouseEvent: React.MouseEvent<HTMLButtonElement, MouseEvent> },
        enqueue,
      ) {
        enqueue.effect(() => {
          event.mouseEvent.stopPropagation();
        });

        if (!context.browserWindowRef.current) {
          return context;
        }

        if (context.mode === "fullscreen") {
          enqueue.effect(() => {
            exitFullscreen();
          });

          return {
            ...context,
            mode: "default" as const,
          };
        }

        enqueue.effect(() => {
          if (!context.browserWindowRef.current) return;
          requestFullscreen(context.browserWindowRef.current);
        });

        return {
          ...context,
          mode: "fullscreen" as const,
        };
      },
      startDragging(
        context,
        event: { mouseEvent: React.MouseEvent<HTMLDivElement, MouseEvent> },
        enqueue,
      ) {
        enqueue.effect(() => {
          event.mouseEvent.stopPropagation();
        });

        if (
          context.mode !== "default" ||
          event.mouseEvent.target !== event.mouseEvent.currentTarget
        ) {
          return context;
        }

        enqueue.effect(() => {
          const onMouseMove = (
            mouseEvent:
              | MouseEvent
              | React.MouseEvent<HTMLButtonElement, MouseEvent>,
          ) => {
            if (!context.browserWindowRef.current) return;
            movementXRef.current = movementXRef.current + mouseEvent.movementX;
            movementYRef.current = movementYRef.current + mouseEvent.movementY;
            context.browserWindowRef.current.style.transform = `translate(${movementXRef.current}px, ${movementYRef.current}px)`;
          };

          document.body.setAttribute("inert", "true");
          const controller = new AbortController();

          const onMouseUp = () => {
            document.body.removeAttribute("inert");
            controller.abort();
          };

          document.addEventListener("mousemove", onMouseMove, {
            signal: controller.signal,
          });

          document.addEventListener("mouseup", onMouseUp, {
            signal: controller.signal,
          });

          if (!getIsFloatingBrowserWindow(browserWindowStore)) {
            browserWindowManagerStore.trigger.addFloatingBrowserWindow({
              browserWindowStore,
            });
          }
        });

        return context;
      },
    },
  });

  return browserWindowStore;
}

export const BrowserWindowContext = createContext({} as BrowserWindowStore);

function exitFullscreen() {
  document.documentElement.classList.remove("[scrollbar-gutter:stable]");
  void document.exitFullscreen();
}

function requestFullscreen(element = document.documentElement) {
  document.documentElement.classList.remove("[scrollbar-gutter:stable]");
  void element.requestFullscreen();
}
