import { Inter } from 'next/font/google';
import Script from 'next/script';

import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';

import { webData } from '../constants';

import Footer from './pp/_components/footer';

import AdSense from '@/components/AdSense';
import GoogleAnalytic from '@/components/GoogleAnalytic';
import { Header } from '@/components/Header';
import ReactQueryClientProvider from '@/providers/ReactQueryClientProvider';

const inter = Inter({ subsets: ['latin'] });

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: webData.slogan + ' - ' + webData.title,
  description:
    webData.description +
    '為所有同學以最便利的方法及速度獲得歷屆試題，節省時間以準備公開試。所有香港之HKDSE、HKCE、HKAL的試題均來自網上。想找一個舒適的環境溫書、工作？無論學生還是上班一族，都需要不斷學習及進修，一個舒適的環境可以令你更集中甚至事半功倍，立即在 StudyHub 尋找您的溫書地方！',
  icons: ['/book.svg'],
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
          <Header />
          <div>{children}</div>
          <Footer />
        </ReactQueryClientProvider>
        <Toaster position='top-center' />
        <GoogleAnalytic />
        <AdSense />
      </body>
    </html>
  );
}
