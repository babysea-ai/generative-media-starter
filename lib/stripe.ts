import 'server-only';

import Stripe from 'stripe';

import { requireEnv } from './env';

export function createStripeClient() {
  return new Stripe(requireEnv('STRIPE_SECRET_KEY'));
}
