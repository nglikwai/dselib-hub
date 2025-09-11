import { Inter } from 'next/font/google';
import Script from 'next/script';

import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';

import { webData } from '../constants';

import Footer from './_components/footer';

import GoogleAnalytic from '@/components/GoogleAnalytic';
import LayoutWrapper from '@/components/LayoutWrapper';
import ReactQueryClientProvider from '@/providers/ReactQueryClientProvider';

const inter = Inter({ subsets: ['latin'] });

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: webData.slogan + ' - ' + webData.title,
  description:
    webData.description +
    '為所有同學以最便利的方法及速度獲得歷屆試題，節省時間以準備公開試。所有香港之HKDSE、HKCE、HKAL的試題均來自網上。',
  icons: ['/book.ico'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <Script
          strategy='afterInteractive'
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script id='google-analytics' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `}
        </Script>
        <meta name='google-adsense-account' content='ca-pub-6622218753379872' />
      </head>
      <body
        className={`${inter.className} relative min-h-screen overscroll-none`}
      >
        <ReactQueryClientProvider>
          <LayoutWrapper>
            {children}
            <Footer />
          </LayoutWrapper>
        </ReactQueryClientProvider>
        <Toaster position='top-center' />
        <GoogleAnalytic />
      </body>
    </html>
  );
}
