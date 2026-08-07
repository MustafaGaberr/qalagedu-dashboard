# Operations Dashboard

Internal Next.js dashboard for educational-center operations.

## Runtime and local setup

- Node.js 24.x
- pnpm 11.x

```bash
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

All `NEXT_PUBLIC_*` variables in `.env.example` are required. The API variable
is one full REST base URL, including its prefix and version (for example,
`https://api.example.invalid/api/v1`). Public variables are embedded by Next.js
at build time, so configure them in Hostinger before building.

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Hostinger managed Node.js Web App

- Node.js version: `24.x`
- Install command: `pnpm install --frozen-lockfile --prod=false`
- Build command: `pnpm build`
- Start command: `pnpm start`

Deploy this repository as a Next.js Web App. The development preview routes
under `/dev` return 404 when `NODE_ENV=production`.
