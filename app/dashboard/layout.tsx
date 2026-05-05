import Link from 'next/link';
import { redirect } from 'next/navigation';

import { signOut } from './_lib/server-actions';

import { BABYSEA_PROVIDER_ORDER_DEFAULT } from '@/lib/app-config';
import { getUser } from '@/lib/supabase/server';
import { formatCredits } from '@/lib/utils';
import { InlineFavicon } from '@/styles/inline-babysea';

const navItems = [
  { href: '/dashboard/generate', label: 'Generate' },
  { href: '/dashboard/billing', label: 'Billing' },
];

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { supabase, user } = await getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: balance } = await supabase
    .from('credit_balances')
    .select('credits')
    .eq('user_id', user.id)
    .maybeSingle();

  return (
    <div className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-6 w-full rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center">
            <div className="flex items-center gap-3">
              <div aria-hidden="true" className="shrink-0">
                <InlineFavicon width={36} height={36} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-200">
                  Generative Media Starter
                </p>
                <p className="mt-1 break-all text-sm text-slate-300">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <div className="flex min-w-0 items-baseline justify-center gap-1.5 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-center">
                <span className="text-sm text-slate-400">
                  Available balance:
                </span>
                <span className="text-sm font-semibold text-white">
                  {formatCredits(balance?.credits)} credits
                </span>
              </div>
              <div className="flex min-w-0 items-baseline justify-center gap-1.5 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-center">
                <span className="text-sm text-slate-400">
                  Execution policy:
                </span>
                <span className="text-sm font-semibold text-white">
                  {BABYSEA_PROVIDER_ORDER_DEFAULT}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-end">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-teal-300/60 hover:bg-teal-300/10 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <form action={signOut}>
                <button
                  type="submit"
                  className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-400 transition hover:border-rose-300/60 hover:bg-rose-300/10 hover:text-rose-100"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}
