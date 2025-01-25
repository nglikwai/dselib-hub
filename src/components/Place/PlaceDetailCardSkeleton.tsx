import { Card, CardContent, CardHeader } from '@/components/components/ui/card';
import { Skeleton } from '@/components/components/ui/skeleton';

export default function PlaceDetailCardSkeleton() {
  return (
    <Card className=' overflow-hidden bg-white shadow-md'>
      <div className='relative h-[140px] w-full'>
        <Skeleton className='h-full w-full' />
      </div>
      <CardHeader className='p-4 space-y-1'>
        <Skeleton className='h-5 w-4/5' />
        <Skeleton className='h-4 w-1/4' />
      </CardHeader>
      <CardContent className='p-4 pt-0 flex justify-between items-center'>
        <Skeleton className='h-4 w-12' />
        <Skeleton className='h-6 w-20' />
      </CardContent>
    </Card>
  );
}
