import Image from 'next/image';
import Link from 'next/link';

import { PlaceOverview } from '@/types/Place.type';

export function PlaceOverviewCard({ place }: { place: PlaceOverview }) {
  return (
    <div className='overflow-hidden border-b-0 border-neutral-200'>
      <Link href={`/place/${place.id}`}>
        <div className='flex items-start'>
          <div className='pr-4 w-1/3 shrink-0'>
            <Image
              src={
                place.thumbnailObj && place.thumbnailObj.url.length > 0
                  ? place.thumbnailObj.url
                  : 'https://lh3.googleusercontent.com/d/15waUD5ic0WeenHxbZyHAC_I5u2IFVCe0'
              }
              alt={place.nameZhHk ?? place.nameEnUs ?? ''}
              width={120}
              height={120}
              className='object-cover bg-neutral-100 rounded-lg aspect-square'
            />
          </div>
          <div>{place.nameZhHk}</div>
        </div>
      </Link>
    </div>
  );
}
