# emmanuelchucks.com design

How the rebuild is put together, under the charter (`docs/CHARTER.md`). The charter decides what and why; this decides where each fact lives, which owner does each job, what's left for our code, and how it's checked. Edit it in place as decisions land.

## Pages

| URL | Built from | JS |
| --- | --- | --- |
| `/` | `src/pages/index.astro` + `work` collection | none |
| `/posts/<slug>` | `posts` collection (MDX) | window shell + that post's demos, on scroll |
| `/rss.xml` | `@astrojs/rss` over `posts` | none |
| `/og/<slug>.png` | Satori + resvg endpoint, prerendered | none |
| `/404` | `src/pages/404.astro` | none |

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

| They do | What happens | Demo state |
| --- | --- | --- |
| Drag the title bar | The window lifts off the page and follows the pointer. A dashed ghost of the same size holds its place in the text. | Kept |
| Drag it near its ghost | The ghost lights up; letting go snaps the window back into the text. | Kept |
| Click the ghost | The window flies back into the text. | Kept |
| Minimise | The window shrinks into a dock item at the bottom of the screen. The ghost stays. | Kept, hidden |
| Click the dock item | The window grows back to where it was on screen, at the current scroll position. | Kept |
| Maximise / double-click title bar | Fills the visible screen; again to go back to its size. | Kept |
| Drag a corner | Resizes (lifted windows only). | Kept |
| Close | The window disappears; the ghost stays. Clicking the ghost brings it back. | See question 1 |

Lifted windows are attached to the page: they scroll with it, can hang off any edge without widening the page, aren't pulled back when released, and come back from the dock at the same place on screen (decided 2026-09-06). On a phone, only a 44 px grip in the title bar drags, so a thumb scrolling past a demo never lifts it (the build you called "Perfect now", Codex `INTERACTION-REVISION.md`). Leaving the post ends everything.

### States

One state per window, held by the shell element as `data-state`: `inline`, `lifted`, `docked`, `closed`. Every action is one transition:

- `inline → lifted`: drag the title bar (the grip on touch), or an arrow key on the focused window.
- `lifted → inline`: release near the ghost, click the ghost, or Home.
- `inline | lifted → docked → back where it was`: minimise, then the dock item. The dock remembers whether it came from the text or was lifted, and where on screen.
- `inline | lifted → closed → inline`: close, then the ghost.

Focus follows the window: minimise moves it to the dock item, close to the ghost, and restoring moves it back to the window.

### Owners

| Job | Owner | What we write |
| --- | --- | --- |
| Drag, resize, arrow-key moves, Escape cancelling a drag, which window is on top | Zag `floating-panel` via `@zag-js/vanilla` 1.47.0, `strategy: "absolute"`, `allowOverflow: true`. Pointer capture, `touch-action: none` on its handles and stacking (`--z-index`) are its own. | Props and event wiring |
| Staying attached to the page | Zag, if spike 1 passes: given the page element as `getBoundaryEl`, it shifts windows with it on scroll (`trackBoundaryRect`). | Nothing, or see spike 1 |
| The lift: a ghost, without moving the demo | The shell element stays in the text at its measured size and becomes the ghost; only the panel inside it switches to `position: absolute`. The demo's DOM never moves, so its island keeps its state. Zag subtracts the offset parent's origin (`getOffsetOrigin`). Zag's positioner and dialog props are only applied while lifted, so inline windows stay ordinary page content. | Swap `data-state` on Zag's first `DRAG`; no pointer code of our own |
| Hanging off the side | `overflow-x: clip` on the post's positioned wrapper, never on `html`/`body` (there it behaves like `hidden` on the viewport) | One rule |
| Snap to ghost | Zag's `onPositionChange` / `onPositionChangeEnd` | Distance from panel to ghost; one threshold |
| Maximise | Zag's `maximize()` fills its boundary. With the page as boundary that's the whole page, so maximise sets the visible screen's rect with Zag's `setPosition`/`setSize` and keeps the old rect to go back to. | About 10 lines |
| Minimise, restore, return motion | View Transitions API (same-document): the panel and its dock item (or ghost) share one `view-transition-name`. `:root { view-transition-name: none }` so the rest of the page stays live during the motion. A new transition skips the running one: the window jumps to the end and animates again, which is safe but visible (spike 3). | Set the name, swap state |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` turns the transitions off | One rule |
| Dock above windows | One `<nav popover="manual">` in the post layout; top layer, so no window covers it. Windows create no stacking contexts, so Zag's z-index orders them. | Show it while it has items |
| Hiding without losing the demo | `content-visibility: hidden` on the panel's content, not `hidden` (`display: none` restarts CSS animations, and on the panel it breaks Zag's offset). A demo running its own JS loop pauses it itself. | One rule; spike 4 |
| Focus on minimise and close | Ours: Zag only restores focus on its own close, which we don't use. | `focus()` on the dock item or ghost |
| Keyboard | Native `<button>`s for minimise, maximise, close and the ghost. Zag's arrow keys work when the window's content element has focus, so that element is focusable and labelled. | Labels, Home |
| Without JS | Window chrome is plain HTML; its buttons are `visibility: hidden` until `<demo-window>` is defined, and it's defined only after Zag loads, so buttons never show while they'd do nothing and nothing shifts | One rule |
| Loading the shell only when needed | A `<script>` in `DemoWindow.astro` (Astro bundles it once, only on pages that use it) that imports Zag and defines `<demo-window>` when the first window nears the viewport | An `IntersectionObserver` and `import()`, about 10 lines; the platform has no lazy element definition |
| Demos | Solid islands, `client:visible`, inside `<DemoWindow>` in the MDX | The demo |
| State shared by demos in one post | Nano Stores, one file in the post's folder | The store |

In MDX a demo looks like:

```mdx
<DemoWindow title="Recorder">
  <Recorder client:visible />
