import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("the homepage ships no JavaScript", async ({ page }) => {
  const scripts: string[] = [];
  page.on("request", (request) => {
    if (request.resourceType() === "script") scripts.push(request.url());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Emmanuel Chucks");
  expect(scripts).toEqual([]);
  expect(await page.locator("script").count()).toBe(0);
});

test("an unknown address shows the 404 page", async ({ page }) => {
  const response = await page.goto("/no-such-page");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Not found");
});

test("the page never scrolls sideways", async ({ page }) => {
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

for (const path of [
  "/",
  "/work/staff-chat",
  "/work/celebrant-and-vendors",
  "/work/datameter",
  "/no-such-page",
]) {
  test(`text on ${path} meets WCAG AA contrast`, async ({ page }) => {
    await page.goto(path);
    const { violations } = await new AxeBuilder({ page }).withRules(["color-contrast"]).analyze();
    expect(violations.flatMap((v) => v.nodes.map((n) => n.failureSummary))).toEqual([]);
  });
}
