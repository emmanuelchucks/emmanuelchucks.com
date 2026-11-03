# emmanuelchucks.com design

How the rebuild is put together, under the charter (`docs/CHARTER.md`). The charter decides what and why; this decides where each fact lives, which owner does each job, what's left for our code, and how it's checked. Edit it in place as decisions land.

## Pages

- `/`: `src/pages/index.astro` + `work` collection. JS: none.
- `/posts/<slug>`: `posts` collection (MDX). JS: window shell + that post's demos, on scroll.
- `/rss.xml`: `@astrojs/rss` over `posts`. JS: none.
- `/og/<slug>.png`: Satori + resvg endpoint, prerendered. JS: none.
- `/404`: `src/pages/404.astro`. JS: none.

`/posts/<slug>` keeps the current site's URL shape, so nothing that links in today breaks. All routes are prerendered with `build.format: "file"`, so `/posts/<slug>` is served as is instead of redirecting to a trailing slash; Cloudflare Workers static assets serves them with no Worker code (`not_found_handling: "404-page"`).

## Where each fact lives

- **Work on the homepage:** one entry per project in `src/content/work/<project>/index.md`, with its media beside it. The schema (Astro `defineCollection` + Zod) requires `order`, `title`, `role`, `years`, `links` and `media` with width and height, so an entry without a source link or with unsized media fails the build. The body is his words.
- **Posts:** `src/content/posts/<slug>/index.mdx`, with that post's demos, stores and media in the same folder. Deleting the folder deletes the post and everything it ships.
- **Contact links:** one `src/site.ts` export, used by the homepage, the footer and the RSS feed.
- **Order of featured work:** the `order` field, set from the charter's list. The page never sorts by date or anything else.
- **Theme:** `prefers-color-scheme` only, using CSS `light-dark()`. No toggle and no stored setting, so there's nothing to flash or shift.

## The window shell

### What a reader sees

A demo in a post sits in the text as a window: a title bar and the demo. Reading never needs anything more. Someone curious can:

- **Drag the title bar:** The window lifts off the page and follows the pointer. A dashed ghost of the same size holds its place in the text. _Demo:_ kept.
- **Drag it near its ghost:** The ghost lights up; letting go snaps the window back into the text. _Demo:_ kept.
- **Click the ghost:** The window flies back into the text. _Demo:_ kept.
- **Minimise:** The window shrinks into a dock item at the bottom of the screen. The ghost stays. _Demo:_ kept, hidden.
- **Click the dock item:** The window grows back to where it was on screen, at the current scroll position. _Demo:_ kept.
- **Maximise / double-click title bar:** Fills the visible screen and scrolls with the page like any lifted window; again to go back to its size. _Demo:_ kept.
- **Drag a corner:** Resizes (lifted windows only). _Demo:_ kept.
- **Close:** The window disappears; the ghost stays. Clicking the ghost brings it back. _Demo:_ kept, hidden.

Lifted windows are attached to the page: they scroll with it, can hang off any edge without widening the page, aren't pulled back when released, and come back from the dock at the same place on screen (decided 2026-09-06). On a phone, only a 44 px grip in the title bar drags, so a thumb scrolling past a demo never lifts it (the build you called "Perfect now", Codex `INTERACTION-REVISION.md`). Leaving the post ends everything.

### States

One state per window, held by the shell element as `data-state`: `inline`, `lifted`, `docked`, `closed`. Every action is one transition:

- `inline → lifted`: drag the title bar (the grip on touch), or an arrow key on the focused window.
- `lifted → inline`: release near the ghost, click the ghost, or Home.
- `inline | lifted → docked → back where it was`: minimise, then the dock item. The dock remembers whether it came from the text or was lifted, and where on screen.
- `inline | lifted → closed → inline`: close, then the ghost.

Focus follows the window: minimise moves it to the dock item, close to the ghost, and restoring moves it back to the window.

### Owners

