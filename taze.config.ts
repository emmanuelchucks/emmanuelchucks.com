import { defineConfig } from "taze";

export default defineConfig({
  recursive: true,
  install: true,
  write: true,
  mode: "latest",
  includeLocked: true,
});
