'use client';

import Image from 'next/image';

import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import {
  Bus,
  BusFront,
  Clock,
  Globe,
  MapPin,
  Phone,
  Star,
  Train,
} from 'lucide-react';

import PlaceDetailsSkeleton from './loading';

import RelatedPlaces from '@/components/Place/RelatedPlaces';
import { QUERY_KEYS } from '@/constants/index';
import { PlaceReviewCard } from '@/modules/place/components/PlaceReviewCard';
import { PlaceReviewForm } from '@/modules/place/components/PlaceReviewForm';
import ApiService from '@/services/api';
import { PlaceReview } from '@/types/Place.type';

interface Props {
  placeId: number;
}

enum TabEnum {
  Overview = 'overview',
  Photos = 'photos',
  Reviews = 'reviews',
}

type WeekendType = {
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
  sun: string;
  holiday?: string;
};

const OPENING_HOURS: WeekendType = {
  mon: '星期一',
  tue: '星期二',
  wed: '星期三',
  thu: '星期四',
  fri: '星期五',
  sat: '星期六',
  sun: '星期日',
  holiday: '公眾假期',
};

const getScrollOffset = () => {
  const tabHeight = 60; // Approximate height of the tab
  const additionalOffset = 16; // Extra space for visual comfort
  return tabHeight + additionalOffset;
};

