'use client';

import { useRouter } from 'next/navigation';

import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Check, Search, X } from 'lucide-react';

import { Button } from '@/components/components/ui/button';
import { Input } from '@/components/components/ui/input';
import { QUERY_KEYS } from '@/constants/index';
import ApiService from '@/services/api';
import { PlaceArea } from '@/types/Place.type';

interface Area {
  id: number;
  nameZhHk: string;
  nameEnUs: string;
  code?: string | null;
}

interface District {
  id: number;
  nameZhHk: string;
  nameEnUs: string;
  subareas: Area[];
}

interface SelectedAreas {
  [areaId: number]: {
    all: boolean;
    subareas: number[];
  };
}

const transformToDistrictFormat = (areas: PlaceArea[]): District[] => {
  const districtsMap = new Map<string, District>();

  areas.forEach(area => {
    const districtKey = `${area.district.id}`;

    if (!districtsMap.has(districtKey)) {
      districtsMap.set(districtKey, {
        id: area.district.id,
        nameZhHk: area.district.nameZhHk,
        nameEnUs: area.district.nameEnUs,
        subareas: [],
      });
    }

    districtsMap.get(districtKey)!.subareas.push({
      id: area.id,
      nameZhHk: area.nameZhHk,
      nameEnUs: area.nameEnUs,
      code: area.code,
    });
  });

  return Array.from(districtsMap.values());
};

