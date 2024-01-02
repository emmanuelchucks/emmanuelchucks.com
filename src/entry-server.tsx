import { createHandler, StartServer } from "@solidjs/start/server"

export default createHandler(() => (
	<StartServer
		document={({ assets, children, scripts }) => (
			<html lang="en" class="[color-scheme:light_dark]">
				<head>
					<meta charset="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.png" />
					<title>Emmanuel Chucks - Full-Stack Engineer</title>
					<meta
						name="description"
						content="Emmanuel Chucks is a full-stack engineer based in Accra, Ghana. A passionate builder with an eye for pleasant design."
					/>
					{assets}
				</head>
				<body class="bg-neutral-50 text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50">
					<div id="app">{children}</div>
					{scripts}
				</body>
			</html>
		)}
	/>
))
