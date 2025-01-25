import { useQuery } from '@tanstack/react-query';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

import { PlaceOverviewCard } from './PlaceOverviewCard';

import { QUERY_KEYS } from '@/constants/index';
import ApiService from '@/services/api';
import { Place } from '@/types/Place.type';

interface Props {
  originalPlace?: Place;
}

const RelatedPlaces = (props: Props) => {
  const { originalPlace } = props;
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.RELATED_PLACES, originalPlace?.id],
    queryFn: () =>
      ApiService.searchPlaces({
        page: 1,
        limit: 6,
        ...(originalPlace?.area?.id
          ? { areaIds: [originalPlace.area.id] }
          : {}),
      }),
    retry: 2,
    retryDelay: attempt => Math.min(1000 * 2 ** attempt, 30000),
  });
  if (!data) {
    return null;
  }
  const { data: relatedPlaces } = data;
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>相關地點</CardTitle>
        </CardHeader>
        <CardContent>
          {relatedPlaces?.length === 0 && (
            <div className='text-center text-neutral-500'>沒有相關地點</div>
          )}
          {relatedPlaces?.map(place => (
            <div key={place.id} className='mb-4'>
              <PlaceOverviewCard place={place} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default RelatedPlaces;
