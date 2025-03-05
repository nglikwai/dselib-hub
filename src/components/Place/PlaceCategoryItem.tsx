import { Coffee } from 'lucide-react';

import { PlaceCategory } from '@/types/Place.type';

export function PlaceCategoryItem({ category }: { category: PlaceCategory }) {
  return (
    <div
      className='relative h-40 rounded-lg overflow-hidden group border shadow-sm'
      style={{
        // backgroundImage: `url(${category.thumbnailUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-300' />
      <div className='absolute inset-0 flex items-center justify-center gap-4'>
        <Coffee />
        <span className=' text-lg font-medium'>{category.nameZhHk}</span>
      </div>
    </div>
  );
}
