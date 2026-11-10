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
    // The built site served the way Cloudflare serves it, Worker included.
    command: "pnpm build && pnpm exec wrangler dev --port 4321 --ip 127.0.0.1",
    url: "http://localhost:4321",
    reuseExistingServer: !isCI,
  },
});
