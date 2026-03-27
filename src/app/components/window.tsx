import { useStore } from "@xstate/store/react";
import { createContext, use, useId, useRef } from "react";
import { addDockedWindow, addFloatingWindow, getIsFloatingWindow } from "./window-manager";

export type WindowStore = ReturnType<typeof useWindowStore>;

export function useWindowStore(windowTitle: string) {
  const windowId = useId();
  const windowRef = useRef<HTMLElement>(null);
  const windowScrollRef = useRef({ y: 0 });
  const movementRef = useRef({ x: 0, y: 0 });

  const windowStore = useStore({
    context: {
      windowId,
      windowRef,
      windowTitle,
      mode: "default" as "default" | "closed" | "minimized" | "fullscreen",
    },
    on: {
      close(context, event: { mouseEvent: React.MouseEvent<HTMLButtonElement> }, enqueue) {
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
      toggleMinimize(context, event: { mouseEvent: React.MouseEvent<HTMLButtonElement> }, enqueue) {
        enqueue.effect(() => {
          event.mouseEvent.stopPropagation();
        });

        if (context.mode === "fullscreen") {
          return context;
        }

        if (context.mode === "minimized") {
          enqueue.effect(() => {
            const scrollDelta = globalThis.scrollY - windowScrollRef.current.y;
            const windowElement = context.windowRef.current;
            movementRef.current.y += scrollDelta;

            globalThis.requestAnimationFrame(() => {
              if (!windowElement) {
                return;
              }
              windowElement.style.transform = `translate3d(${String(movementRef.current.x)}px, ${String(movementRef.current.y)}px, 0)`;
            });
          });

          return {
            ...context,
            mode: "default" as const,
          };
        }

        enqueue.effect(() => {
          if (getIsFloatingWindow(windowStore)) {
            addDockedWindow(windowStore);
          }

          windowScrollRef.current.y = globalThis.scrollY;
        });

        return {
          ...context,
          mode: "minimized" as const,
        };
      },
      toggleFullscreen(
        context,
        event: { mouseEvent: React.MouseEvent<HTMLButtonElement> },
        enqueue,
      ) {
        enqueue.effect(() => {
          event.mouseEvent.stopPropagation();
        });

        if (!context.windowRef.current) {
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
          if (!context.windowRef.current) {
            return;
          }
          requestFullscreen(context.windowRef.current);
        });

        return {
          ...context,
          mode: "fullscreen" as const,
        };
      },
      startDragging(context, event: { mouseEvent: React.MouseEvent<HTMLDivElement> }, enqueue) {
        enqueue.effect(() => {
          event.mouseEvent.stopPropagation();
        });

        if (
          context.mode !== "default" ||
          event.mouseEvent.target !== event.mouseEvent.currentTarget
        ) {
          return context;
        }

        const onMouseMove = (mouseEvent: MouseEvent | React.MouseEvent<HTMLButtonElement>) => {
          const windowElement = context.windowRef.current;
          movementRef.current.x += mouseEvent.movementX;
          movementRef.current.y += mouseEvent.movementY;

          globalThis.requestAnimationFrame(() => {
            if (!windowElement) {
              return;
            }
            windowElement.style.transform = `translate3d(${String(movementRef.current.x)}px, ${String(movementRef.current.y)}px, 0)`;
          });
        };

        enqueue.effect(() => {
          globalThis.document.body.setAttribute("inert", "true");
          const controller = new globalThis.AbortController();

          const onMouseUp = () => {
            globalThis.document.body.removeAttribute("inert");
            controller.abort();
          };

          globalThis.document.addEventListener("mousemove", onMouseMove, {
            signal: controller.signal,
          });

          globalThis.document.addEventListener("mouseup", onMouseUp, {
            signal: controller.signal,
          });

          if (!getIsFloatingWindow(windowStore)) {
            addFloatingWindow(windowStore);
          }
        });

        return context;
      },
    },
  });

  return windowStore;
}

export const WindowContext = createContext<WindowStore | undefined>(undefined);

export function useWindowContext() {
  const windowStore = use(WindowContext);

  if (windowStore === undefined) {
    throw new Error("WindowContext is missing");
  }

  return windowStore;
}

function exitFullscreen() {
  globalThis.document.documentElement.classList.remove("[scrollbar-gutter:stable]");
  void globalThis.document.exitFullscreen();
}

function requestFullscreen(element = globalThis.document.documentElement) {
  globalThis.document.documentElement.classList.remove("[scrollbar-gutter:stable]");
  void element.requestFullscreen();
}
