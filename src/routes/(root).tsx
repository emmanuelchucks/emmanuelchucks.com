import { type JSX } from "solid-js"

export default function RootLayout(props: { children: JSX.Element }) {
	return (
		<div class="mx-4 my-16 grid min-h-screen items-start sm:mx-8 md:mx-auto md:grid-cols-[auto_65ch_auto]">
			<div class="grid gap-y-16 md:col-start-2">
				<header class="font-semibold text-neutral-800 dark:text-neutral-300">
					<nav>
						<ul class="flex flex-row gap-x-8">
							<li>
								<a href="/" class="underline-offset-4 hover:underline">
									Home
								</a>
							</li>
							<li>
								<a href="/blog" class="underline-offset-4 hover:underline">
									Blog
								</a>
							</li>
						</ul>
					</nav>
				</header>
				{props.children}
			</div>
		</div>
	)
}