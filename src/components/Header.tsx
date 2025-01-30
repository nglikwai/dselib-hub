import Link from 'next/link';

import { HeaderRight } from './HeaderRight';

export const Header = () => {
  return (
    <header className='bg-white shadow-sm py-2'>
      <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-red-600'>
          <Link href='/'>StudyHub</Link>
        </h1>
        <HeaderRight />
      </div>
    </header>
  );
};
