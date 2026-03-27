# emmanuelchucks.com

Personal site and writing playground for Emmanuel Chucks, built on RedwoodSDK, React, Cloudflare, and MDX.

## Stack

- RedwoodSDK for routing, rendering, and Worker integration
- React 19
- Cloudflare Workers via `@cloudflare/vite-plugin`
- MDX posts powered by `@content-collections/*`
- Tailwind CSS
- Vite for `dev` and `build`
- Vite+ for `check` and `check:fix`

## Scripts

```sh
pnpm dev
pnpm build
pnpm preview
pnpm check
pnpm check:fix
pnpm typegen
```

`pnpm dev` and `pnpm build` stay on plain Vite for now. Static checks run through Vite+ so linting, formatting, and type checking stay unified under one command.

## Content

Posts live in [src/content](/Users/emmanuelchucks/projects/emmanuelchucks.com/src/content). Each post folder can include:

- `post.mdx` for the written post
- `demo.tsx` for an interactive embed
- supporting assets like audio or helper modules

Current posts:

- [src/content/generating-link-previews-with-hono/post.mdx](/Users/emmanuelchucks/projects/emmanuelchucks.com/src/content/generating-link-previews-with-hono/post.mdx)
- [src/content/a-clock-made-of-clocks/post.mdx](/Users/emmanuelchucks/projects/emmanuelchucks.com/src/content/a-clock-made-of-clocks/post.mdx)

Idea capture for future writing lives in [POST-IDEAS.md](/Users/emmanuelchucks/projects/emmanuelchucks.com/POST-IDEAS.md).

## Structure

- [src/worker.ts](/Users/emmanuelchucks/projects/emmanuelchucks.com/src/worker.ts) wires routes and layouts
- [src/app](/Users/emmanuelchucks/projects/emmanuelchucks.com/src/app) contains layouts, pages, components, and shared utilities
- [content-collections.ts](/Users/emmanuelchucks/projects/emmanuelchucks.com/content-collections.ts) defines post metadata and generated content wiring
- [vite.config.ts](/Users/emmanuelchucks/projects/emmanuelchucks.com/vite.config.ts) composes the site-specific Vite config with the shared `@kasoa/vite-plus-config` React preset

## Local Dev

1. `pnpm install`
2. `pnpm typegen`
3. `pnpm dev`

Open the local URL Vite prints in the terminal.
