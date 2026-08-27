# CR Immigration project context

## Purpose

Costa Rica immigration information and workflow platform.

## Current milestone

Content and workflow validation

## Durable decisions

- The primary application entry point is the Next.js App Router route at `src/app/page.tsx`.
- The guided intake starts at `/start` and submits validated data to `/api/intake`.
- Keep this file compact; activity history belongs in task records.

## Known missing work

- Complete a human or browser-driven end-to-end intake review; browser access was declined during the 2026-08-26 prototype audit.
