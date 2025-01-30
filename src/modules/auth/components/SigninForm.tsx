'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/components/ui/form';
import { Input } from '@/components/components/ui/input';
import { cn } from '@/components/lib/utils';
import { loginSchema, type SigninFormData } from '@/schemas/auth';
import ApiService from '@/services/api';
import { useAuthStore } from '@/stores/auth.store';
import { zodResolver } from '@hookform/resolvers/zod';

export function SigninForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const router = useRouter();
  const { setTokens, setError, setLoading, error, isLoading } = useAuthStore();

  const form = useForm<SigninFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SigninFormData) => {
    setLoading(true);
    setError(null);

    try {
      const tokens = await ApiService.signin(data);
      setTokens(tokens);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signin failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>登入</CardTitle>
          <CardDescription>使用您的電郵地址和密碼登入</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              {error && (
                <div className='p-3 mb-4 text-sm text-red-500 bg-red-50 rounded'>
                  {error}
                </div>
              )}

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>電郵地址</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='email'
                        placeholder='me@example.com'
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center justify-between'>
                      <FormLabel>密碼</FormLabel>
                      <Link
                        href='/auth/forgot-password'
                        className='text-sm text-muted-foreground hover:underline'
                      >
                        忘記密碼?
                      </Link>
                    </div>
                    <FormControl>
                      <Input {...field} type='password' disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full' disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    登入中...
                  </>
                ) : (
                  '登入'
                )}
              </Button>

              {/* <Button variant='outline' className='w-full'>
                使用 Google 登入
              </Button> */}

              <div className='text-center text-sm text-muted-foreground'>
                未有帳戶?{' '}
                <Link
                  href='/auth/signup'
                  className='text-primary hover:underline'
                >
                  立即註冊
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
