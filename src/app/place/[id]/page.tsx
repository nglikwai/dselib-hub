import { Suspense } from 'react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import PlaceDetails from './place-details';

import { QUERY_KEYS } from '@/constants/index';
import ApiService from '@/services/api';

export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const parsedId = parseInt(id, 10);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.PLACE_DETAIL, parsedId],
    queryFn: () => ApiService.getPlaceDetail(parsedId),
  });

  return (
    <Suspense>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PlaceDetails placeId={parsedId} />
      </HydrationBoundary>
    </Suspense>
  );
}
