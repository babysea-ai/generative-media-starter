# Security policy

## Reporting vulnerabilities

Please report vulnerabilities privately through GitHub's **Report a vulnerability** flow on the public `babysea-ai/generative-media-starter` repository. If that flow is unavailable, contact the maintainers at `dev@babysea.ai`.

Do not open public issues for suspected vulnerabilities or exposed secrets.

## Supported versions

This starter is versioned from the `main` branch until the first tagged release. Security fixes target the latest public source.

## Sentry code guard

The public starter repository is connected to a private, repository-specific Sentry project for repository ownership, Seer-assisted review, and issue routing. The Sentry organization slug and project slug are intentionally not committed to this public repo.

This repo keeps Sentry as a repository guardrail, not runtime telemetry. It ships `scripts/sentry-project-check.mjs` and a scheduled `Sentry Project Check` workflow that verifies the configured project slug, active status, `other` platform, and Code Guard ownership rules using GitHub Actions secrets only. Use `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, and `SENTRY_PROJECT` as repository secrets. Local `.sentryclirc` files are ignored by git. No Sentry SDK, DSN, tracing, error-reporting client, or runtime telemetry is included in this starter.

## Secret handling

- Never commit `.env`, `.env.local`, `.env.production`, `.vercel`, or exported dashboard secrets.
- Keep `BABYSEA_API_KEY`, `SUPABASE_SECRET_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and Upstash tokens server-side.
- Rotate any secret that appears in logs, screenshots, chat, issues, or pull requests.
- Use test-mode Stripe keys for local development and live keys only in production deployment secrets.
