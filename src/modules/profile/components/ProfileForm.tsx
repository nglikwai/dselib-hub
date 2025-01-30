'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/components/ui/form';
import { Input } from '@/components/components/ui/input';
import { toast } from '@/components/hooks/use-toast';
import { User } from '@/types/user.type';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  email: z.string().email(),
  displayName: z.string().min(2, {
    message: 'Display name must be at least 2 characters.',
  }),
});

export default function ProfileForm({ profile }: { profile: User }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: profile.email,
      displayName: profile.displayName,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here you would typically send this data to your server
    console.log(values);
    toast({
      title: 'Profile updated',
      description: 'Your profile has been successfully updated.',
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='mb-8'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>電郵地址</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormDescription>電郵地址無法更改</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='mb-8'>
          <FormField
            control={form.control}
            name='displayName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>顯示名稱</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type='submit'>更新</Button>
      </form>
    </Form>
  );
}
