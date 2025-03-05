import Link from 'next/link';

import { Coffee, Library, LibraryBig } from 'lucide-react';

import { Button } from './components/ui/button';
import { HeaderRight } from './HeaderRight';

export const Header = () => {
  return (
    <header className='border-b border-dashed sticky top-0 z-20 bg-background/60 backdrop-blur'>
      <div className='container mx-auto px-4 py-3 flex justify-between items-center border-l border-r border-dashed gap-10'>
        <h1 className='font-bold'>
          <Link href='/' className='flex items-center gap-3'>
            <Library size={24} />
            dselib
          </Link>
        </h1>
        <div className='grow space-x-5'>
          <Button variant={'ghost'} className='group'>
            <Coffee />
            <span className='overflow-x-hidden w-0 group-hover:w-12 transition-all'>
              自修室
            </span>
          </Button>
          <Button variant={'ghost'} className='group'>
            <LibraryBig />
            <span className='overflow-x-hidden w-0 group-hover:w-32 transition-all'>
              Pastpaper 圖書館
            </span>
          </Button>
        </div>
        <HeaderRight />
      </div>
    </header>
  );
};
