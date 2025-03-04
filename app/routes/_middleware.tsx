import { contextStorage } from "hono/context-storage";
import { createRoute } from "honox/factory";

export default createRoute(contextStorage());
