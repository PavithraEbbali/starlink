import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SITE, IMAGES } from '@/lib/content';
import { SmoothScroll } from '@/components/providers/SmoothScroll';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  // Only the weights the design actually uses - keeps the font payload small.
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: SITE.metaTitle,
  description: SITE.metaDescription,
  applicationName: SITE.brandName,
  robots: { index: true, follow: true },
  openGraph: {
    title: SITE.metaTitle,
    description: SITE.metaDescription,
    type: 'website',
    siteName: SITE.brandName,
    images: [{ url: IMAGES.ogImage.src, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.metaTitle,
    description: SITE.metaDescription,
    images: [IMAGES.ogImage.src],
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  // Never block pinch-zoom - it is an accessibility requirement.
  maximumScale: 5,
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-void text-pure">
        <a
          href="#plans"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-pure focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-void"
        >
          Skip to plans
        </a>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
