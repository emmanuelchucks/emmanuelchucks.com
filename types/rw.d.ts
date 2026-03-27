import type WorkerApp from "../src/worker";
import type { AppContext } from "../src/worker";

declare module "rwsdk/worker" {
  interface DefaultAppContext extends AppContext {}

  // App is the type of your defineApp export in src/worker.tsx
  export type App = WorkerApp;
}
