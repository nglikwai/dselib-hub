import Link from 'next/link';

import { Library, Menu } from 'lucide-react';
import ToggleThemeButton from 'src/app/_components/toggle-theme-button';

interface HeaderProps {
  onMobileMenuToggle?: () => void;
}

export const Header = ({ onMobileMenuToggle }: HeaderProps) => {
  return (
    <header className='sticky top-0 z-20 bg-background/90 backdrop-blur-sm border-b border-border'>
      <nav className='mx-auto px-6 py-[10px] flex justify-between items-center border-dashed sm:gap-10 gap-4'>
        <div className='flex items-center gap-4'>
          {/* Mobile menu button on mobile, Logo on desktop */}
          <button
            onClick={onMobileMenuToggle}
            className='rounded-lg transition-colors lg:hidden'
            aria-label='Open menu'
          >
            <Menu size={20} />
          </button>

          {/* Logo on the left for desktop */}
          <h1 className='text-xl font-medium gap-2 items-center'>
            <Link href='/' className=' items-center gap-2 hidden lg:flex'>
              <Library size={24} />
            </Link>
          </h1>
        </div>

        <ToggleThemeButton />
      </nav>
    </header>
  );
};
