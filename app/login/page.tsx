import type { Metadata } from 'next';

import { authenticateWithEmailPassword } from './_lib/server-actions';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Generative Media Starter account.',
  robots: { index: false, follow: false },
};

type LoginPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.05] p-8 shadow-2xl shadow-black/50 backdrop-blur">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-200">
            Generative Media Starter
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-white">
            Sign in with email
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Use email/password auth with your Supabase confirmation and redirect
            settings.
          </p>
        </div>

        {params?.error ? (
          <div className="mb-4 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {params.error}
          </div>
        ) : null}

        <form action={authenticateWithEmailPassword} className="space-y-4">
          <label className="block text-sm font-medium text-slate-200">
            Email
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-300/70"
              placeholder="builder@example.com"
            />
          </label>

          <label className="block text-sm font-medium text-slate-200">
            Password
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              minLength={8}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-300/70"
              placeholder="At least 8 characters"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="submit"
              name="intent"
              value="sign-in"
              className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-100"
            >
              Sign in
            </button>
            <button
              type="submit"
              name="intent"
              value="sign-up"
              className="rounded-2xl border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:border-teal-300/60 hover:bg-white/10"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
