# emmanuelchucks.com design

How the rebuild is put together, under the charter (`docs/CHARTER.md`). The charter decides what and why; this decides where each fact lives, which owner does each job, what's left for our code, and how it's checked. Edit it in place as decisions land.

## Pages

- `/`: `src/pages/index.astro` + `work` collection. JS: none.
- `/posts/<slug>`: `posts` collection (MDX). JS: window shell + that post's demos, on scroll.
- `/rss.xml`: `@astrojs/rss` over `posts`. JS: none.
- `/og/<slug>.png`: Satori + resvg endpoint, prerendered. JS: none.
- `/404`: `src/pages/404.astro`. JS: none.

`/posts/<slug>` keeps the current site's URL shape, so nothing that links in today breaks. All routes are prerendered with `build.format: "file"`, so `/posts/<slug>` is served as is instead of redirecting to a trailing slash; Cloudflare Workers static assets serves them with no Worker code (`not_found_handling: "404-page"`). The one exception is clips (`/work/*.mp4`): static assets answer a byte range with the whole file, and Safari then won't play a video, so those requests run `worker/index.ts` first, which returns just the bytes asked for. Playwright runs against `wrangler dev`, so its tests see the site as Cloudflare serves it, and a test asks every clip for two bytes.

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
- **Pictures:** the homepage shows icons only. Each project has its own page where its screens stand on the wall in the light, in the reader's light or dark mode; each uses `src/components/project.astro`. Staff chat (`/work/staff-chat`): a thread and the chat list from the demo recording (simulator, made-up people). Celebrant and Vendors (`/work/celebrant-and-vendors`): screenshots taken 2026-11-03 on an iPhone 17 Pro simulator (iOS 26.5) from the EAS `e2e` builds (Celebrant 4.4.6, Vendors 1.4.6, staging backend), signed in as the seeded app review accounts (`seeds/seed_test_accounts_full.sql` in the backend; the code is in App Store Connect's review details), each in light and dark mode with the status bar set to 9:41. Avoid the dashboards: E2E runs leave fixture rows like "E2E Vendor Detail Probe" in these accounts. DataMeter (`/work/datameter`): its window captured 2026-11-03 through Mac computer use with the Mac display in a 2x scaled mode (`displayplacer`, mode 52, then back to 34; the display is 1080p, so normal captures are 1x), showing a made-up day swapped in for the real database (backup in the Mac's `~/backups/datameter-2026-11-03`; the real file restored afterwards). GroqDictate (`/work/groqdictate`, `src/components/dictation.astro`): one take, with only the panel as video. The panel is always dark on macOS, so a 640x200 crop of it from the dark take (10 s, the talking in the middle at double speed) plays over a note drawn by the page in the reader's mode, and switches live. The sentence is the transcript Whisper returned in that take, as real text, revealed by a small script when the clip ends (when it was pasted), held, then cleared before the loop restarts; a script rather than a CSS timer so the two can't drift apart. Layout is the recording's own (panel 50% wide at the top, 34pt text in a centered column), in container units. The demo sits above the drifting light so it looks as it did on screen. Reduced motion, or a browser that refuses autoplay, shows the panel mid-recording with the sentence, still. Recorded by dictating into a one-field page in full-screen Safari (its own Space) at 4K with the Screenshot toolbar. Screenshot's Record button ignores computer use clicks, so a take needs one real click. Still to come: the GroqDictate iPhone app.
- **Words:** no tagline. You found every drafted one machine-sounding; the line under the name is your own GitHub bio until you have one of your own. "Taking on new work." sits under the links, as plain text with no badge.
- **Type and grey:** one font, Bricolage Grotesque, with the name at optical size 96. Three levels of ink (`--ink`, `--text`, `--muted`), each at least 4.5:1 against the wall where the light is brightest; a Playwright axe test checks contrast in light and dark.
- **Font size:** `scripts/subset-font.sh` builds `src/assets/fonts/bricolage.woff2` (18 KB, from 77 KB): Basic Latin and typographic punctuation, weights 400 to 700, the full optical-size axis, and no kerning (23 KB of the subset across both axes, with almost no visible difference in this face). Homepage: 43.7 KB on Lighthouse's phone run, 2026-11-03.

### Project pages: where they stand (2026-11-03)

Each page is a showcase of a few moments, each with a heading, a sentence or two, and one or two screens, clips or close-ups. On wide screens the words sit beside phone screens, alternating sides; Mac windows and the GroqDictate demo keep the words above. On phones it's words, then screens, and two phones stack rather than shrink to half width. Pages show the work; demos to try belong in articles. Iterate on the tailnet dev server; deploy at agreed milestones.

Stills are AVIF (quality 70, effort 2), with WebP at quality 90 and `smartSubsample` for browsers without AVIF (both set in `project.astro` and `astro.config.mjs`). At WebP's defaults (quality 74, colour at half resolution) small text smeared and dark areas showed blocks; AVIF is about a third smaller than that WebP at the same sharpness. Effort 2 because the dev server encodes on every request and the default took 5 s per phone screen. Clips are AV1 (`.av1.mp4`) with H.264 (`.mp4`) for browsers and devices that can't decode it (Apple's before iPhone 15 Pro and M3); AV1 is half the size from the original recordings. Nothing loads until it's near the screen: stills are lazy, and clips have no autoplay and are played by a small script when they come into view, so the version hidden by light or dark mode, or by reduced motion, is never downloaded. Measured 2026-11-05 on a 3x phone in light mode, Celebrant downloads 0.4 MB of video on open and 0.75 MB after scrolling through, where it was 3.7 MB on open.

How each page's screens were made, so they can be made again:

- **Staff chat:** four moments, each a heading, a sentence or two, and the screens or clips that show it: the hold menu (clip), the 🎉 popper and ❤️ hearts (clip, and a close-up clip), a message waiting with a clock then sent (two close-ups), and the assistant answering in a group and in its own chat. Simulator (iPhone 17, iOS 27) running a Release build of the chat app at `6c89c94a` made for it: the worktree `~/work/clients/celedom/worktrees/celedom-internal-chat/website-shots` rsynced to the same path on the Mac (exclude `/apps/mobile/ios` and `/apps/mobile/android` anchored, or the native modules' own `ios` folders go missing), `expo prebuild -p ios --clean`, then xcodebuild with `EXPO_PUBLIC_SOURCE_COMMIT`, `EXPO_PUBLIC_SERVER_ORIGIN=http://100.101.24.49:8892`, `DEBUG_INFORMATION_FORMAT=dwarf` (a dSYM makes a build cycle with the PostHog upload phase) and `CODE_SIGN_IDENTITY=-`. Its `Info.plist` has `NSAllowsLocalNetworking`, which makes iOS ignore `NSAllowsArbitraryLoads`, so the copy used here had that key deleted and arbitrary loads allowed, then was re-signed ad hoc. Server: user unit `website-shots-server` on `100.101.24.49:8892`, `pnpm db:reset` then `pnpm test-history --messages 3000` (its last step, spreading send times, hits SQLITE_BUSY while the server runs; run that SQL with the server stopped). Other people's messages come from `pnpm second-person --as <name>` (deleting one leaves a "This message was deleted" line, so don't). The waiting message was sent while the server process was stopped with SIGSTOP. Clips are `simctl io recordVideo`, which writes a frame only when the screen changes and draws the Dynamic Island: they're made constant-rate, cut to loops whose first and last frames match, the island painted out with `delogo`, and encoded at 680 px. That's soft on a 3x phone, where the page draws a phone 340 px wide; later clips keep the recording's full 1206 px (see Celebrant), and these get the same when they're re-recorded. The assistant's answers are real model output from the dev AI account (a few cents). Jira isn't connected on a local server, so ticket requests fail there.
- **Celebrant and Vendors:** four moments: a clip of opening Adaeze Events & Decor from Explore (contact details hidden until they accept), a clip of the request form to Adaeze coming back filled in after the app was closed (a saved draft, never sent), a pair of clips of one request from both sides, and the existing Vendors chat as a still. The first two are one take each in light and dark (`simctl io recordVideo`), taken 2026-11-05, cut like the staff chat clips but kept at the recording's full 1206 px width: H.264 at CRF 24 with `-tune stillimage` (about 0.9 MB each) and AV1 (SVT-AV1, CRF 42, about 0.4 MB). At 680 px and CRF 30 the text looked soft and smeared on a phone. Keep them to Adaeze: Explore's other cards and lists below the top rated vendors are staging test vendors, one showing testers' emails, and the move into the request form passes over the Dashboard's E2E fixtures, so that clip starts once the form is in. The vendor's page still was taken 2026-11-05 the same way as the others (EAS `e2e` builds 4.4.6 and 1.4.6 on an iPhone 17 Pro simulator, iOS 26.5, the review accounts). Copy the `.tar.gz` artifacts to the Mac, not the unpacked apps: 43 MB each against 148 MB over its hotspot. Relaunch the app before a shot, or a "◀ Celedom Vendors" back link sits in the status bar. Creating an event along the way left "Ama's 30th birthday" (21 Nov, East Legon, GHS 2,001 to 3,000) in client.test1's events on staging.
- **Celebrant and Vendors, the request from both sides** (`celebrant-send-*`, `celebrant-accept-*`, taken 2026-11-10): in Celebrant, Send Request on Adaeze's page, pick "Ama's 30th birthday" in the sheet, and the event opens with Adaeze pending; in Vendors, Adaeze's dashboard shows the one new request, Accept, and the chat opens with the request pinned at the top (a vendor with a single new request is taken straight to the chat; from the request's own page it always is). Both sides are shown as a pair, which stacks on phones; the chat is empty, so the conversation still stands as its own moment below. Clips are cut and encoded like the others (about 1 MB and 0.5 MB for the sends, 0.15 MB for the accepts); the accepts have no AV1, since it came out no smaller than their H.264 even in SVT-AV1's screen content mode (a still screen with a few changes is what `-tune stillimage` H.264 does best). `project.astro` lists a clip's `.av1.mp4` only where the file exists, with the last frame held 2.5 s (`tpad`) since `recordVideo` writes nothing once the screen is still; each still is the clip's last frame. Builds: no EAS `e2e` build is newer than 4.4.6/1.4.6 (from September, before October's chat changes), so Release simulator builds of Celebrant 4.4.10 and Vendors 1.4.10 were made on the Mac from frontend `main` at `f174d645` with `CELEDOM_ENVIRONMENT=e2e` (staging API): a worktree synced with `mac-run --sync`, `pnpm install`, `expo prebuild -p ios --clean`, then `xcodebuild -configuration Release -sdk iphonesimulator ARCHS=arm64` with `CODE_SIGN_IDENTITY=- CODE_SIGN_STYLE=Manual DEVELOPMENT_TEAM=MY2UGLVC33` (about 7 minutes each). Built with `CODE_SIGNING_ALLOWED=NO` the apps open on "Unable to open Celedom": with no keychain entitlement, secure storage fails (-34018). Re-signing such a build ad hoc with entitlements gets it refused at launch, so rebuild instead. The builds and worktree were deleted afterwards. agent-device and `simctl` lag a few seconds per step, so the take scripts wait for each screen's text before the next tap, and `recordVideo` sometimes stalls for many seconds (the light send skipped 21 s of the sheet sitting still, which the cut hides); check frame times with `ffprobe -show_entries frame=pts_time` before cutting. On 2026-11-10 the Mac's hotspot stopped carrying TCP except DNS for hours (likely out of data), so the takes ran through a temporary tunnel: the API, image and NetInfo hosts (`clients3.google.com`, or the app shows "Offline") pointed at 127.0.0.1 in the Mac's `/etc/hosts`, a small SNI passthrough on port 443 carrying them over `ssh -D` to DevBox; `/etc/hosts` was restored after. Staging changes (approved by Emmanuel 2026-11-10; backups and a log in DevBox's `~/backups/celedom-staging-adaeze-2026-11-10/`): the add-to-event route needs the vendor to offer an active service in the event's currency, so Adaeze (`test-vendor-1`, the App Store review vendor) got a second service, `website-ghs-adaeze-1` in `vendor_services` (GHS, `PR_GHS_2001_3000`, 200100 to 300000 pesewas, active, order 1, "Birthday and party planning and decoration in Accra…") with category `event-planners` in `vendor_service_categories`. Her NGN service stays first, so her pricing elsewhere still reads in naira. An event allows one active request per vendor, so between takes the accepted request was set to `cancelled` with `event_id` cleared (`8FKeb-7dgsZz8aLOCnD_d`, `NJql2mIsrpxJfuja0lbcf`; their chats now read "This chat is closed", and Celebrant's Activity shows the first as Cancelled), and requests from failed takes, never accepted, were deleted with their notification and status history. Left in place: request `f3FSh7kG2azW-qNBKzJ42` for Ama's 30th birthday, accepted, with its chat. Adaeze spent 15 staging coins (305 to 290).
- **DataMeter:** both screens drawn offscreen from DataMeter's own `DashboardView` and `MenuBarRootView`, by a small render tool compiled against the repo (`UsageViewModel` with a stub sampler, a fixed "Wi‑Fi" network and a temporary SQLite file holding a made-up day). Nothing on the Mac's screen or its real database is touched. The window is at 2x. The menu bar panel is a clip, drawn at 4x on 2026-11-05 (the page shows it 300 px wide, 900 on a 3x phone): ten refreshes, each held 2 s (the app's interval while the panel is open), with an App Store download adding 20 MB a refresh so it passes FaceTime, Music and Chrome; its last frame is the still. The engine caches each query until it records usage itself, so the tool makes a fresh `UsageViewModel` per refresh after writing that refresh's usage straight to the database. The page rounds the square captures at macOS 26's radii.
- **GroqDictate on iPhone:** a clip of a recording starting, from the app as it opens (light and dark, its last frame as the still; the status bar shows the real time, set with an ISO date since `--time H:MM` is sometimes refused, so it matches the new recording's row). Don't scroll the list up first: the large title collapses and the record button slides under the small centred title, and the recording waiting to retry as a still, taken 2026-11-05 from a Debug simulator build of `GroqDictateIOS` (`xcodebuild -sdk iphonesimulator`, unsigned), with five made-up recordings written straight into the app's `Application Support/GroqDictate/Sessions` (one `session.json` per recording, ISO 8601 dates, plus a silent `segment-000N.m4a` per part): from 44 seconds to 21 minutes, one whose third part failed with "Check connection".
- **GroqDictate timings:** the demo's 1.1 to 2.6 seconds are the `transcription_latency` entries (`total_ms`) in the Mac app's `~/Library/Application Support/GroqDictate/Diagnostics/diagnostics.jsonl`, nine dictations on 2026-11-03 over the Mac's iPhone hotspot; seven were under 1.6 s.

Still open: the staff chat list (the seeded server's list shows test-fixture chats like "Inline cards").

To come back to, without holding the other pages up (noted 2026-11-05):

- **Staff chat, hold clip:** the reaction effect in the chat app is broken and another session is fixing it. Once that lands, rebuild the app and re-record the hold clip (`chat-hold-*`, still `chat-menu-*`), light and dark.
- **Staff chat, hold as a pair:** with that re-recording, also record a close-up of the reaction landing under the message, and show the hold step as a pair (full-phone clip beside the close-up), like the celebrations step.
- **Captions:** Emmanuel finds them acceptable but wants another pass on the wording of every page later.
- **Test server:** `website-shots-server` stays running for the re-recording; stop it (`systemctl --user stop website-shots-server`) once the staff chat clips are final.
