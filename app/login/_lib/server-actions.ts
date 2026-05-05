'use server';

import { redirect } from 'next/navigation';

import { getSiteUrl } from '@/lib/env';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function signInWithGoogle() {
  const supabase = await createSupabaseServerClient();
  const redirectTo = new URL('/auth/callback', getSiteUrl());
  redirectTo.searchParams.set('next', '/dashboard/generate');

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectTo.toString(),
      queryParams: {
        prompt: 'select_account',
      },
    },
  });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  if (!data.url) {
    redirect('/login?error=Google%20sign-in%20is%20not%20configured.');
  }

  redirect(data.url);
}
