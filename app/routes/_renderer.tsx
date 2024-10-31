import { Style, cx } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";
import { Link, Script } from "honox/server";
import { BackgroundGrid } from "~/components/$background-grid";
import { A } from "~/components/a";

export default jsxRenderer(({ title, description, children }, c) => {
	const isHome = c.req.path === "/";

	return (
		<html lang="en" class="scheme-light-dark [scrollbar-gutter:stable]">
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="description" content={description} />
				<title>{title}</title>
				<link rel="icon" href="/static/favicon.png" />
				<Link href="/app/style.css" rel="stylesheet" />
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
				<BackgroundGrid
					squareSize={240}
					className="fixed inset-0 w-full h-full -z-10"
				/>
				{!isHome && (
					<header>
						<nav>
							<A
								href="/"
								class="font-medium text-neutral-800 dark:text-neutral-200"
							>
								← Home
							</A>
						</nav>
					</header>
				)}
				{children}
			</body>
		</html>
	);
});
