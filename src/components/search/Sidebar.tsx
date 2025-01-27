import { useEffect, useState } from 'react';

import { Search, SlidersHorizontal } from 'lucide-react';

import { ActiveFilters } from './ActiveFilters';

import { Checkbox } from '@/components/components/ui/checkbox';
import { Input } from '@/components/components/ui/input';
import { Label } from '@/components/components/ui/label';
import { PlaceArea, PlaceCategory } from '@/types/Place.type';

interface SidebarProps {
  onFilterChange: (filters: {
    areaIds: number[];
    categoryIds: number[];
  }) => void;
  onSearch: (term: string) => void;
  areas: PlaceArea[];
  categories: PlaceCategory[];
  initialFilters?: { areaIds: number[]; categoryIds: number[] };
  initialSearchTerm?: string;
}

export function Sidebar({
  onFilterChange,
  onSearch,
  areas,
  categories,
  initialFilters,
  initialSearchTerm,
}: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || '');

  const [filters, setFilters] = useState(
    initialFilters || { areaIds: [], categoryIds: [] }
  );

  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  useEffect(() => {
    if (initialSearchTerm) {
      setSearchTerm(initialSearchTerm);
    }
  }, [initialSearchTerm]);

  const handleFilterChange = (
    type: 'areaIds' | 'categoryIds',
    value: number
  ) => {
    const newFilters = { ...filters };
    const index = newFilters[type].indexOf(value);
    if (index > -1) {
      newFilters[type].splice(index, 1);
    } else {
      newFilters[type].push(value);
    }
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRemoveFilter = (
    type: 'areaIds' | 'categoryIds',
    value: number
  ) => {
    const newFilters = { ...filters };
    newFilters[type] = newFilters[type].filter(item => item !== value);
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearAll = () => {
    setFilters({ areaIds: [], categoryIds: [] });
    setSearchTerm('');
    onFilterChange({ areaIds: [], categoryIds: [] });
    onSearch('');
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className='h-full overflow-y-auto'>
      <div className='mb-6 hidden md:block'>
        <Label htmlFor='search' className='sr-only'>
          輸入文字搜尋
        </Label>
        <div className='relative'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-gray-500' />
          <Input
            id='search'
            placeholder='輸入文字搜尋'
            className='pl-8'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSearch()}
          />
        </div>
      </div>

      <ActiveFilters
        filters={filters}
        areas={areas}
        categories={categories}
        onRemoveFilter={handleRemoveFilter}
        onClearAll={handleClearAll}
      />

      <h2 className='text-lg font-semibold mb-4 flex items-center'>
        <SlidersHorizontal size={18} className='mr-1' />
        篩選條件
      </h2>

      <div className='mb-6'>
        <h3 className='text-md font-medium mb-2'>地點類型</h3>
        {categories.map(category => (
          <div key={category.id} className='flex items-center space-x-2 mb-2'>
            <Checkbox
              id={`category-${category.id}`}
              checked={filters.categoryIds.includes(category.id)}
              onCheckedChange={() =>
                handleFilterChange('categoryIds', category.id)
              }
            />
            <Label htmlFor={`category-${category.id}`}>
              <span className='cursor-pointer'>{category.nameZhHk}</span>
            </Label>
          </div>
        ))}
      </div>

      <div>
        <h3 className='text-md font-medium mb-2 flex items-center'>地區</h3>
        {areas.map(area => (
          <div key={area.id} className='flex items-center space-x-2 mb-2'>
            <Checkbox
              id={`area-${area.id}`}
              checked={filters.areaIds.includes(area.id)}
              onCheckedChange={() => handleFilterChange('areaIds', area.id)}
            />
            <Label htmlFor={`area-${area.id}`}>
              <span className='cursor-pointer'>{area.nameZhHk}</span>
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
