import dayjs from 'dayjs';
import { Star } from 'lucide-react';

import { Card, CardContent } from '@/components/components/ui/card';
import { PlaceReview } from '@/types/Place.type';

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }).map((_, i) => (
    <Star
      key={i}
      className={`w-4 h-4 ${i < rating ? 'fill-primary text-primary' : 'fill-muted text-muted-foreground'}`}
    />
  ));
};

export const PlaceReviewCard = ({ review }: { review: PlaceReview }) => {
  return (
    <Card key={review.id}>
      <CardContent className='pt-6'>
        <div className='flex items-start justify-between mb-2'>
          <div>
            <h3 className='font-medium'>{review.author.email}</h3>
            <p className='text-sm text-muted-foreground'>
              {dayjs(review.createdAt).format('YYYY-MM-DD HH:mm:ss')}
            </p>
          </div>
          <div className='flex gap-0.5'>{renderStars(review.rating)}</div>
        </div>
        <p className='text-sm leading-relaxed mt-3'>{review.content}</p>
      </CardContent>
    </Card>
  );
};
