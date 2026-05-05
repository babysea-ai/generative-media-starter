# Changelog

All notable changes to `generative-media-starter` will be documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `netlify.toml` and a Netlify "Deploy" one-click button in the README, alongside the existing Vercel button. Netlify uses the official `@netlify/plugin-nextjs` runtime, which supports the Supabase auth-refresh proxy (Node.js Middleware) on Netlify Functions without any source changes.

### Notes

- Cloudflare Workers (`@opennextjs/cloudflare`) was evaluated and intentionally **not** added. The OpenNext Cloudflare adapter does not yet support Next.js Node.js Middleware, which the Supabase auth-refresh `proxy.ts` requires. A Cloudflare deploy target will be revisited once OpenNext supports Node.js Middleware or Supabase ships an edge-runtime SSR proxy helper.

## [0.1.0] - 2026-05-05

Initial public release.

### Added

- Next.js 16 (App Router) reference application with landing, login, and dashboard (Generate + Billing) routes.
- Supabase email/password authentication with auth-refresh middleware.
- Four PostgreSQL migrations: starter schema (`credit_balances`, `credit_ledger`, `generations`, `stripe_customers`, `processed_stripe_events`), BabySea API key column, generation-output preservation, and `generated-media` bucket hardening.
- Atomic credit RPCs for grant, reserve, charge, and refund flows with RLS for user-owned reads.
- Idempotent Stripe webhook handler for `checkout.session.completed` and `checkout.session.async_payment_succeeded`.
- One-time prepaid credit packs resolved by Stripe lookup key with optional `STRIPE_PRICE_*` overrides.
- BabySea TypeScript SDK integration: schema loading and cost estimation before reservation, generation behind a server-only `BABYSEA_API_KEY`.
- Private `generated-media` Supabase Storage bucket with signed URL delivery in generation history.
- Upstash Redis production rate limiting with local-dev fallback.
- Vercel deployment config (`vercel.json`) with standalone-clone install, build, and dev commands.
- Preflight `pnpm run doctor` validating env, BabySea schema, Stripe Prices, Supabase tables/storage, Upstash REST, and Vercel command alignment without printing secret values.
- Apache 2.0 license, NOTICE, SECURITY policy, CONTRIBUTING guide, CODE_OF_CONDUCT, and Dependabot configuration.
- Documentation: `docs/supabase.md`, `docs/stripe.md`, `docs/deploy-vercel.md`, `docs/customization.md`.

### Validated

- `pnpm install --ignore-workspace` from a standalone clone.
- `pnpm run doctor`, `pnpm typecheck`, `pnpm format`, and `pnpm build` all green against the reference deployment.
- BabySea SDK: `bfl/flux-schnell` schema loaded with $0.005/output cost estimate.
- Stripe: three one-time USD Prices verified by lookup key and direct ID override.
- Supabase: migrations applied, service role reachable, private `generated-media` bucket present.
- Upstash: REST ping succeeded.
