import type { LayoutHandler } from "sonik"

const handler: LayoutHandler = async ({ children, head }) => (
	<html lang="en">
		<head>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link href="/static/styles/global.css" rel="stylesheet" />
			{head.createTags()}
		</head>
		<body class="grid bg-neutral-50 text-neutral-950 sm:grid-cols-[auto_60ch_auto] dark:bg-neutral-950 dark:text-neutral-50">
			<div class="col-start-2 mx-4 my-16 grid gap-y-16">
				<header class="text-neutral-600 dark:text-neutral-300">
					<nav>
						<ul>
							<li>
								<a href="/" class="underline underline-offset-4">
									Home
								</a>
							</li>
						</ul>
					</nav>
				</header>
				{children}
				<footer class="flex gap-x-8 text-neutral-900 dark:text-neutral-300">
					<a
						href="https://github.com/emmanuelchucks"
						class="underline underline-offset-4"
					>
						GitHub
					</a>
					<a
						href="https://twitter.com/emmanuelchucks"
						class="underline underline-offset-4"
					>
						Twitter
					</a>
					<a
						href="https://buymeacoffee.com/emmanuelchucks"
						class="underline underline-offset-4"
					>
						Buy me a coffee ☕️
					</a>
				</footer>
			</div>
		</body>
	</html>
)

export default handler
