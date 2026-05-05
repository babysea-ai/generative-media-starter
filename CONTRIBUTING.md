# Contributing

Thanks for improving Generative Media Starter.

## Development flow

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Copy the environment template:

   ```bash
   cp .env.example .env.local
   ```

3. Configure Supabase, Stripe, BabySea, and optional Upstash using the README and docs.

4. Validate live service wiring:

   ```bash
   pnpm run doctor
   ```

5. Run the starter:

   ```bash
   pnpm dev
   ```

## Before opening a pull request

Run these checks:

```bash
pnpm format
pnpm run doctor
pnpm typecheck
pnpm build
```

## Contribution guidelines

- Keep the starter public-repo friendly: no secrets, no private service IDs, and no local-only assumptions.
- Keep BabySea access server-side through `BABYSEA_API_KEY`.
- Keep pricing and schema validation SDK-driven.
- Use persistent Stripe Prices with lookup keys, not inline Checkout prices.
- Keep generated media private in Supabase Storage and expose it with signed URLs.
