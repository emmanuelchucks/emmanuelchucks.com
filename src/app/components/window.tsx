import { useStore } from "@xstate/store/react";
import { createContext, useId, useRef } from "react";
import { getIsFloatingWindow, windowManagerStore } from "./window-manager";

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
            const scrollDelta = window.scrollY - windowScrollRef.current.y;
            movementRef.current.y = movementRef.current.y + scrollDelta;

            requestAnimationFrame(() => {
              if (!context.windowRef.current) return;
              context.windowRef.current.style.transform = `translate3d(${movementRef.current.x}px, ${movementRef.current.y}px, 0)`;
            });
          });

          return {
            ...context,
            mode: "default" as const,
          };
        }

        enqueue.effect(() => {
          if (getIsFloatingWindow(windowStore)) {
            windowManagerStore.trigger.addDockedWindow({
              windowStore,
            });
          }

          windowScrollRef.current.y = window.scrollY;
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
          if (!context.windowRef.current) return;
          requestFullscreen(context.windowRef.current);
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
            movementRef.current.x =
              movementRef.current.x + mouseEvent.movementX;
            movementRef.current.y =
              movementRef.current.y + mouseEvent.movementY;

            requestAnimationFrame(() => {
              if (!context.windowRef.current) return;
              context.windowRef.current.style.transform = `translate3d(${movementRef.current.x}px, ${movementRef.current.y}px, 0)`;
            });
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

          if (!getIsFloatingWindow(windowStore)) {
            windowManagerStore.trigger.addFloatingWindow({
              windowStore,
            });
          }
        });

        return context;
      },
    },
  });

  return windowStore;
}

export const WindowContext = createContext({} as WindowStore);

function exitFullscreen() {
  document.documentElement.classList.remove("[scrollbar-gutter:stable]");
  void document.exitFullscreen();
}

function requestFullscreen(element = document.documentElement) {
  document.documentElement.classList.remove("[scrollbar-gutter:stable]");
  void element.requestFullscreen();
}
