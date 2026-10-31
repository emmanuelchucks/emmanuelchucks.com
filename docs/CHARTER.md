# emmanuelchucks.com charter

## What it is

Emmanuel Chucks's personal site: his best work, his writing and his voice, in one place. It is for people who might hire him or work with him (on contract, part-time or full-time) and for developers who notice craft. A visitor should leave knowing what he can do for them and with the sense of someone who cares, is deliberate and takes pride in doing things well. It should not read like a LinkedIn profile.

It's good enough to replace the current site when it says more about him than the current page of name, photo and links, and still loads at least as fast.

## Size

A personal site with low traffic: one author, a handful of pages and a few articles a year. Nothing needs a database, sessions or scaling. Every page can be built ahead of time.

## Principles, in priority order

1. **Everything is true.** Every claim is in his words, from his work, or linked to its source. No made-up taglines, motivations or numbers. Celedom work can be shown, but nothing confidential or that would give away how the business works.
2. **It reads as a normal page first.** Each page works fully as plain HTML and CSS. The windows, the dock and the terminal are extras that visitors find for themselves. Nothing points to them, and nothing depends on them.
3. **Minimal and subtle, but specific.** Restraint lives in how things look and move. Character lives in the words and the work. A quiet page with nothing in it is a failure, not minimalism.
4. **Fast enough to be part of the pitch.** The homepage ships no JavaScript. An article loads JavaScript only for its demos, and only when a demo scrolls into view. Layout never shifts. Every build is checked against budgets (below).
5. **Built on the browser.** Native HTML, CSS and JS features come first, and the site assumes recent browsers. Our own code needs a stated reason the platform can't do the job.
6. **Accessible and complete.** Keyboard support, visible focus, reduced motion respected, light and dark mode, and everything works on phones, including the windows.
7. **Small code, easy to delete.** Each article's demos live in the article's own folder.

### Budgets (checked in CI on each build)

- Homepage: 0 KB JS, under 50 KB total transferred on first load (fonts and portrait included).
- Article: under 30 KB of compressed JS for the window shell, before demo code.
- Lighthouse 100 in all four categories on mobile. CLS 0.

## Owners

Each job has one owner. "Not" names the tempting wrong shape, so a reviewer can reject it by name.