- **Dragging the window and its resize handle:** neodrag (`@neodrag/vanilla` 2.3.1): pointer capture, touch, a 4 px threshold before a drag starts, handle and cancel areas. It moves the panel by transform and never clamps. _We write:_ options and callbacks.
- **Staying attached to the page:** CSS: the panel is `position: absolute` inside its own place in the article, so it scrolls with the page and follows the article when it reflows. _We write:_ nothing.
- **The lift: a ghost, without moving the demo:** The shell element stays in the text at its measured size and becomes the ghost; only the panel inside it switches to `position: absolute`. The demo's DOM never moves, so its island keeps its state. _We write:_ swap `data-state` in neodrag's `onDragStart`.
- **Hanging off the side:** `overflow-x: clip` on the post's positioned wrapper, never on `html`/`body` (there it behaves like `hidden` on the viewport). _We write:_ one rule.
- **Snap to ghost:** neodrag's `onDrag` / `onDragEnd` give the offset from home. _We write:_ one distance check.
- **Maximise:** Ours: set the panel to the visible screen's size and position, keep the old rect to go back to. _We write:_ about 10 lines.
- **Minimise, restore, return motion:** View Transitions API (same-document): the panel and its dock item (or ghost) share one `view-transition-name`. `:root { view-transition-name: none }` so the rest of the page stays live during the motion. A new transition skips the running one: the window jumps to the end and animates again, which is safe but visible (spike 3). _We write:_ set the name, swap state.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` turns the transitions off. _We write:_ one rule.
- **Dock above windows:** One `<nav popover="manual">` in the post layout; top layer, so no window covers it. _We write:_ show it while it has items.
- **Hiding without losing the demo:** `content-visibility: hidden` on the panel's content and `visibility: hidden` on the panel, not `display: none` (which restarts CSS animations). Measured: count, typed text and animation all kept. A demo running its own JS loop pauses it itself. _We write:_ one rule.
- **Focus on minimise and close:** Ours. _We write:_ `focus()` on the dock item, the ghost, or the window on restore.
- **Keyboard:** Native `<button>`s for minimise, maximise, close and the ghost. The window's content is focusable and labelled; arrow keys move it (Shift for bigger steps), Home sends it back. _We write:_ about 10 lines; neodrag has no keyboard support.
- **Without JS:** Window chrome is plain HTML; its buttons are `visibility: hidden` until `<demo-window>` is defined, so buttons never show while they'd do nothing and nothing shifts. _We write:_ one rule.
- **Loading the shell only when needed:** A `<script>` in `DemoWindow.astro` (Astro bundles it once, only on pages that use it) that imports the element and defines `<demo-window>` when the first window nears the viewport. _We write:_ an `IntersectionObserver` and `import()`, about 10 lines; the platform has no lazy element definition.
- **Demos:** Solid islands, `client:visible`, inside `<DemoWindow>` in the MDX. _We write:_ the demo.
- **State shared by demos in one post:** Nano Stores, one file in the post's folder. _We write:_ the store.

In MDX a demo looks like:

```mdx
<DemoWindow title="Recorder">
  <Recorder client:visible />
