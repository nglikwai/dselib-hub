'use client';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { Search } from 'lucide-react';

import { Button } from '@/components/components/ui/button';
import { Input } from '@/components/components/ui/input';

export function HeroBanner() {
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim().length === 0) {
      return;
    }

    router.push(`/search?query=${searchQuery}`);
  };

  return (
    <div
      className='relative bg-cover bg-center py-36 px-4'
      style={{
        backgroundImage: 'url("/static/images/hero-banner.webp")',
      }}
    >
      {/* Overlay */}
      <div className='absolute inset-0 bg-black opacity-50' />

      <div className='container mx-auto text-center relative z-10'>
        <h2 className='text-5xl font-bold mb-8 text-white'>
          尋找最適合你的學習地點
        </h2>
        <form onSubmit={handleSearch} className='flex max-w-lg mx-auto'>
          <Input
            type='text'
            placeholder='地點名稱'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='flex-grow rounded-r-none text-lg px-4 h-12 bg-white border-0'
          />
          <Button
            type='submit'
            className='rounded-l-none bg-red-600 hover:bg-red-700 text-lg h-12'
          >
            <Search className='h-5 w-5 mr-2' />
            搜尋
          </Button>
        </form>
      </div>
    </div>
  );
}
