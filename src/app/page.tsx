'use client';

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';

import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/components/ui/button';
import { HeroBanner } from '@/components/HeroBanner/HeroBanner';
import { PlaceCategoryItem } from '@/components/Place/PlaceCategoryItem';
import { PlaceDetailCard } from '@/components/Place/PlaceDetailCard';
import PlaceDetailCardSkeleton from '@/components/Place/PlaceDetailCardSkeleton';
import { QUERY_KEYS } from '@/constants/index';
import ApiService from '@/services/api';

export default function Home() {
  const { data: recommendedPlaces, status: recommendedPlacesStatus } = useQuery(
    {
      queryKey: [QUERY_KEYS.RECOMMENDED_PLACES],
      queryFn: () => ApiService.getRecommendedPlaces(),
      retry: 2,
      retryDelay: attempt => Math.min(1000 * 2 ** attempt, 30000),
    }
  );

  const { data: categories, status: categoriesStatus } = useQuery({
    queryKey: [QUERY_KEYS.PLACE_CATEGORIES],
    queryFn: () => ApiService.getCategories(),
    retry: 2,
    retryDelay: attempt => Math.min(1000 * 2 ** attempt, 30000),
  });

  const { data: popularAreas } = useQuery({
    queryKey: [QUERY_KEYS.POPULAR_AREAS],
    queryFn: () => ApiService.getPopularAreas(),
    retry: 2,
    retryDelay: attempt => Math.min(1000 * 2 ** attempt, 30000),
  });

  return (
    <main>
      <HeroBanner />
      <div className='container mx-auto px-4 py-12'>
        <section className='mb-16'>
          <h2 className='text-2xl font-semibold mb-4'>精選地點</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {recommendedPlacesStatus === 'pending'
              ? Array.from({ length: 6 }).map((_, index) => (
                  <PlaceDetailCardSkeleton key={index} />
                ))
              : recommendedPlaces?.map(place => (
                  <Link key={place.id} href={`/place/${place.id}`}>
                    <PlaceDetailCard key={place.id} place={place} />
                  </Link>
                ))}
          </div>
        </section>

        <section className='mb-16'>
          <h2 className='text-2xl font-semibold mb-4'>地點類型</h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {categoriesStatus === 'pending'
              ? Array.from({ length: 6 }).map((_, index) => (
                  <PlaceDetailCardSkeleton key={index} />
                ))
              : categories?.map(category => (
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
