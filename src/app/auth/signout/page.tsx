'use client';

import { useEffect } from 'react';

import ApiService from '@/services/api';
import { useAuthStore } from '@/stores/auth.store';

export default function SignoutPage() {
  const { signout } = useAuthStore();
  useEffect(() => {
    const signoutBothSide = async () => {
      try {
        await ApiService.signout();

        signout();

        window.location.href = '/auth/signin';
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    signoutBothSide();
  }, []);

  return null;
}
