import { Style, cx } from "hono/css"
import { jsxRenderer, useRequestContext } from "hono/jsx-renderer"
import { Script } from "honox/server"
import { A } from "../../components/primitives"
import styles from "../style.css?url"

export default jsxRenderer(async ({ title, description, children }) => {
	const c = useRequestContext()
	return (
		<html lang="en" class="[color-scheme:light_dark] [scrollbar-gutter:stable]">
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="description" content={description} />
				<title>{title}</title>
				<link rel="icon" href="/static/favicon.png" />
				<link href={styles} rel="stylesheet" />
				<Script src="/app/client.ts" />
				<Style />
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
									<A
										href={link.href}
										aria-current={c.req.path === link.href ? "page" : undefined}
										class="no-underline"
									>
										{link.text}
									</A>
								</li>
							))}
						</ul>
					</nav>
				</header>
				{children}
			</body>
		</html>
	)
})
