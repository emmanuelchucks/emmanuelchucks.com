# emmanuelchucks.com

Emmanuel Chucks's personal site: a static Astro site served by Cloudflare Workers static assets. What it is and why is in [docs/CHARTER.md](docs/CHARTER.md); how it's built is in [docs/DESIGN.md](docs/DESIGN.md).

## Scripts

```sh
pnpm dev             # Astro dev server
pnpm build           # static site in dist/
pnpm check           # Vite+ lint, format and TypeScript
pnpm test            # Playwright, against the built site in Chromium, Firefox and WebKit
pnpm lighthouse      # Lighthouse CI with the charter's budgets, against dist/
pnpm deploy:preview  # build and deploy to the preview Worker
```

CI runs `check`, `test` and `lighthouse` on every push.

## Notes

- Node and pnpm versions come from `devEngines` and `packageManager` in `package.json`; `.node-version` is for CI.
- `wrangler.jsonc` names the preview Worker, `emmanuelchucks-preview`. The live site is the Worker `emmanuelchucks`, which only changes when Emmanuel says so.
- `.astro` files are linted but not type-checked: `astro check` doesn't support TypeScript 7, and Astro's replacement (`@astrojs/ts-content-mapper`) needs TypeScript 7.1.
- Playwright starts `astro preview --ignore-lock`, because Astro otherwise moves the preview server to the background when it detects an agent.
