import {
  and,
  createCollection,
  createLiveQueryCollection,
  localOnlyCollectionOptions,
  not,
} from "@tanstack/react-db";
import * as v from "valibot";

const schema = v.object({
  id: v.string(),
  title: v.string(),
  mode: v.picklist(["default", "closed", "minimized", "fullscreen"]),
  scrollY: v.number(),
  movement: v.object({
    x: v.number(),
    y: v.number(),
  }),
  floatedAt: v.optional(v.number()),
  dockedAt: v.optional(v.number()),
  activeAt: v.optional(v.number()),
});

export const windowsCollection = createCollection(
  localOnlyCollectionOptions({
    schema,
    getKey: (window) => window.id,
  }),
);

export const floatingWindowsCollection = createLiveQueryCollection((q) =>
  q
    .from({ window: windowsCollection })
    .where(({ window }) => and(window.floatedAt, not(window.dockedAt)))
    .orderBy(({ window }) => window.floatedAt, "desc"),
);

export function initializeWindow({
  id,
  title,
}: {
  id: string;
  title: string;
}): void {
  windowsCollection.insert({
    id,
    title,
    mode: "default",
    scrollY: 0,
    movement: { x: 0, y: 0 },
  });
}

export function activateWindow(id: string): void {
  windowsCollection.update(id, (draft) => {
    draft.activeAt = Date.now();
  });
}

export function toggleCloseWindow(id: string): void {
  windowsCollection.update(id, (draft) => {
    if (draft.mode === "fullscreen") {
      exitFullscreen();
    }

    draft.mode = "closed";
  });
}

export function toggleMinimizeWindow(
  id: string,
  ref: React.RefObject<HTMLElement>,
): void {
  windowsCollection.update(id, (draft) => {
    if (draft.mode === "fullscreen") {
      return;
    }

    if (draft.mode === "minimized") {
      const scrollDelta = window.scrollY - draft.scrollY;
      draft.movement.y = draft.movement.y + scrollDelta;

      requestAnimationFrame(() => {
        ref.current.style.transform = `translate3d(${String(draft.movement.x)}px, ${String(draft.movement.y)}px, 0)`;
      });

      draft.mode = "default";
      return;
    }

    if (draft.floatedAt) {
      draft.dockedAt = Date.now();
      const nextFloatingWindow = floatingWindowsCollection.toArray[1];
      windowsCollection.update(nextFloatingWindow.id, (draft) => {
        draft.activeAt = Date.now();
      });
    }

    draft.scrollY = window.scrollY;
    draft.mode = "minimized";
  });
}

export function toggleFullscreenWindow(
  id: string,
  ref: React.RefObject<HTMLElement>,
): void {
  windowsCollection.update(id, (draft) => {
    if (draft.mode === "fullscreen") {
      exitFullscreen();
      draft.mode = "default";
      return;
    }

    requestFullscreen(ref.current);
    draft.mode = "fullscreen";
  });
}

export function startDraggingWindow(
  id: string,
  ref: React.RefObject<HTMLDivElement>,
): void {
  windowsCollection.update(id, (draft) => {
    if (draft.mode !== "default") {
      return;
    }

    const onMouseMove = (
      mouseEvent: MouseEvent | React.MouseEvent<HTMLButtonElement>,
    ) => {
      draft.movement.x = draft.movement.x + mouseEvent.movementX;
      draft.movement.y = draft.movement.y + mouseEvent.movementY;

      requestAnimationFrame(() => {
        ref.current.style.transform = `translate3d(${String(draft.movement.x)}px, ${String(draft.movement.y)}px, 0)`;
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

    draft.floatedAt = Date.now();
    draft.activeAt = Date.now();
  });
}

function exitFullscreen() {
  document.documentElement.classList.remove("[scrollbar-gutter:stable]");
  void document.exitFullscreen();
}

function requestFullscreen(element = document.documentElement) {
  document.documentElement.classList.remove("[scrollbar-gutter:stable]");
  void element.requestFullscreen();
}
