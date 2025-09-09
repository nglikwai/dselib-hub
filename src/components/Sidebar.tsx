'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useEffect, useState } from 'react';

import { X } from 'lucide-react';

import { allSubjects } from '@/constants/index';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

export default function Sidebar({
  isOpen = false,
  onClose,
  className,
}: SidebarProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle mobile backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && isOpen && (
        <div
          className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50'
          onClick={handleBackdropClick}
        />
      )}

      {/* Desktop sidebar */}
      {!isMobile && (
        <aside
          className='fixed left-0 top-16 w-80 h-[calc(100vh-4rem)] bg-background/95 backdrop-blur-sm overflow-y-scroll z-40 [&::-webkit-scrollbar]:hidden'
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className='p-6'>
            <SidebarContent pathname={pathname} />
          </div>
        </aside>
      )}

      {/* Mobile sidebar */}
      {isMobile && (
        <aside
          className={cn(
            'fixed left-0 top-0 h-screen w-80 bg-background z-50 transition-transform duration-300 ease-in-out overflow-y-scroll [&::-webkit-scrollbar]:hidden',
            isOpen ? 'translate-x-0' : '-translate-x-full',
            className
          )}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {/* Mobile header with close button */}
          <div className='flex items-center justify-between p-6'>
            <button
              onClick={onClose}
              className='p-2 rounded-lg transition-colors'
              aria-label='Close menu'
            >
              <X size={20} />
            </button>
          </div>

          {/* Sidebar content */}
          <div className='p-6'>
            <SidebarContent pathname={pathname} onLinkClick={onClose} />
          </div>
        </aside>
      )}
    </>
  );
}

// Shared sidebar content component
function SidebarContent({
  pathname,
  onLinkClick,
}: {
  pathname: string;
  onLinkClick?: () => void;
}) {
  return (
    <>
      {/* Navigation */}
      <nav className='space-y-8'>
        {allSubjects.map(category => (
          <div key={category.key} className='space-y-3'>
            <h3 className='text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider px-1 pb-1'>
              {category.displayNameTc}
            </h3>

            <ul className='space-y-1'>
              {category.items.map(subject => {
                const isActive = pathname === `/${subject.key}`;

                return (
                  <li key={subject.key}>
                    <Link
                      href={`/${subject.key}`}
                      onClick={onLinkClick}
                      className={cn(
                        'group inline-flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 hover:bg-accent border border-transparent',
                        isActive
                          ? 'bg-accent text-accent-foreground font-medium'
                          : 'text-foreground/70 hover:text-accent-foreground'
                      )}
                    >
                      <span
                        className={cn(
                          'w-5 h-5 flex-shrink-0 transition-colors duration-200',
                          isActive
                            ? 'text-accent-foreground'
                            : 'text-muted-foreground group-hover:text-accent-foreground'
                        )}
                      >
                        {subject.icon}
                      </span>
                      <span className='truncate text-sm'>
                        {subject.displayNameTc}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </>
  );
}
