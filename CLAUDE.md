# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production  
- `pnpm preview` - Preview production build
- `pnpm lint:check` / `pnpm lint:fix` - ESLint checking/fixing
- `pnpm format:check` / `pnpm format:fix` - Prettier formatting
- `pnpm check:types` - TypeScript type checking
- `pnpm fix:all` - Run all linting, formatting, and type checking
- `pnpm generate:types` - Generate Wrangler types for Cloudflare Workers

## Architecture Overview

This is a RedwoodSDK-based personal website/blog deployed to Cloudflare Workers:

### Core Technologies
- **RedwoodSDK (rwsdk)**: Full-stack framework for Cloudflare Workers with file-based routing
- **Vite**: Build tool with Cloudflare Workers integration 
- **React**: UI framework with server-side rendering
- **Content Collections**: MDX-based content management for blog posts
- **TailwindCSS**: Styling framework
- **TypeScript**: Type safety throughout

### Key Architecture Patterns

**Worker-First Design**: The application runs on Cloudflare Workers with `src/worker.tsx` as the main entry point. This defines the routing structure using RedwoodSDK's declarative router with nested layouts and middleware.

**Content-Driven**: Blog posts are stored as MDX files in `src/content/` and processed by Content Collections, which automatically generates TypeScript types and handles frontmatter validation with Valibot schemas.

**Component Architecture**:
- `src/app/document.tsx` - Root HTML document wrapper
- `src/app/layouts/` - Layout components (main and post layouts)  
- `src/app/pages/` - Page components for routes
- `src/app/components/` - Reusable UI components including a desktop-like window system

**Routing Structure**:
- Index route serves the home page
- `/posts/:slug` serves individual blog posts
- Post lookup happens via middleware that populates context

### Important Files
- `content-collections.ts` - Configures MDX content processing and post schema
- `vite.config.ts` - Build configuration with multiple plugins
- `wrangler.jsonc` - Cloudflare Workers deployment configuration
- `src/worker.tsx` - Main application entry point with routing
- `src/client.tsx` - Client-side hydration entry point

### Content Management
Posts require frontmatter with `id`, `title`, `description`, `author`, `isDraft`, and `publishedAt` fields. The system automatically generates slugs, reading time estimates, and tracks git-based update timestamps.

### Deployment
The application is configured for Cloudflare Workers deployment with KV namespace bindings for view counters and asset serving capabilities.