'use client';

import Link from 'next/link';

import { useEffect } from 'react';

import { User, User2 } from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/components/ui/avatar';
import { Button } from '@/components/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/components/ui/dropdown-menu';
import ApiService from '@/services/api';
import { useAuthStore } from '@/stores/auth.store';
import { useUserStore } from '@/stores/user.store';

export const HeaderRight = () => {
  const accessToken = useAuthStore(state => state.accessToken);

  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await ApiService.getMyProfile();
      if (user) {
        setUser(user);
      }
    };
    if (accessToken) {
      fetchUser();
    }
  }, [accessToken]);

  return (
    <div>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
              <Avatar className='h-12 w-12'>
                <AvatarImage src={user.avatarUrl} alt='User avatar' />
                <AvatarFallback>
                  <User className='h-12 w-12' />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56 mt-2' align='end' forceMount>
            <Link href={`/profile`}>
              <DropdownMenuItem className='cursor-pointer'>
                個人檔案
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link href={`/auth/signout`}>
              <DropdownMenuItem className='cursor-pointer'>
                登出
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild variant={'ghost'}>
          <Link href={`/auth/signin`}>
            <User2 size={20} />
          </Link>
        </Button>
      )}
    </div>
  );
};
