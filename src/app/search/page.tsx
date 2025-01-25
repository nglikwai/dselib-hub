import { Suspense } from 'react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import Search from './search';

import { QUERY_KEYS } from '@/constants/index';
import { ITEMS_PER_PAGE } from '@/modules/place/constants';
import ApiService from '@/services/api';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { query, areaIds, categoryIds, page } = await searchParams;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.SEARCH_PLACES, query, areaIds, categoryIds],
    queryFn: () =>
      ApiService.searchPlaces({
        nameZhHk: query as string,
        ...(areaIds && {
          areaIds: [
            ...(Array.isArray(areaIds)
              ? areaIds.map(areaId => parseInt(areaId))
              : [parseInt(areaIds as string)]),
          ],
        }),
        ...(categoryIds && {
          categoryIds: [
            ...(Array.isArray(categoryIds)
              ? categoryIds.map(categoryId => parseInt(categoryId))
              : [parseInt(categoryIds as string)]),
          ],
        }),
        ...(page ? { page: parseInt(page as string) } : { page: 1 }),
        limit: ITEMS_PER_PAGE,
      }),
  });

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.PLACE_CATEGORIES],
    queryFn: () => ApiService.getCategories(),
  });

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.ALL_AREAS],
    queryFn: () => ApiService.getAllAreas(),
  });

  return (
    <Suspense>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Search
          initialQuery={query as string}
          {...(areaIds && { initialAreaIds: [parseInt(areaIds as string)] })}
          {...(categoryIds && {
            initialCategoryIds: [parseInt(categoryIds as string)],
          })}
        />
      </HydrationBoundary>
    </Suspense>
  );
}
