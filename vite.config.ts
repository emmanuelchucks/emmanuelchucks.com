// Lint and format settings for `vp check`. Astro builds with its own Vite config (astro.config.mjs).
import {
  baseToolingConfig,
  browserRuntimeConfig,
  composeConfig,
  nodeLint,
  TEST_FILES,
} from "@kasoa/vite-plus-config";

export default composeConfig(baseToolingConfig, browserRuntimeConfig, {
  lint: {
    overrides: [
      // Playwright tests run in Node, with page.evaluate callbacks in the browser;
      // the shared test profiles assume Vitest.
      { files: [...TEST_FILES], ...nodeLint, env: { ...nodeLint.env, browser: true } },
      { files: ["**/*.astro"], globals: { Astro: "readonly" } },
    ],
  },
});
