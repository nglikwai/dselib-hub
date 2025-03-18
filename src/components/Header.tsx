import Link from 'next/link';

import { Library } from 'lucide-react';
import ToggleThemeButton from 'src/app/pp/_components/toggle-theme-button';

import { HeaderRight } from './HeaderRight';

export const Header = () => {
  return (
    <header className='border-b border-dashed sticky top-0 z-20 bg-background/60 backdrop-blur'>
      <div className='container mx-auto px-6 py-4 flex justify-between items-center border-l border-r border-dashed sm:gap-10 gap-4'>
        <h1 className='text-xl font-medium flex gap-2 items-center'>
          <Link href='/' className='flex items-center gap-2'>
            <Library size={24} />
            <span className='hidden sm:block'>dselib</span>
          </Link>
        </h1>

        <div className='flex'>
          <ToggleThemeButton />
          <HeaderRight />
        </div>
      </div>
    </header>
  );
};
