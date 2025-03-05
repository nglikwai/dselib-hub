'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useForm } from 'react-hook-form';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/components/ui/sheet';
import { Pagination } from '@/components/Pagination';
import { PlaceDetailCard } from '@/components/Place/PlaceDetailCard';
import PlaceDetailCardSkeleton from '@/components/Place/PlaceDetailCardSkeleton';
import { MobileSearchSummary } from '@/components/search/MobileSearchSummary';
import { Sidebar } from '@/components/search/Sidebar';
import { QUERY_KEYS } from '@/constants/index';
import { ITEMS_PER_PAGE } from '@/modules/place/constants';
import ApiService from '@/services/api';

export default function SearchPage({
  initialQuery = '',
  initialAreaIds = [],
  initialCategoryIds = [],
}: {
  initialQuery?: string;
  initialAreaIds?: number[];
  initialCategoryIds?: number[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { watch, setValue } = useForm({
    defaultValues: {
      query: searchParams.get('query') || initialQuery,
      areaIds:
        searchParams.get('areaIds')?.split(',').map(Number).filter(Boolean) ||
        initialAreaIds,
      categoryIds:
        searchParams
          .get('categoryIds')
          ?.split(',')
          .map(Number)
          .filter(Boolean) || initialCategoryIds,
      page: Number(searchParams.get('page')) || 1,
    },
  });

  const query = watch('query');
  const areaIds = watch('areaIds');
  const categoryIds = watch('categoryIds');
  const page = watch('page');

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const searchParameters = useMemo(
    () => ({
      nameZhHk: query,
      areaIds: areaIds ?? [],
      categoryIds: categoryIds ?? [],
      page,
      limit: ITEMS_PER_PAGE,
    }),
    [query, areaIds, categoryIds, page]
  );

  const { data: res, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.SEARCH_PLACES, searchParameters],
    queryFn: () => ApiService.searchPlaces(searchParameters),
    enabled: true,
  });

  const { data: categories } = useQuery({
    queryKey: [QUERY_KEYS.PLACE_CATEGORIES],
    queryFn: () => ApiService.getCategories(),
    enabled: true,
  });

  const { data: areas } = useQuery({
    queryKey: [QUERY_KEYS.ALL_AREAS],
    queryFn: () => ApiService.getAllAreas(),
    enabled: true,
  });

  const handleUpdateUrl = useCallback(() => {
    const params = new URLSearchParams();
    if (query) {
      params.set('query', query);
    }
    if (areaIds?.length) {
      params.set('areaIds', areaIds.join(','));
    }
    if (categoryIds?.length) {
      params.set('categoryIds', categoryIds.join(','));
    }
    if (page > 1) {
      params.set('page', page.toString());
    }

    router.push(`/search?${params.toString()}`, { scroll: true });
  }, [query, areaIds, categoryIds, page, router]);

  useEffect(() => {
    handleUpdateUrl();
  }, [handleUpdateUrl]);

  const handleSearch = useCallback(
    (term: string) => {
      setValue('query', term);
      setValue('page', 1);
    },
    [setValue]
  );

  const handleFilterChange = useCallback(
    (newFilters: { areaIds: number[]; categoryIds: number[] }) => {
      setValue('areaIds', newFilters.areaIds);
      setValue('categoryIds', newFilters.categoryIds);
      setValue('page', 1);
    },
    [setValue]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      setValue('page', newPage);
    },
    [setValue]
  );

  return (
    <div className='min-h-screen container mx-auto border-l border-r border-dashed'>
      <div className='flex flex-col md:flex-row gap-6 '>
        {/* Search */}
        <div className='hidden md:block py-4 md:py-10 w-60 shrink-0 border-r border-dashed px-6'>
          <Sidebar
            initialSearchTerm={query}
            initialFilters={{ areaIds, categoryIds }}
            areas={areas ?? []}
            categories={categories ?? []}
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className='md:hidden'>
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTitle className='hidden'>
              <SheetDescription>搜尋</SheetDescription>
            </SheetTitle>
            <SheetContent side='left' className='w-[300px] sm:w-[400px]'>
              <Sidebar
                initialSearchTerm={query}
                initialFilters={{ areaIds, categoryIds }}
                areas={areas ?? []}
                categories={categories ?? []}
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
              />
            </SheetContent>
          </Sheet>
        </div>
        <main className='flex-1'>
          <MobileSearchSummary
            activeFilters={{ areaIds, categoryIds }}
            onSearch={handleSearch}
            onOpenFilters={() => setIsFilterOpen(true)}
          />
          <div className='p-4 md:py-10 md:px-8'>
            <h1 className='text-2xl font-medium mb-6'>搜尋結果</h1>

            <>
              {isLoading ? (
                <>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6'>
                    {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                      <PlaceDetailCardSkeleton key={i} />
                    ))}
                  </div>
                </>
              ) : res?.data?.length ? (
                <>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-x-6 md:gap-y-12'>
                    {res.data.map(place => (
                      <Link key={place.id} href={`/place/${place.id}`}>
                        <PlaceDetailCard place={place} />
                      </Link>
                    ))}
                  </div>
                  <div className='flex justify-center items-center space-x-4'>
                    <Pagination
                      currentPage={res.page}
                      totalPages={Math.ceil(res.total / res.limit)}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </>
              ) : (
                <div className='text-center text-gray-500'>暫無搜尋結果</div>
              )}
            </>
          </div>
        </main>
      </div>
    </div>
  );
}
