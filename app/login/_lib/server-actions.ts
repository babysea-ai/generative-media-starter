'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

import { createSupabaseServerClient } from '@/lib/supabase/server';

const authSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(8).max(128),
  intent: z.enum(['sign-in', 'sign-up']),
});

export async function authenticateWithEmailPassword(formData: FormData) {
  const parsed = authSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    intent: formData.get('intent'),
  });

  if (!parsed.success) {
    redirect(
      '/login?error=Use%20a%20valid%20email%20and%208%2B%20character%20password.',
    );
  }

  const supabase = await createSupabaseServerClient();
  const { email, password, intent } = parsed.data;

  if (intent === 'sign-in') {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      redirect('/login?error=Invalid%20email%20or%20password.');
    }

    redirect('/dashboard/generate');
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  if (data.session) {
    redirect('/dashboard/generate');
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (!signInError) {
    redirect('/dashboard/generate');
  }

  redirect(
    '/login?error=Account%20created%2C%20but%20Supabase%20email%20confirmation%20is%20still%20enabled.%20Disable%20email%20confirmation%20for%20direct%20login.',
  );
}
