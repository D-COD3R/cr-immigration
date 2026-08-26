# Costa Rica Immigration

Bilingual immigration information and guided intake built with Next.js.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Persisting intake submissions with Neon

1. Provision Neon through the Vercel Marketplace and connect it to this project.
2. Apply `db/migrations/001_create_intake_submissions.sql` to the database.
3. Ensure Vercel provides `DATABASE_URL` to Production, Preview, and Development. `INTAKE_STORE=neon` is optional; Neon is selected automatically when `DATABASE_URL` is present.
4. Redeploy, submit a test assessment, and verify the row in `public.intake_submissions`.

The database URL is used only by the server-side intake API. Never expose it using a `NEXT_PUBLIC_` variable. The migration revokes access from PostgreSQL's `public` role; the application connects with its private Neon database role.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
