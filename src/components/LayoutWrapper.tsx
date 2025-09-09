'use client';

import { useState } from 'react';

import { Header } from './Header';
import Sidebar from './Sidebar';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Header onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />

      <div className='min-h-[calc(100vh-4rem)]'>
        {/* Sidebar component handles both desktop and mobile */}
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Main content with left margin on desktop */}
        <main className='lg:ml-80'>{children}</main>
      </div>
    </>
  );
}
