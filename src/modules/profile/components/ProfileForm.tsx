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
import ApiService from '@/services/api';
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
      displayName: profile.displayName || '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, ...updates } = values;
    await ApiService.updateMyProfile(updates);
    toast({
      title: '成功更新個人檔案',
      description: '你的個人檔案已成功更新。',
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