- **Pages, routing, build:** Astro, static output. _Not:_ Rendering static content on each request in a Worker (today's RedwoodSDK setup).
- **Articles:** Astro content collections + MDX. _Not:_ A home-made content pipeline.
- **Code highlighting:** Shiki at build time (Astro built-in). _Not:_ Highlighting in the browser.
- **Demos in articles:** Astro islands written in Solid, `client:visible`. _Not:_ Hydrating the whole page; React for demos.
- **State shared by demos in one article:** Nano Stores (Astro's documented way to share state between islands). _Not:_ One big island wrapped around the prose, or a framework context.
- **Window behaviour: drag, resize, minimise, maximise, keyboard, focus:** Zag.js `floating-panel` state machine through `@zag-js/vanilla`, page-attached (`strategy: "absolute"`, `allowOverflow: true`); 15.4 KB gzipped, measured 2026-10-31 on 1.47.0. _Not:_ Our own pointer, resize or keyboard code; XState or `@xstate/store` beside it; React Aria (React only).
- **Window shell around a demo:** One custom element that wraps any island and runs the Zag machine. It adds only what Zag lacks: lifted off the article, closed to a ghost, snapping back to the ghost. _Not:_ Window logic written separately for each framework or each demo.
- **Minimise, restore, dock motion:** View Transitions API (same-document): the browser morphs the window into its dock item as one element. _Not:_ Hand-written FLIP animations or JS-driven motion.
- **Dock above windows:** Top layer (`popover`). _Not:_ A z-index arms race.
- **Toy terminal:** wterm + `@wterm/just-bash` (Vercel Labs) as the candidate; the library Emmanuel saw on X gets compared first. _Not:_ Our own terminal or shell.
- **Images:** Astro image pipeline (AVIF/WebP, sizes set). _Not:_ Images without fixed dimensions.
- **Fonts:** One self-hosted variable font, subset, preloaded. _Not:_ Google Fonts, several families.
- **Link previews (OG images):** Satori + resvg in an Astro endpoint, rendered at build time. _Not:_ Generated on request (workers-og is the Workers port of the same engine; we don't need it at request time).
- **Hosting:** Cloudflare Workers static assets, his personal account. The rebuild deploys to a separate preview Worker so it runs beside production; production changes once, when he says so. _Not:_ A Worker handling requests for static pages; deploying the rebuild over production before he's compared them.
- **Analytics:** Cloudflare Web Analytics (cookieless). _Not:_ The KV view counter, or a cookie banner.
- **Performance checks:** Lighthouse CI + bundle size check in the build. _Not:_ Checking by eye.

## How it's checked

Nothing reaches him until it has been checked the way a demanding person would use it, by someone other than its builder.

- **Scenarios before building.** Each interactive feature gets a written list of scenarios before its code. The scenarios cover different people: a reader who never touches a window, a curious clicker, a keyboard-only user, a phone user with one thumb, someone with reduced motion turned on, and someone trying to break it on purpose (fast repeated clicks, drags off every edge, rotating the phone, resizing the browser mid-animation, scrolling during a restore).
- **Checked visually, not just in code.** Each scenario is run in a real browser (`agent-browser` at desktop and phone sizes, plus real iPhone Safari through `agent-device`). Screenshots are taken in light and dark mode. Motion is recorded as video and checked frame by frame for jumps, flashes and jank.
- **An independent reviewer.** A reviewer who didn't build the feature runs the scenarios again and adds its own.
- **Budgets in the build.** Lighthouse CI and the bundle size limits run on every build and fail it when a limit is broken.
- **What he sees.** He gets a review page with the scenarios, what passed, recordings of the motion, and anything still open.

## In, deferred, out

**In (first release)**

- Homepage: a sharp opening in his own words, the portrait, the work (Celedom and GroqDictate featured, each shown in its own way; older projects such as Patchmarks in a short list of earlier work), contact links.
- One article: GroqDictate, the story of leaving Superwhisper and building his own app, with demos in windows. Windows can be lifted off the page, dragged, resized, minimised to the dock and restored. Close leaves a dashed ghost in the article that brings the window back, and dragging a window near its ghost snaps it into place.
- A screen recording of GroqDictate in real use for the article, made in a clean macOS account so nothing private shows.
- RSS feed, OG images, light/dark mode, 404 page.

**Deferred**

- The toy terminal (unless the GroqDictate article has a natural place for it).
- The "A Clock Made of Clocks" article (the original window-demo idea) and the Hono link-previews draft.
- The terminal calls project (calls and shared agent sessions inside the terminal) once it's past the idea stage.

**Out**

- Browser-like navigation, history or reload inside windows; they show demos and nothing else.
- Machigotchi (dropped: the moment has passed).
- Saved window layouts, keeping windows between articles, the view counter, comments.

## Decisions

- 2026-09-05: Windows show a demo and nothing else; they are not a browser. Easter eggs are for the people who find them and add no features.
- 2026-09-06: Windows are attached to the page, not the viewport. They can be dragged partly off-screen. Restoring from the dock brings a window back where it was on screen. Dragging works on mobile too.
- 2026-09-06: Close removes the window and leaves a ghost in the article that brings it back. Windows snap back when dragged near their ghost. Dock entry and exit are animated.
- 2026-10-28: Start fresh. Codex's prototype is archived in `~/backups/website-codex-research-2026-10-28/` as evidence, not code to reuse.
- 2026-10-28: Celedom work can be public, without anything confidential.
- 2026-10-28: First release is the homepage plus one article (GroqDictate).
- 2026-10-31: Astro replaces RedwoodSDK. Demos are written in Solid.
- 2026-10-31: Machigotchi is dropped. Patchmarks moves to earlier work. The terminal calls idea will take Machigotchi's place once it's real.
- 2026-10-31: The rebuild happens on a branch and is deployed to a preview beside production. It's merged and deployed once, when he's compared the two. (Checked: pushing `main` doesn't deploy, because the Worker has no Git build triggers and was last deployed 2025-10-17.)
