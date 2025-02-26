'use server';

import Link from 'next/link';

import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/components/ui/button';
import { HeroBanner } from '@/components/HeroBanner/HeroBanner';
import { PlaceCategoryItem } from '@/components/Place/PlaceCategoryItem';
import { PlaceDetailCard } from '@/components/Place/PlaceDetailCard';
import ApiService from '@/services/api';

export default async function Home() {
  const [recommendedPlaces, categories, popularAreas] = await Promise.all([
    ApiService.getRecommendedPlaces(),
    ApiService.getCategories(),
    ApiService.getPopularAreas(),
  ]);

  return (
    <main>
      <HeroBanner />
      <div className='container mx-auto px-4 py-12'>
        <section className='mb-16'>
          <h2 className='text-2xl font-semibold mb-4'>精選地點</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {recommendedPlaces?.map(place => (
              <Link key={place.id} href={`/place/${place.id}`}>
                <PlaceDetailCard key={place.id} place={place} />
              </Link>
            ))}
          </div>
        </section>

        <section className='mb-16'>
          <h2 className='text-2xl font-semibold mb-4'>地點類型</h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {categories?.map(category => (
              <Link
                key={category.id}
                href={`/search?categoryIds=${category.id}`}
              >
                <PlaceCategoryItem category={category} />
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mb-4'>熱門地區</h2>
          <ul className='grid grid-cols-2 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-6 gap-2'>
            {popularAreas?.map(area => (
              <li key={area.id}>
                <Link href={`/search?areaIds=${area.id}`}>
                  <Button variant='link' className='text-left'>
                    <span>{area.nameZhHk}</span>
                    <ChevronRight className='ml-2 h-4 w-4' />
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