</DemoWindow>
```

The shell knows nothing about Solid; any island, or plain HTML, works inside it.

### What our code is

`src/components/DemoWindow.astro` (markup and styles) and `src/components/demo-window.ts` (the element). It maps Zag's props and events to `data-state`, the ghost, the dock, maximise and focus, and starts view transitions. If it starts tracking pointers, scroll or z-index, an owner is being missed.

Budget: Zag measured 15.4 KB gzipped (2026-10-31, 1.47.0); the element should add under 4 KB, inside the 30 KB article budget.

### Spike before the shell is built

Reading Zag's source (2026-10-31) showed places where it behaves against your decisions. Each item below is a short test against the real libraries in Chromium, Firefox, WebKit and iPhone Safari. If Zag fails one of your decisions and no setting fixes it, I bring you the choice (live with Zag's behaviour, or a different owner) before building on it.

1. **Page attachment and clamping.** Zag keeps windows on the page only while idle: scrolling during a drag makes the window slip from the pointer. When the page element changes size (rotating a phone, resizing the browser, the page getting taller) Zag pulls every window fully inside the page and can shrink it; you'd accepted only nudging the grip back into reach. With overflow allowed, it still stops windows at the top of the page. Test each, and compare the page element as boundary with no boundary.
2. **Touch grip.** Zag's drag props on two elements, the whole title bar and a 44 px grip, with only the grip active on touch (`pointer: coarse`).
3. **View transitions.** An absolutely positioned window morphing into an item in an open popover; fast repeated clicks; scrolling during a restore (it animates to where the window was when the motion began, so it may land with a jump). Codex once saw a lifted window go transparent in iPhone Safari, and headless WebKit painted blank snapshots during motion.
4. **Demo state.** A Solid island with a running CSS animation and typed input keeps both through lift, dock, close and back with `content-visibility: hidden`.
5. **Inline windows** stay plain page content (not focus traps, no Zag positioning) until lifted.

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

1. Spike checks above, in a scratch folder.
2. Astro project on a `rebuild` branch, replacing the RedwoodSDK app (deleted, not migrated); Playwright, Lighthouse CI and size checks wired to the build from the first commit.
3. Homepage with real content, deployed to the preview Worker.
4. The window shell, with its scenarios.
5. The GroqDictate post and its demos.
6. RSS, OG images, 404, analytics.

## Open, for you

1. **Close.** Codex's notes record "close disposes, reopen is fresh" as the agreed direction. I'd rather keep the demo as you left it: simpler, one path for every demo, and nothing lost by a mis-tap. Keep or restart?
2. **Minimise in the text.** Codex's notes had minimise on a window in the text collapse it to its title bar, with no dock item. I've made minimise always go to the dock, so it means one thing. OK?
3. **Maximise.** Fill the visible screen and scroll with the page like any lifted window (my pick), or stay fixed on screen while maximised?
4. **The look** (type, colour, spacing) comes next, as a separate page with options shown in your real content. Is there a site or app whose feel is close to what you want?
