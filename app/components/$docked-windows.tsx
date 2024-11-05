import { cx } from "hono/css";
import {
	type WindowStore,
	useWindowManagerAction,
	useWindowManagerSelector,
} from "./windows";

export function DockedWindows() {
	const activeWindow = useWindowManagerSelector(
		(state) => state.context.activeWindow,
	);
	const dockedWindows = useWindowManagerSelector(
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
					"not-empty:border border-neutral-300 dark:border-neutral-700",
					"fixed bottom-2 not-empty:px-4 not-empty:py-2 left-[50%] -translate-x-[50%]",
					"grid grid-flow-col gap-x-2 place-content-center",
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
	const { removeDockedWindow } = useWindowManagerAction();
	const dockedWindowSnapshot = dockedWindow.getSnapshot();

	const [[firstInitial], [secondInitial]] =
		dockedWindowSnapshot.context.title.split(" ");
	const titleInitials = `${firstInitial}${secondInitial}`;

	return (
		<li key={dockedWindowSnapshot.context.id} class="relative">
			<p class="sr-only">{dockedWindowSnapshot.context.title}</p>
			<button
				type="button"
				onClick={(e) => removeDockedWindow(e, dockedWindow)}
				class={cx(
					"grid place-content-center",
					"p-2 rounded-md bg-neutral-50 dark:bg-neutral-950",
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
