# Qalagedu Dashboard Agents Guide

## Purpose

- `qalagedu-dashboard` is the standalone internal administration dashboard.
- It is separate from `qalagedu-platform` (student-facing) and `qalagedu-backend` (future shared NestJS API).
- Do not modify sibling repositories while working on dashboard phases.

## Stack

- Next.js App Router, React, strict TypeScript, and Tailwind CSS v4.
- Package manager: `pnpm`.
- shadcn-compatible owned UI primitives using Base UI where installed.
- Cairo is loaded through `next/font`.
- Arabic is the default language. Root HTML must remain `lang="ar"` and `dir="rtl"`.
- Icons use `lucide-react`.
- Forms use React Hook Form and Zod.

## Architecture Rules

- Use Server Components by default.
- Use Client Components only for browser interactions such as forms, dropdowns, sidebar/mobile navigation, and dev role preview.
- Keep roles in `src/types/auth.ts`.
- Keep permissions in `src/config/permissions.ts`.
- Keep navigation in `src/config/dashboard-navigation.ts`.
- Use permission helpers from `src/lib/access-control.ts`; do not scatter role checks through page components.
- `SUPER_ADMIN` must derive access from the complete permission list.
- Use mock repositories in `src/mocks/repositories` during foundation phases.
- Do not add cookies, JWTs, localStorage auth, backend API clients, or SDKs before the integration phase.
- Do not place large mock arrays directly in route `page.tsx` files.

## Design Rules

- Preserve the Qalagedu green brand family and Cairo/RTL identity from the student platform.
- Dashboard UI should be denser, calmer, and more operational than the student platform.
- Use semantic tokens from `src/app/globals.css`; avoid repeated hardcoded foundational colors.
- Cards should be compact, with radius 8px or less unless a copied primitive requires otherwise.
- Do not create marketing heroes, fake complete modules, large fake tables, or broken buttons in foundation pages.
- Disabled communication actions must remain mock placeholders until the WhatsApp phase.

## Commands

- `pnpm install` after dependency or lockfile changes.
- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`

Run full checks once at the end of a complete phase instead of after every small patch.
