// Budgets from docs/CHARTER.md. Sizes are bytes transferred (compressed).
const { chromium } = require("@playwright/test");

module.exports = {
  ci: {
    collect: {
      staticDistDir: "./dist",
      url: ["http://localhost/index.html"],
      chromePath: process.env.CHROME_PATH ?? chromium.executablePath(),
      numberOfRuns: 1,
      settings: { chromeFlags: "--headless=new --no-sandbox" },
    },
    assert: {
      assertMatrix: [
        {
          matchingUrlPattern: ".*",
          assertions: {
            "categories:performance": ["error", { minScore: 1 }],
            "categories:accessibility": ["error", { minScore: 1 }],
            "categories:best-practices": ["error", { minScore: 1 }],
            "categories:seo": ["error", { minScore: 1 }],
            "cumulative-layout-shift": ["error", { maxNumericValue: 0 }],
          },
        },
        {
          matchingUrlPattern: String.raw`/index\.html$`,
          assertions: {
            "resource-summary:script:size": ["error", { maxNumericValue: 0 }],
            "resource-summary:total:size": ["error", { maxNumericValue: 51_200 }],
          },
        },
      ],
    },
    upload: { target: "filesystem", outputDir: ".lighthouseci" },
  },
};
