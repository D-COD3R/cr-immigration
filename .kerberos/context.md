# CR Immigration project context

## Purpose

Costa Rica immigration information and workflow platform.

## Current milestone

Core functionality

## Durable decisions

- The primary application entry point is the Next.js App Router route at `src/app/page.tsx`.
- The guided intake starts at `/start` and submits validated data to `/api/intake`.
- `npm test` performs an offline production build and runs the dependency-free core-flow suite.
- `npm run test:integration` runs the supplemental production-server HTTP flow where local sockets are permitted.
- Keep this file compact; activity history belongs in task records.

## Known missing work

- Complete a human or browser-driven end-to-end intake review for the separate content and workflow validation milestone.
