'use client';

import { usePathname } from 'next/navigation';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (command: string, id: string, config: { page_path: string }) => void;
  }
}

const GoogleAnalytic = () => {
  const pathname = usePathname(); // Get the current route pathname

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID as string, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
};

export default GoogleAnalytic;
