import { Inter } from 'next/font/google';

import './globals.css';
import type { Metadata } from 'next';

import { Header } from '@/components/Header';
import ReactQueryClientProvider from '@/providers/ReactQueryClientProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StudyHub',
  description:
    '想找一個舒適的環境溫書、工作？無論學生還是上班一族，都需要不斷學習及進修，一個舒適的環境可以令你更集中甚至事半功倍，立即在 StudyHub 尋找您的溫書地方！',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} relative min-h-screen overscroll-none`}
      >
        <ReactQueryClientProvider>
          <Header />
          <div>{children}</div>
          <footer className='border-t border-dashed'>
            <div className='container border-dashed border-l border-r mx-auto p-6 text-sm text-neutral-500'>
              © {new Date().getFullYear()} dselib. all rights reserved.
            </div>
          </footer>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
