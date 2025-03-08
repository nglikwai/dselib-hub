import Link from 'next/link';

import { Coffee, LibraryBig } from 'lucide-react';
import { cn } from 'src/lib/utils';

export const items = [
  {
    icon: LibraryBig,
    text: 'Pastpaper 圖書庫',
    link: '/pp',
    width: 'group-hover:w-[118px]',
  },
  {
    icon: Coffee,
    text: '温書好地方',
    link: '/hub',
    width: 'group-hover:w-[72px]',
  },
];

export default () => {
  const commonStyle =
    'sm:text-4xl flex text-2xl font-bold items-center flex-col justify-center gap-10 cursor-pointer transition hover:bg-border';
  return (
    <div className='container mx-auto border-x border-dashed grid sm:grid-cols-2 max-ava-h'>
      <Link href='pp' className={cn(commonStyle, 'border-b sm:border-none')}>
        <LibraryBig size={80} />
        <span>Pastpaper 圖書庫</span>
      </Link>
      <Link href='hub' className={cn(commonStyle)}>
        <Coffee size={80} />
        <span>温書好地方</span>
      </Link>
    </div>
  );
};
