import { defineConfig, devices } from "@playwright/test";

const isCI = process.env.CI !== undefined;

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: isCI,
  reporter: isCI ? "github" : "list",
  use: {
    baseURL: "http://localhost:4321",
    trace: "retain-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "desktop-firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "desktop-webkit", use: { ...devices["Desktop Safari"] } },
    { name: "phone-webkit", use: { ...devices["iPhone 15"] } },
    { name: "phone-chromium-dark", use: { ...devices["Pixel 7"], colorScheme: "dark" } },
    { name: "reduced-motion", use: { ...devices["Desktop Chrome"], reducedMotion: "reduce" } },
  ],
  webServer: {
    // --ignore-lock keeps Astro from moving the server to the background when it detects an agent.
    command: "pnpm build && pnpm exec astro preview --port 4321 --ignore-lock",
    url: "http://localhost:4321",
    reuseExistingServer: !isCI,
  },
});
