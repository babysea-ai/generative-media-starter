# Security policy

## Reporting vulnerabilities

Please report vulnerabilities privately through GitHub's **Report a vulnerability** flow on the public `babysea-ai/generative-media-starter` repository. If that flow is unavailable, contact the maintainers at `dev@babysea.ai`.

Do not open public issues for suspected vulnerabilities or exposed secrets.

## Supported versions

This starter is versioned from the `main` branch until the first tagged release. Security fixes target the latest public source.

## Secret handling

- Never commit `.env`, `.env.local`, `.env.production`, `.vercel`, or exported dashboard secrets.
- Keep `BABYSEA_API_KEY`, `SUPABASE_SECRET_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and Upstash tokens server-side.
- Rotate any secret that appears in logs, screenshots, chat, issues, or pull requests.
- Use test-mode Stripe keys for local development and live keys only in production deployment secrets.
