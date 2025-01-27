import { useState } from 'react';

import { Filter, Search } from 'lucide-react';

import { Badge } from '@/components/components/ui/badge';
import { Button } from '@/components/components/ui/button';
import { Input } from '@/components/components/ui/input';

interface MobileSearchSummaryProps {
  activeFilters: { areaIds: number[]; categoryIds: number[] };
  onSearch: (term: string) => void;
  onOpenFilters: () => void;
}

export const MobileSearchSummary = ({
  activeFilters,
  onSearch,
  onOpenFilters,
}: MobileSearchSummaryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const totalFilters =
    activeFilters.areaIds.length + activeFilters.categoryIds.length;

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className='sticky top-0 z-10 bg-white p-4 md:hidden'>
      <div className='flex items-center gap-2 mb-2'>
        <div className='relative flex-grow'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-gray-500' />
          <Input
            placeholder='輸入文字搜尋'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSearch()}
            className='pl-8 pr-4 py-2 w-full'
          />
        </div>
        <Button onClick={handleSearch} size='sm'>
          搜尋
        </Button>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' onClick={onOpenFilters}>
            <Filter className='h-4 w-4 mr-2' />
            篩選條件
          </Button>
          {totalFilters > 0 && (
            <Badge variant='secondary'>{totalFilters} 條件</Badge>
          )}
        </div>
        {totalFilters > 0 && (
          <div className='text-sm text-gray-500'>
            {activeFilters.categoryIds.length > 0 &&
              `${activeFilters.categoryIds.length} 地點類型`}
            {activeFilters.areaIds.length > 0 &&
              activeFilters.categoryIds.length > 0 &&
              '；'}
            {activeFilters.areaIds.length > 0 &&
              `${activeFilters.areaIds.length} 地區`}
          </div>
        )}
      </div>
    </div>
  );
};
