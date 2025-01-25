import { PlaceCategory } from '@/types/Place.type';

export function PlaceCategoryItem({ category }: { category: PlaceCategory }) {
  return (
    <div
      className='relative h-40 rounded-lg overflow-hidden group'
      style={{
        backgroundImage: `url(${category.thumbnailUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='absolute inset-0 bg-black opacity-30 group-hover:opacity-50 transition-opacity duration-300' />
      <div className='absolute inset-0 flex items-center justify-center'>
        <span className='text-white text-xl font-semibold'>
          {category.nameZhHk}
        </span>
      </div>
    </div>
  );
}
