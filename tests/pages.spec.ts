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

// Safari plays a video only from a server that answers a byte range with just those bytes.
for (const path of [
  "/work/staff-chat",
  "/work/celebrant-and-vendors",
  "/work/datameter",
  "/work/groqdictate",
]) {
  test(`clips on ${path} answer a range request with those bytes`, async ({ page, request }) => {
    await page.goto(path);
    const clips = await page
      .locator("video source")
      .evaluateAll((sources) => sources.map((s) => s.getAttribute("src") ?? ""));
    expect(
      clips.some((clip) => clip.endsWith(".av1.mp4")),
      "lists its AV1 clips",
    ).toBe(true);
    const answers = await Promise.all(
      clips.map(async (clip) => {
        const response = await request.get(clip, { headers: { Range: "bytes=0-1" } });
        return {
          clip,
          status: response.status(),
          range: response.headers()["content-range"],
          length: (await response.body()).length,
        };
      }),
    );
    for (const { clip, status, range, length } of answers) {
      expect({ status, length }, clip).toEqual({ status: 206, length: 2 });
      expect(range, clip).toMatch(/^bytes 0-1\/\d+$/u);
    }
  });
}

for (const path of [
  "/",
  "/work/staff-chat",
  "/work/celebrant-and-vendors",
  "/work/datameter",
  "/work/groqdictate",
  "/no-such-page",
]) {
  test(`text on ${path} meets WCAG AA contrast`, async ({ page }) => {
    await page.goto(path);
    const { violations } = await new AxeBuilder({ page }).withRules(["color-contrast"]).analyze();
    expect(violations.flatMap((v) => v.nodes.map((n) => n.failureSummary))).toEqual([]);
  });
}