</DemoWindow>
```

The shell knows nothing about Solid; any island, or plain HTML, works inside it.

### What our code is

`src/components/DemoWindow.astro` (markup and styles) and `src/components/demo-window.ts` (the element). It holds `data-state`, the ghost, the dock, maximise, keyboard moves, which window is on top (a z-index counter among windows; the dock is in the top layer) and focus, and starts view transitions. If it starts tracking pointers or scroll, an owner is being missed.

Budget: the spike's whole shell with neodrag measured 3.8 KB gzipped (2026-10-31); the article budget is 30 KB.

### Spike results (2026-10-31)

A scratch Astro page with two windows, run in Playwright 1.64.1 against Chromium 156, Firefox 157 and WebKit 27.2, once with Zag and once with neodrag 2.3.1 doing the dragging.

- **Both:** lifting without a jump, staying on the page while scrolling, grabbing again after scrolling, hanging off the side without widening the page, demo state (count, typed text, animation) kept through minimise, close and back, focus moving to the dock item and ghost, restoring at the same screen place after scrolling, maximise filling the screen and going back, six fast minimise/restore clicks ending in a consistent state, snapping to the ghost.
- **Zag broke your decisions in every setting:** with the page as boundary it pulled windows hanging off the edge back into view when the page grew or scrolled; with no boundary, a change in screen height (as when Safari's toolbar collapses) moved windows by the scroll distance. Its shell measured 16.8 KB gzipped.
- **neodrag** moved no window on page growth, height change or scroll; windows follow their place in the article when the article reflows. It does dragging only (threshold, handle, cancel), so resize, arrow keys, stacking and maximise were about 60 lines of ours. Its shell measured 3.8 KB gzipped.
- **Checked when the shell is built:** iPhone Safari (the simulator didn't answer requests to open URLs that evening), touch dragging by the grip, and keeping the grip reachable after rotation.

**Decided 2026-11-01:** neodrag replaces Zag.

## How it's checked

You asked whether we need a framework like Vitest, or something that records a session and replays it. Here's what each is, and what I'd use.

- **Playwright Test** (my pick for the scenarios). It drives real Chromium, Firefox and WebKit (Safari's engine), and its `codegen` command is the recorder you heard about: you click through the page and it writes the test for you, which then replays the same way every time. Each charter scenario becomes one test against the built site, run at desktop and phone sizes, light and dark, with reduced motion on, with screenshots of settled states compared to saved ones (`toHaveScreenshot`) and video and traces kept on failure. Mid-motion frames aren't compared: Linux WebKit isn't Safari and has painted them blank before; motion is judged from recordings instead. Version 1.64.1 runs all three browsers on DevBox (checked 2026-10-31: WebKit 27.2, Firefox 157, Chromium 156; WebKit needed system libraries, now installed).
- **Vitest browser mode** runs tests in a real browser too, but it's built for mounting single components, and Astro pages can't be mounted that way. Our only component worth testing alone is the shell, and its behaviour only shows on a real page. Not needed now; if a demo grows real logic, Vitest (already in the repo's Vite+ tooling) tests that logic.
- **TesterArmy's e2e** has an AI agent perform each step, records what worked, and replays it without the AI until the page changes. It's for teams that write tests in plain English. Agents here write Playwright directly, so it adds a model and a cache that can pass stale tests, for nothing we need.
- **agent-device** is for Safari on iOS, which no Linux browser stands in for. Routine runs use the simulator's Safari; the real iPhone gets a final pass before you review, since it has to be unlocked (and Codex's attempts failed on code signing, so the spike checks that first). Its `replay` scripts make a few key phone scenarios repeatable.
- **agent-browser** is for looking at the work the way you will: exploring, screenshots, and 60 fps recordings of the motion to check frame by frame for the review page.
- **Lighthouse CI and a size check** run on every build and fail it when a budget in the charter is broken.

The order for each feature stays as the charter says: scenarios written first, built, run by a reviewer who didn't build it, then a review page for you.

## Build order

1. Spike: done (above).
2. Astro project on a `rebuild` branch, replacing the RedwoodSDK app (deleted, not migrated); Playwright, Lighthouse CI and size checks wired to the build from the first commit.
3. Homepage with real content, deployed to the preview Worker: done 2026-11-03, apart from the screens still needed (above).
4. The window shell, with its scenarios.
5. The GroqDictate post and its demos.
6. RSS, OG images, 404, analytics.

## The look

"Lit wall", chosen 2026-11-03 after rounds of trial looks (in git history, tag `look-lit-1` for the first Lit wall you liked).

- **One idea:** the earlier site's tile wall in a room, with window light drifting across it over 90 seconds (`src/components/room.astro`, on every page). Other elements earn a place by serving it; a page combining every liked element ("Wall") read as a patchwork.
- **Colour:** the real app icons are the only colour. They sit close to the wall: a tight contact shadow and a faint soft one that drifts two pixels against the light (`.casts`), and screens get a hairline edge. A heavier, offset drop shadow read as a cheap card effect (your note, 2026-11-03); the macOS icons get none, since they carry their own. The next project is an empty dashed icon.
- **Pictures:** the homepage shows icons only. Each project has its own page where its screens stand on the wall in the light, in the reader's light or dark mode; each uses `src/components/project.astro`. Staff chat (`/work/staff-chat`): a thread and the chat list from the demo recording (simulator, made-up people). Celebrant and Vendors (`/work/celebrant-and-vendors`): screenshots taken 2026-11-03 on an iPhone 17 Pro simulator (iOS 26.5) from the EAS `e2e` builds (Celebrant 4.4.6, Vendors 1.4.6, staging backend), signed in as the seeded app review accounts (`seeds/seed_test_accounts_full.sql` in the backend; the code is in App Store Connect's review details), each in light and dark mode with the status bar set to 9:41. Avoid the dashboards: E2E runs leave fixture rows like "E2E Vendor Detail Probe" in these accounts. DataMeter (`/work/datameter`): its window captured 2026-11-03 through Mac computer use with the Mac display in a 2x scaled mode (`displayplacer`, mode 52, then back to 34; the display is 1080p, so normal captures are 1x), showing a made-up day swapped in for the real database (backup in the Mac's `~/backups/datameter-2026-11-03`; the real file restored afterwards). GroqDictate (`/work/groqdictate`): its recording panel, captured the same way while you spoke into the KG-33 headset (the Mac's speakers don't reach it). Computer use can't start it: its keys go to one app, and GroqDictate listens system-wide, so the Right ⌘ press came from a JXA `CGEventPost` script typed into a new Ghostty window (Ghostty has Accessibility). Looking at GroqDictate through computer use while it's idle reopens its Settings window. Windows and panels get their corners cut out of the capture as transparency, since computer use returns JPEGs. Still to come: the GroqDictate iPhone app.
- **Words:** no tagline. You found every drafted one machine-sounding; the line under the name is your own GitHub bio until you have one of your own. "Taking on new work." sits under the links, as plain text with no badge.
- **Type and grey:** one font, Bricolage Grotesque, with the name at optical size 96. Three levels of ink (`--ink`, `--text`, `--muted`), each at least 4.5:1 against the wall where the light is brightest; a Playwright axe test checks contrast in light and dark.
- **Font size:** `scripts/subset-font.sh` builds `src/assets/fonts/bricolage.woff2` (18 KB, from 77 KB): Basic Latin and typographic punctuation, weights 400 to 700, the full optical-size axis, and no kerning (23 KB of the subset across both axes, with almost no visible difference in this face). Homepage: 43.7 KB on Lighthouse's phone run, 2026-11-03.
