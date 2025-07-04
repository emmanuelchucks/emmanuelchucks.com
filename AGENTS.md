# AGENTS.md - Development Guidelines

## Build/Test/Lint Commands
- **Dev**: `pnpm dev` - Start development server
- **Build**: `pnpm build` - Build for production
- **Lint**: `pnpm lint:check` / `pnpm lint:fix` - ESLint checking/fixing
- **Format**: `pnpm format:check` / `pnpm format:fix` - Prettier checking/fixing
- **Type Check**: `pnpm check:types` - TypeScript type checking
- **Fix All**: `pnpm fix:all` - Run all fixes and type check
- **Package Manager**: Use `pnpm` (required by packageManager field)

## Code Style & Conventions
- **Framework**: RedwoodSDK with React, TypeScript, Tailwind CSS
- **Imports**: Use `~/` for src imports, prefer named imports
- **Components**: Use React functional components with TypeScript
- **Props**: Destructure with rest spread pattern: `{ className, ...rest }`
- **Styling**: Tailwind CSS classes, template literals for conditional classes
- **Validation**: Use Valibot for runtime validation (`* as v from "valibot"`)
- **Error Handling**: Use Valibot schemas for input validation
- **Naming**: camelCase for variables/functions, PascalCase for components
- **File Structure**: Components in `src/app/components/`, helpers in `src/app/helpers/`
- **ESLint Config**: Uses @antfu/eslint-config with React, better-tailwindcss plugin