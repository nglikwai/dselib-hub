import Image from 'next/image';

import { MapPin, Star } from 'lucide-react';

import { Badge } from '../components/ui/badge';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/components/ui/card';
import { Place } from '@/types/Place.type';

export function PlaceDetailCard({ place }: { place: Place }) {
  return (
    <Card className='overflow-hidden hover:shadow-lg'>
      <Image
        src={
          place.thumbnailObj && place.thumbnailObj.url.length > 0
            ? place.thumbnailObj.url
            : 'https://lh3.googleusercontent.com/d/15waUD5ic0WeenHxbZyHAC_I5u2IFVCe0'
        }
        alt={place.nameZhHk ?? place.nameEnUs ?? ''}
        width={300}
        height={200}
        className='w-full h-48 object-cover bg-neutral-100'
        priority
      />
      <CardHeader>
        <CardTitle className='line-clamp-1 text-lg font-[400]'>
          {place.nameZhHk}
        </CardTitle>
        <CardDescription className='flex items-end text-neutral-500 '>
          <MapPin size={18} className='mr-1' />
          {place.area.nameZhHk}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex justify-between items-center'>
          <div className='flex items-center pr-1 gap-2'>
            <Star size={18} className='text-yellow-400 fill-yellow-400' />
            <span>4.0</span>
          </div>
          <div>
            {place.categories.map(category => (
              <Badge key={category.id} variant={'secondary'}>
                {category.nameZhHk}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
