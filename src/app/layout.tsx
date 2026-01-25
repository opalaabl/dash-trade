// src/app/layout.tsx
import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { Providers } from './providers';
import { SidebarProvider } from '../contexts/SidebarContext';
import { minikitConfig } from '../../minikit.config';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const cinzelDecorative = localFont({
  src: '../../public/CinzelDecorative-Black.otf',
  variable: '--font-cinzel-decorative',
  display: 'swap',
});

const { miniapp } = minikitConfig;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: miniapp.ogTitle,
    description: miniapp.ogDescription,
    openGraph: {
      title: miniapp.ogTitle,
      description: miniapp.ogDescription,
      url: miniapp.homeUrl,
      siteName: miniapp.name,
      images: [
        {
          url: miniapp.ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${miniapp.name} Banner`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    other: {
      'base:app_id': '69761cb63a92926b661fd4e5',
      'fc:miniapp': JSON.stringify({
        version: 'next',
        imageUrl: miniapp.heroImageUrl,
        button: {
          title: `Launch ${miniapp.name}`,
          action: {
            type: 'launch_miniapp',
            name: miniapp.name,
            url: miniapp.homeUrl,
            splashImageUrl: miniapp.splashImageUrl,
            splashBackgroundColor: miniapp.splashBackgroundColor,
          },
        },
      }),
      'fc:frame': 'vNext',
      'fc:frame:image': `${miniapp.homeUrl}/api/frame/image?view=main`,
      'fc:frame:image:aspect_ratio': '1.91:1',
      'fc:frame:post_url': `${miniapp.homeUrl}/api/frame`,
      'fc:frame:button:1': '📊 Chart',
      'fc:frame:button:1:action': 'post',
      'fc:frame:button:1:target': `${miniapp.homeUrl}/api/frame?action=chart`,
      'fc:frame:button:2': '🔗 Connect',
      'fc:frame:button:2:action': 'post',
      'fc:frame:button:2:target': `${miniapp.homeUrl}/api/frame?action=connect`,
      'fc:frame:button:3': '💰 Claim USDC',
      'fc:frame:button:3:action': 'post',
      'fc:frame:button:3:target': `${miniapp.homeUrl}/api/frame?action=claim`,
      'fc:frame:button:4': '🪙 Coins',
      'fc:frame:button:4:action': 'post',
      'fc:frame:button:4:target': `${miniapp.homeUrl}/api/frame?action=coins`,
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 0.5,
  maximumScale: 3,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${ibmPlexMono.variable} ${cinzelDecorative.variable}`}>
      <head>
        <link rel="icon" href="dash-polos.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}