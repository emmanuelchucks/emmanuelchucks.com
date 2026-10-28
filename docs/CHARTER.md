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

| Job | Owner | Not |
|---|---|---|
| Pages, routing, build | Astro, static output | Rendering static content on each request in a Worker (today's RedwoodSDK setup) |
| Articles | Astro content collections + MDX | A home-made content pipeline |
| Code highlighting | Shiki at build time (Astro built-in) | Highlighting in the browser |
| Demos in articles | Astro islands, `client:visible` | Hydrating the whole page |
| State shared by demos in one article | Nano Stores (Astro's documented way to share state between islands) | One big island wrapped around the prose, or a framework context |
| Window shell around a demo | One custom element, without a framework, that wraps any island | Window logic written separately for each framework or each demo |
| Dragging windows | Pointer Events with pointer capture | A drag library |
| Resizing windows | CSS `resize` | Custom resize handles, unless `resize` turns out not to work on phones (check this first) |
| Minimise, restore, dock motion | View Transitions API (same-document) | Hand-written FLIP animations or JS-driven motion |
| Dock above windows | Top layer (`popover`) | A z-index arms race |
| Toy terminal | wterm + `@wterm/just-bash` (Vercel Labs) as the candidate; the library Emmanuel saw on X gets compared first | Our own terminal or shell |
| Images | Astro image pipeline (AVIF/WebP, sizes set) | Images without fixed dimensions |
| Fonts | One self-hosted variable font, subset, preloaded | Google Fonts, several families |
| Link previews (OG images) | Generated at build time | Generated on request |
| Hosting | Cloudflare Workers static assets, his personal account | A Worker handling requests for static pages |
| Analytics | Cloudflare Web Analytics (cookieless) | The KV view counter, or a cookie banner |
| Performance checks | Lighthouse CI + bundle size check in the build | Checking by eye |

## In, deferred, out

**In (first release)**
- Homepage: a sharp opening in his own words, the portrait, three or four pieces of work each shown in its own way (Celedom, GroqDictate, Machigotchi, Patchmarks or similar), contact links.
- One article: GroqDictate, the story of leaving Superwhisper and building his own app, with demos in windows. Windows can be lifted off the page, dragged, resized, minimised to the dock and restored. Close leaves a dashed ghost in the article that brings the window back, and dragging a window near its ghost snaps it into place.
- RSS feed, OG images, light/dark mode, 404 page.

**Deferred**
- The toy terminal (unless the GroqDictate article has a natural place for it).
- The "A Clock Made of Clocks" article (the original window-demo idea) and the Hono link-previews draft.
- Machigotchi in depth, and the terminal Zoom project once it's past the idea stage.

**Out**
- Browser-like navigation, history or reload inside windows; they show demos and nothing else.
- Saved window layouts, keeping windows between articles, the view counter, comments.

## Decisions

- 2026-09-05: Windows show a demo and nothing else; they are not a browser. Easter eggs are for the people who find them and add no features.
- 2026-09-06: Windows are attached to the page, not the viewport. They can be dragged partly off-screen. Restoring from the dock brings a window back where it was on screen. Dragging works on mobile too.
- 2026-09-06: Close removes the window and leaves a ghost in the article that brings it back. Windows snap back when dragged near their ghost. Dock entry and exit are animated.
- 2026-10-28: Start fresh. Codex's prototype is archived in `~/backups/website-codex-research-2026-10-28/` as evidence, not code to reuse.
- 2026-10-28: Celedom work can be public, without anything confidential.
- 2026-10-28: First release is the homepage plus one article (GroqDictate).
