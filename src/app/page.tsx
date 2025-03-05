import Link from 'next/link';

import { Coffee, LibraryBig } from 'lucide-react';

export const items = [
  {
    icon: LibraryBig,
    text: 'Pastpaper 圖書庫',
    link: '/pp',
  },
  {
    icon: Coffee,
    text: '温書好地方',
    link: '/hub',
  },
];

export default () => {
  return (
    <div className='container mx-auto px-4 border-x border-dashed flex justify-center items-center max-ava-h sm:gap-20 gap-10 flex-col sm:flex-row'>
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <Link
            href={item.link}
            key={index}
            className='border py-16 rounded-2xl flex items-center justify-center gap-4 w-80 cursor-pointer hover:bg-foreground hover:text-primary-foreground transition'
          >
            <Icon />
            <span>{item.text}</span>
          </Link>
        );
      })}
    </div>
  );
};
