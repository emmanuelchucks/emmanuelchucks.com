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
- `wrangler.jsonc` names the preview Worker, `emmanuelchucks-preview` (https://emmanuelchucks-preview.echucks19.workers.dev), in Emmanuel's personal Cloudflare account. The live site is the Worker `emmanuelchucks`, which only changes when Emmanuel says so. Deploying needs a token for that account in `CLOUDFLARE_API_TOKEN`; on DevBox wrangler's own login only reaches Celedom, so use `cf`'s: `CLOUDFLARE_API_TOKEN="$(jq -r .oauth_token ~/.config/cloudflare/config/default.json)" pnpm deploy:preview` (run `cf auth whoami` first so the token is fresh).
- `.astro` files are linted but not type-checked: `astro check` doesn't support TypeScript 7, and Astro's replacement (`@astrojs/ts-content-mapper`) needs TypeScript 7.1.
- Playwright runs against `wrangler dev`, the built site served as Cloudflare serves it, including the Worker that answers range requests for clips (`worker/index.ts`).
