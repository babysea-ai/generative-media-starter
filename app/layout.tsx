import type { Metadata } from 'next';

import '@/styles/globals.css';

const title = 'Generative Media Starter';
const description =
  'Generative media billing beyond checkout. Built on BabySea, Stripe, Supabase, Upstash, and Vercel.';
const socialImageUrl =
  './assets/starter.png';

export const metadata: Metadata = {
  metadataBase: new URL('https://demo.generative-media-starter.babysea.live'),
  applicationName: title,
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  keywords: [
    'babysea',
    'open-source',
    'starter-pack',
    'stripe',
    'supabase',
    'upstash',
    'vercel',
    'netlify',
    'ai-infrastructure',
    'control-plane',
    'execution-layer',
    'developer-tools',
    'generative-ai',
    'inference-providers',
    'image-generation',
    'video-generation',
    'multimodal',
    'generative-media',
    'creative-tools',
  ],
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    shortcut: ['/favicon.ico'],
  },
  openGraph: {
    title,
    description,
    images: [
      {
        alt: title,
        height: 630,
        url: socialImageUrl,
        width: 1200,
      },
    ],
    siteName: title,
    type: 'website',
    url: '/',
  },
  robots: {
    follow: true,
    index: true,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [socialImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
