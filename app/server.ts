import { serveStatic } from "hono/cloudflare-pages"
import { showRoutes } from "hono/dev"
import { createApp } from "sonik/server"

const app = createApp()
app.use("/static/*", serveStatic())

showRoutes(app)

export default app
