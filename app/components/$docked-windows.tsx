import type { WindowStore } from "./window";
import { useSelector } from "@xstate/store/react";
import { cx } from "hono/css";
import { windowManagerStore } from "./window-manager";

export function DockedWindows() {
	const activeWindow = useSelector(
		windowManagerStore,
		(state) => state.context.activeWindow,
	);
	const dockedWindows = useSelector(
		windowManagerStore,
		(state) => state.context.dockedWindows,
	);

	const dockedWindowsArray = [...dockedWindows];

	return (
		<aside>
			<h2 class="sr-only">Docked Windows</h2>
			<ul
				style={{ zIndex: activeWindow?.getSnapshot().context.zIndex }}
				class={cx(
					"mx-auto rounded-xl bg-neutral-200 dark:bg-neutral-800",
					"border-neutral-300 not-empty:border dark:border-neutral-700",
					"fixed bottom-2 left-[50%] -translate-x-[50%] not-empty:px-4 not-empty:py-2",
					"grid grid-flow-col place-content-center gap-x-2",
				)}
			>
				{dockedWindowsArray.map((dockedWindow) => (
					<DockedWindow
						key={dockedWindow.getSnapshot().context.id}
						dockedWindow={dockedWindow}
					/>
				))}
			</ul>
		</aside>
	);
}

function DockedWindow({ dockedWindow }: { dockedWindow: WindowStore }) {
	const dockedWindowSnapshot = dockedWindow.getSnapshot();

	const [[firstInitial], [secondInitial]] =
		dockedWindowSnapshot.context.title.split(" ");
	const titleInitials = `${firstInitial}${secondInitial}`;

	return (
		<li key={dockedWindowSnapshot.context.id} class="relative">
			<p class="sr-only">{dockedWindowSnapshot.context.title}</p>
			<button
				type="button"
				onMouseDown={(e) =>
					windowManagerStore.trigger.removeDockedWindow({
						dockedWindow,
						e,
					})
				}
				class={cx(
					"grid place-content-center",
					"rounded-md bg-neutral-50 p-2 dark:bg-neutral-950",
					"border border-neutral-300 dark:border-neutral-700",
				)}
			>
				<span aria-hidden class="text-sm">
					{titleInitials}
				</span>
				<span class="sr-only">Undock</span>
			</button>
		</li>
	);
}
