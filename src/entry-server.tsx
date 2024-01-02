import { createHandler, StartServer } from "@solidjs/start/server"

export default createHandler(() => (
	<StartServer
		document={({ assets, children, scripts }) => (
			<html
				lang="en"
				class="[color-scheme:light_dark] [scrollbar-gutter:stable]"
			>
				<head>
					<meta charset="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.png" />
					{assets}
				</head>
				<body class="bg-neutral-50 text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50 [&_*]:outline-neutral-700 dark:[&_*]:outline-neutral-300">
					<div id="app">{children}</div>
					{scripts}
				</body>
			</html>
		)}
	/>
))
