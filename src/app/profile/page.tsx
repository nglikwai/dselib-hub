'use client';

import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/index';
import ProfileForm from '@/modules/profile/components/ProfileForm';
import ApiService from '@/services/api';

export default function ProfilePage() {
  const { data: profile } = useQuery({
    queryKey: [QUERY_KEYS.MY_PROFILE],
    queryFn: () => ApiService.getMyProfile(),
    retry: 2,
    retryDelay: attempt => Math.min(1000 * 2 ** attempt, 30000),
  });

  if (!profile) return null;

  return (
    <div className='container mx-auto px-4 py-12'>
      <h1 className='text-2xl font-bold mb-5'>個人檔案</h1>
      <ProfileForm profile={profile} />
    </div>
  );
}
