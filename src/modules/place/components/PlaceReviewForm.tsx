'use client';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { LogIn, Star } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/components/ui/button';
import { Card, CardContent } from '@/components/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/components/ui/form';
import { Textarea } from '@/components/components/ui/textarea';
import { useUserStore } from '@/stores/user.store';
import { zodResolver } from '@hookform/resolvers/zod';

const reviewSchema = z.object({
  content: z
    .string()
    .min(10, { message: '評論內容至少需要10個字符' })
    .max(500, { message: '評論內容不能超過500個字符' }),
  rating: z.number().min(1).max(5),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  onSubmit: (data: ReviewFormValues) => void;
}

export function PlaceReviewForm({ onSubmit }: ReviewFormProps) {
  const router = useRouter();
  const user = useUserStore(state => state.user);

  const [loading, setLoading] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      content: '',
      rating: 0,
    },
  });

  const handleSubmit = (data: ReviewFormValues) => {
    setLoading(true);
    onSubmit(data);
    setLoading(false);
    form.reset();
  };

  const handleLogin = () => {
    router.push('/auth/signin');
  };

  return (
    <Form {...form}>
      <Card>
        <CardContent className='p-8'>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-6'
          >
            <FormField
              control={form.control}
              name='rating'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>評分</FormLabel>
                  <FormControl>
                    <div className='flex gap-1'>
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          className={`w-6 h-6 cursor-pointer ${
                            (hoveredRating || field.value) >= star
                              ? 'fill-primary text-primary'
                              : 'fill-muted text-muted-foreground'
                          }`}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          onClick={() => form.setValue('rating', star)}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>評論內容</FormLabel>
                  <FormControl>
                    <Textarea placeholder='請分享您的體驗' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' disabled={!user || loading}>
              提交評論
            </Button>
          </form>

          {!user && (
            <div className='absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center'>
              <div className='text-center'>
                <LogIn className='mx-auto h-12 w-12 text-muted-foreground mb-4' />
                <h4 className='text-lg font-semibold mb-2'>請先登入</h4>
                <p className='text-sm text-muted-foreground mb-4'>
                  您需要登入才能發表評論
                </p>
                <Button onClick={handleLogin}>登入</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Form>
  );
}
