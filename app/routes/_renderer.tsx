import { Style, cx } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";
import { Script } from "honox/server";
import { A } from "~/components/a";
import styles from "~/style.css?url";

export default jsxRenderer(({ title, description, children }, c) => {
	const isHome = c.req.path === "/";

	return (
		<html lang="en" class="[color-scheme:light_dark] [scrollbar-gutter:stable]">
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="description" content={description} />
				<title>{title}</title>
				<link rel="icon" href="/static/favicon.png" />
				<link rel="stylesheet" href={styles} />
				<Script src="/app/client.ts" async />
				<Style />
			</head>
			<body
				class={cx(
					"max-w-2xl",
					"mx-4 sm:mx-8 md:mx-auto",
					"grid gap-y-16 grid-rows-[auto,1fr] md:col-start-2",
					"text-neutral-950 bg-neutral-50 dark:text-neutral-50 dark:bg-neutral-950",
					isHome ? "my-24" : "my-16",
				)}
			>
				{!isHome && (
					<header>
						<nav>
							<A
								href="/"
								class="font-medium text-neutral-800 dark:text-neutral-200"
							>
								home
							</A>
						</nav>
					</header>
				)}
				{children}
			</body>
		</html>
	);
});