export default function PlaceDetails(props: Props) {
  const { placeId } = props;
  const { data: place, status } = useQuery({
    queryKey: [QUERY_KEYS.PLACE_DETAIL, placeId],
    queryFn: () => ApiService.getPlaceDetail(placeId),
    retry: 2,
    retryDelay: attempt => Math.min(1000 * 2 ** attempt, 30000),
  });
  const { data: reviews } = useQuery({
    queryKey: [QUERY_KEYS.PLACE_REVIEWS, placeId],
    queryFn: () => ApiService.getPlaceReviews(placeId),
    retry: 2,
    retryDelay: attempt => Math.min(1000 * 2 ** attempt, 30000),
  });

  const overviewRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState(TabEnum.Overview);

  useEffect(() => {
    const handleScroll = () => {
      const overviewTop = overviewRef.current?.offsetTop ?? 0;
      const photosTop = photosRef.current?.offsetTop ?? 0;
      const reviewsTop = reviewsRef.current?.offsetTop ?? 0;
      const scrollPosition = window.scrollY + getScrollOffset();

      if (scrollPosition >= reviewsTop) {
        setActiveTab(TabEnum.Reviews);
      } else if (scrollPosition >= photosTop) {
        setActiveTab(TabEnum.Photos);
      } else if (scrollPosition >= overviewTop) {
        setActiveTab(TabEnum.Overview);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [status]);

  const scrollToSection = (
    ref: React.RefObject<HTMLDivElement | null>,
    tab: TabEnum
  ) => {
    if (ref.current) {
      const offset = getScrollOffset();
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }

    setActiveTab(tab);
  };

  const handleNewReview = async (
    data: Pick<PlaceReview, 'rating' | 'content'>
  ) => {
    console.log('Storing review:');
    console.log(data);
    try {
      await ApiService.createPlaceReview(placeId, data);

      window.location.reload();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  if (status === 'pending') {
    return <PlaceDetailsSkeleton />;
  }

  if (!place) {
    return null;
  }

  const images = [
    place.thumbnailUrl ?? '/static/icons/placeholder.svg?height=300&width=400',
  ];

  return (
    <div className='container mx-auto px-4 py-8 pt-12'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='md:col-span-2'>
          <h1 className='text-3xl font-bold mb-2'>
            {place.nameZhHk}
            {place.operationStatus === 'PERM_CLOSED' ? '（已結束營業）' : ''}
          </h1>
          <div className='flex items-center mb-6'>
            <Star className='w-5 h-5 text-yellow-400 mr-1' />
            <span className='font-semibold mr-2'>4.0</span>
            {/* <span className='text-gray-600'>({0} 評論)</span> */}
            <span className='mx-2'>•</span>
            <span>{place.area.nameZhHk}</span>
            <span className='mx-2'>•</span>
            <span>
              {place.categories.map(category => category.nameZhHk).join('/')}
            </span>
          </div>

          <div className='sticky top-0 bg-white z-10'>
            <div className='flex border-b'>
              <button
                onClick={() => scrollToSection(overviewRef, TabEnum.Overview)}
                className={`py-4 px-6 text-lg transition-colors duration-200 ${
                  activeTab === 'overview'
                    ? 'font-bold text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                概覽
              </button>
              <button
                onClick={() => scrollToSection(photosRef, TabEnum.Photos)}
                className={`py-4 px-6 text-lg transition-colors duration-200 ${
                  activeTab === 'photos'
                    ? 'font-bold text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                相片
              </button>
              <button
                onClick={() => scrollToSection(reviewsRef, TabEnum.Reviews)}
                className={`py-4 px-6 text-lg transition-colors duration-200 ${
                  activeTab === 'reviews'
                    ? 'font-bold text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                評論
              </button>
            </div>
          </div>

          <div ref={overviewRef} className='pt-4 mb-6'>
            {place.descriptionZhHk && <p>{place.descriptionZhHk}</p>}

            <div className='space-y-4 pt-8 mb-6'>
              <div className='flex items-start'>
                <MapPin className='w-5 h-5 mr-2 mt-1 shrink-0' />
                <div>
                  <h3 className='font-semibold'>地址</h3>
                  <p>{place.addressZhHk ?? '未有資料'}</p>
                </div>
              </div>

              <div className='flex items-start'>
                <Phone className='w-5 h-5 mr-2 mt-1 shrink-0' />
                <div>
                  <h3 className='font-semibold'>電話</h3>
                  <p>{place.telephone ?? '未有資料'}</p>
                </div>
              </div>

              <div className='flex items-start'>
                <Train className='w-5 h-5 mr-2 mt-1 shrink-0' />
                <div>
                  <h3 className='font-semibold'>地鐵</h3>
                  <p>{place.transportMtr ?? '未有資料'}</p>
                </div>
              </div>

              <div className='flex items-start'>
                <Bus className='w-5 h-5 mr-2 mt-1 shrink-0' />
                <div>
                  <h3 className='font-semibold'>巴士</h3>
                  <p>{place.transportBus ?? '未有資料'}</p>
                </div>
              </div>

              <div className='flex items-start'>
                <BusFront className='w-5 h-5 mr-2 mt-1 shrink-0' />
                <div>
                  <h3 className='font-semibold'>小巴</h3>
                  <p>{place.transportMinibus ?? '未有資料'}</p>
                </div>
              </div>

              {place.openingHours && (
                <div className='flex items-start'>
                  <Clock className='w-5 h-5 mr-2 mt-1 shrink-0' />
                  <div>
                    <h3 className='font-semibold'>開放時間</h3>
                    <ul className='list-disc pl-6'>
                      <li>
                        <span>{OPENING_HOURS.mon}：</span>
                        <span>{place.openingHours.mon ?? '未有資料'}</span>
                      </li>
                      <li>
                        <span>{OPENING_HOURS.tue}：</span>
                        <span>{place.openingHours.tue ?? '未有資料'}</span>
                      </li>
                      <li>
                        <span>{OPENING_HOURS.wed}：</span>
                        <span>{place.openingHours.wed ?? '未有資料'}</span>
                      </li>
                      <li>
                        <span>{OPENING_HOURS.thu}：</span>
                        <span>{place.openingHours.thu ?? '未有資料'}</span>
                      </li>
                      <li>
                        <span>{OPENING_HOURS.fri}：</span>
                        <span>{place.openingHours.fri ?? '未有資料'}</span>
                      </li>
                      <li>
                        <span>{OPENING_HOURS.sat}：</span>
                        <span>{place.openingHours.sat ?? '未有資料'}</span>
                      </li>
                      <li>
                        <span>{OPENING_HOURS.sun}：</span>
                        <span>{place.openingHours.sun ?? '未有資料'}</span>
                      </li>
                      <li>
                        <span>{OPENING_HOURS.holiday}：</span>
                        <span>{place.openingHours.holiday ?? '未有資料'}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {place.website && (
                <div className='flex items-start'>
                  <Globe className='w-5 h-5 mr-2 mt-1 shrink-0' />
                  <div>
                    <h3 className='font-semibold'>網站</h3>
                    <a
                      href={place.website}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-600 hover:underline'
                    >
                      {place.website}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* <h2 className='text-1xl font-semibold mb-4'>服務及設施</h2>
            <ul className='mb-8'>
              {services.map((item, index) => (
                <li
                  key={index}
                  className='flex justify-between items-center border-b py-2'
                >
                  <span>{item.nameZhHk}</span>
                  <span className='font-semibold'>{item.price}</span>
                </li>
              ))}
            </ul> */}
          </div>

          <div ref={photosRef} className='pt-8'>
            <h2 className='text-2xl font-semibold mb-4'>相片</h2>
            <div className='grid grid-cols-2 gap-4 mb-8'>
              {images.map((image, index) => (
                <Image
                  key={index}
                  src={image || '/placeholder.svg'}
                  alt={`${place.nameZhHk} - Photo ${index + 1}`}
                  width={400}
                  height={300}
                  className='rounded-lg object-cover w-full h-48'
                />
              ))}
            </div>
          </div>

          <div ref={reviewsRef} className='pt-8'>
            <div>
              <h2 className='text-2xl font-semibold mb-4'>評論</h2>

              <div className='mb-8 relative'>
                <PlaceReviewForm onSubmit={handleNewReview} />
              </div>

              {reviews && reviews.length === 0 && (
                <div className='flex items-center justify-center'>暫無評論</div>
              )}

              {reviews && reviews.length > 0 && (
                <div>
                  {reviews.map(review => (
                    <div key={review.id} className='mb-4'>
                      <PlaceReviewCard review={review} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <RelatedPlaces originalPlace={place} />
        </div>
      </div>
    </div>
  );
}
