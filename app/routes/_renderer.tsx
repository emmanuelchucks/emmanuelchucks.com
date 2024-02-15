import { cx } from "hono/css"
import { jsxRenderer } from "hono/jsx-renderer"
import { Script } from "honox/server"

/* eslint-disable-next-line @typescript-eslint/promise-function-async */
export default jsxRenderer(({ children, title, description }) => (
	<html lang="en">
		<head>
			<meta charset="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta name="description" content={description} />
			<title>{title}</title>
			<link rel="icon" href="/static/favicon.png" />
			<link href="/app/style.css" rel="stylesheet" />
			<Script src="/app/client.ts" />
		</head>
		<body
			class={cx(
				"mx-4 my-16 grid max-w-screen-sm grid-rows-[auto,1fr] gap-y-16 bg-neutral-50 text-neutral-950",
				"sm:mx-8",
				"md:col-start-2 md:mx-auto",
				"dark:bg-neutral-950 dark:text-neutral-50",
			)}
		>
			<header
				class={cx("font-semibold text-neutral-700", "dark:text-neutral-300")}
			>
				<nav>
					<ul class="flex flex-row gap-x-8">
						{[
							{ text: "Home", href: "/" },
							{ text: "Blog", href: "/blog" },
						].map(async (link) => (
							<li>
								<a
									href={link.href}
									// Aria-current={true ? "page" : undefined}
									class={cx(
										"decoration-2 underline-offset-2",
										"hover:underline",
									)}
								>
									{link.text}
								</a>
							</li>
						))}
					</ul>
				</nav>
			</header>
			{children}
		</body>
	</html>
))
