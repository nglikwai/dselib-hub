import { X } from 'lucide-react';

import { Button } from '@/components/components/ui/button';
import { PlaceArea, PlaceCategory } from '@/types/Place.type';

interface ActiveFiltersProps {
  filters: {
    areaIds: number[];
    categoryIds: number[];
  };
  areas: PlaceArea[];
  categories: PlaceCategory[];
  onRemoveFilter: (type: 'areaIds' | 'categoryIds', value: number) => void;
  onClearAll: () => void;
}

export function ActiveFilters({
  filters,
  areas,
  categories,
  onRemoveFilter,
  onClearAll,
}: ActiveFiltersProps) {
  const hasFilters =
    filters.areaIds.length > 0 || filters.categoryIds.length > 0;

  if (!hasFilters) return null;

  return (
    <div className='mb-8'>
      <div className='flex items-center justify-between mb-2'>
        <h3 className='text-sm font-medium'>已篩選:</h3>
        <Button
          variant='link'
          size='sm'
          onClick={onClearAll}
          className='text-sm'
        >
          X 清除所有
        </Button>
      </div>
      <div className='flex flex-wrap gap-2'>
        {filters.areaIds.map(areaId => (
          <Button
            key={areaId}
            variant='secondary'
            size='sm'
            onClick={() => onRemoveFilter('areaIds', areaId)}
            className='text-sm'
          >
            {areas.find(area => area.id === areaId)?.nameZhHk}{' '}
            <X className='ml-1 h-3 w-3' />
          </Button>
        ))}
        {filters.categoryIds.map(categoryId => (
          <Button
            key={categoryId}
            variant='secondary'
            size='sm'
            onClick={() => onRemoveFilter('categoryIds', categoryId)}
            className='text-sm'
          >
            {categories.find(category => category.id === categoryId)?.nameZhHk}{' '}
            <X className='ml-1 h-3 w-3' />
          </Button>
        ))}
      </div>
    </div>
  );
}
