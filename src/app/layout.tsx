import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import PWAProvider from "@/components/PWAProvider";
import Script from "next/script";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "Maria Lourdes Mansion",
  description: "Luxury hospitality experience at Maria Lourdes Mansion - A premium boutique hotel offering sophisticated accommodations and exceptional service.",
  keywords: ["luxury hotel", "boutique accommodation", "premium hospitality", "Maria Lourdes Mansion", "elegant rooms", "fine dining"],
  authors: [{ name: "Maria Lourdes Mansion" }],
  creator: "Maria Lourdes Mansion",
  publisher: "Maria Lourdes Mansion",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://Isabela.netlify.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Maria Lourdes Mansion - Luxury Hospitality Experience",
    description: "Experience unparalleled luxury at Maria Lourdes Mansion. Premium boutique hotel with sophisticated accommodations and exceptional service.",
    url: '/',
    siteName: 'Maria Lourdes Mansion',
    images: [
      {
        url: '/assets/Logo-domain.png',
        width: 1200,
        height: 630,
        alt: 'Maria Lourdes Mansion - Luxury Hotel',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maria Lourdes Mansion - Luxury Hospitality',
    description: 'Experience unparalleled luxury at Maria Lourdes Mansion.',
    images: ['/assets/Logo-domain.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Maria Lourdes Mansion',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'ML Mansion',
    'application-name': 'Maria Lourdes Mansion',
    'msapplication-TileColor': '#3b82f6',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#3b82f6',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* PWA Icons */}
        <link rel="icon" href="/assets/Logo-domain.png" sizes="any" />
        <link rel="icon" href="/assets/Logo-domain.png" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/Logo-domain.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/Logo-domain.png" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Apple PWA Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ML Mansion" />
        
        {/* Microsoft PWA Meta Tags */}
        <meta name="msapplication-TileImage" content="/assets/Logo-domain.png" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className={`${inter.className} bg-white dark:bg-black text-black dark:text-white gpu-optimized performance-optimized`}>
        <Script
          id="performance-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Early performance optimizations
              if (typeof window !== 'undefined') {
                // Enable GPU acceleration for body
                document.documentElement.style.transform = 'translateZ(0)';
                document.documentElement.style.willChange = 'transform';
                
                // Optimize scroll performance
                document.documentElement.style.scrollBehavior = 'smooth';
                document.documentElement.style.webkitOverflowScrolling = 'touch';
              }
            `
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PWAProvider>
            <Header />
            <main className="gpu-optimized performance-optimized">
              {children}
            </main>
          </PWAProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
