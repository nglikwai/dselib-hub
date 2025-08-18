'use client';

import { Moon } from 'lucide-react';

import { Button } from '@/components/components/ui/button';

export default () => {
  return (
    <Button
      variant={'ghost'}
      onClick={() => document.querySelector('body')?.classList.toggle('dark')}
    >
      <Moon />
    </Button>
  );
};
