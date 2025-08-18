import Link from 'next/link';

import { Library } from 'lucide-react';
import ToggleThemeButton from 'src/app/_components/toggle-theme-button';

export const Header = () => {
  return (
    <header className='border-dashed sticky top-0 z-20 bg-background/100'>
      <div className='container mx-auto px-6 py-[10px] flex justify-between items-center border-dashed sm:gap-10 gap-4'>
        <h1 className='text-xl font-medium flex gap-2 items-center'>
          <Link href='/' className='flex items-center gap-2'>
            <Library size={24} />
          </Link>
        </h1>

        <div className='flex'>
          <ToggleThemeButton />
        </div>
      </div>
    </header>
  );
};