export const HeroBanner = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState<SelectedAreas>({});
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'categories' | 'areas'>(
    'categories'
  );
  const dropdownRef = useRef<HTMLFormElement>(null);

  const { data: categories } = useQuery({
    queryKey: [QUERY_KEYS.PLACE_CATEGORIES],
    queryFn: () => ApiService.getCategories(),
    retry: 2,
    retryDelay: attempt => Math.min(1000 * 2 ** attempt, 30000),
  });

  const { data: allAreas } = useQuery({
    queryKey: [QUERY_KEYS.ALL_AREAS],
    queryFn: () => ApiService.getAllAreas(),
    retry: 2,
    retryDelay: attempt => Math.min(1000 * 2 ** attempt, 30000),
  });

  const transformedAreas = transformToDistrictFormat(allAreas || []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Get all selected subarea IDs from selectedAreas
    const areaIds = Object.entries(selectedAreas).reduce<number[]>(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (acc, [_, value]) => {
        return [...acc, ...value.subareas];
      },
      []
    );

    // Build search params
    const params = new URLSearchParams();
    if (searchQuery) {
      params.set('query', searchQuery);
    }
    if (areaIds.length) {
      params.set('areaIds', areaIds.join(','));
    }
    if (selectedCategories.length) {
      params.set('categoryIds', selectedCategories.join(','));
    }

    // Navigate to search page with params
    router.push(`/search?${params.toString()}`);
  };

  const handleAreaSelect = (
    e: React.MouseEvent,
    areaId: number,
    subId?: number
  ) => {
    e.preventDefault(); // Prevent form submission
    e.stopPropagation(); // Prevent event bubbling

    setSelectedAreas(prev => {
      const currentArea = prev[areaId] || {
        all: false,
        subareas: [],
      };

      if (subId) {
        const subareas = currentArea.subareas.includes(subId)
          ? currentArea.subareas.filter(id => id !== subId)
          : [...currentArea.subareas, subId];

        const area = transformedAreas.find(a => a.id === areaId);
        const all = area ? subareas.length === area.subareas.length : false;

        return {
          ...prev,
          [areaId]: { all, subareas },
        };
      } else {
        const area = transformedAreas.find(c => c.id === areaId);
        const all = !currentArea.all;
        const subareas = all && area ? area.subareas.map(sub => sub.id) : [];

        return {
          ...prev,
          [areaId]: { all, subareas },
        };
      }
    });
  };

  const handleCategorySelect = (e: React.MouseEvent, categoryId: number) => {
    e.preventDefault(); // Prevent form submission
    e.stopPropagation(); // Prevent event bubbling

    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const isAreaSelected = (areaId: number, subId?: number) => {
    const area = selectedAreas[areaId];
    if (!area) return false;
    if (subId) {
      return area.subareas.includes(subId);
    }
    return area.all;
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
        <form
          onSubmit={handleSearch}
          className='max-w-xl mx-auto relative'
          ref={dropdownRef}
        >
          <div className='relative mb-4'>
            <Input
              type='text'
              placeholder='地點名稱'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onClick={() => setIsDropdownOpen(true)}
              className='h-12 pl-4 pr-20 bg-white text-lg rounded-lg w-full'
            />
            {searchQuery && (
              <button
                type='button'
                onClick={e => {
                  e.preventDefault();
                  setSearchQuery('');
                }}
                className='absolute right-16 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
              >
                <X className='h-5 w-5' />
              </button>
            )}
            <Button
              type='submit'
              variant={'ghost'}
              className='absolute right-0 top-0 h-12 px-4 '
            >
              <Search className='h-5 w-5' />
            </Button>
          </div>

          {isDropdownOpen && (
            <div className='absolute left-0 right-0 top-full mt-2 bg-white rounded-lg shadow-lg border overflow-hidden'>
              <div className='md:hidden flex border-b'>
                <button
                  type='button'
                  onClick={e => {
                    e.preventDefault();
                    setActiveTab('categories');
                  }}
                  className={`flex-1 py-2 px-4 text-sm font-medium ${
                    activeTab === 'categories'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500'
                  }`}
                >
                  地點類型
                </button>
                <button
                  type='button'
                  onClick={e => {
                    e.preventDefault();
                    setActiveTab('areas');
                  }}
                  className={`flex-1 py-2 px-4 text-sm font-medium ${
                    activeTab === 'areas'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500'
                  }`}
                >
                  地區
                </button>
              </div>
              <div className='md:flex'>
                {/* 地點類型 Column */}
                <div
                  className={`w-full md:w-1/2 max-h-[300px] md:max-h-[400px] overflow-y-auto ${
                    activeTab === 'categories' ? '' : 'hidden md:block'
                  }`}
                >
                  <div className='p-4'>
                    <div className='space-y-2'>
                      {categories?.map(category => (
                        <button
                          key={category.id}
                          type='button'
                          onClick={e => handleCategorySelect(e, category.id)}
                          className='w-full px-3 py-2 text-left hover:bg-gray-50 rounded-md flex items-center justify-between'
                        >
                          <div className='flex items-center gap-3'>
                            <div className='w-5 h-5 rounded border border-gray-300 flex items-center justify-center'>
                              {selectedCategories.includes(category.id) && (
                                <Check className='h-4 w-4 text-blue-600' />
                              )}
                            </div>
                            <span className='text-gray-900'>
                              {category.nameZhHk}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 地區 Column */}
                <div
                  className={`w-full md:w-1/2 max-h-[300px] md:max-h-[400px] overflow-y-auto ${
                    activeTab === 'areas' ? '' : 'hidden md:block'
                  }`}
                >
                  {transformedAreas.map(area => (
                    <div key={area.id} className='border-b last:border-b-0'>
                      <button
                        type='button'
                        onClick={e => handleAreaSelect(e, area.id)}
                        className='w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between group'
                      >
                        <div className='flex items-center gap-3'>
                          <div className='w-5 h-5 rounded border border-gray-300 flex items-center justify-center'>
                            {isAreaSelected(area.id) && (
                              <Check className='h-4 w-4 text-blue-600' />
                            )}
                          </div>
                          <span className='text-gray-900'>{area.nameZhHk}</span>
                        </div>
                      </button>

                      <div className='pl-12'>
                        {area.subareas.map(sub => (
                          <button
                            type='button'
                            key={sub.id}
                            onClick={e => handleAreaSelect(e, area.id, sub.id)}
                            className='w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between group'
                          >
                            <div className='flex items-center gap-3'>
                              <div className='w-5 h-5 rounded border border-gray-300 flex items-center justify-center'>
                                {isAreaSelected(area.id, sub.id) && (
                                  <Check className='h-4 w-4 text-blue-600' />
                                )}
                              </div>
                              <span className='text-gray-900'>
                                {sub.nameZhHk}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
