import { type JSX } from "solid-js"

export function RootLayout(props: { children: JSX.Element }) {
	return (
		<div class="mx-4 my-16 grid max-w-screen-sm gap-y-16 sm:mx-8 md:mx-auto">
			<header class="font-semibold text-neutral-800 dark:text-neutral-300">
				<nav>
					<ul>
						<li>
							<a href="/" class="underline-offset-4 hover:underline">
								Home
							</a>
						</li>
					</ul>
				</nav>
			</header>
			{props.children}
		</div>
	)
}
