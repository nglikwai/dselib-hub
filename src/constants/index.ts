import { getMeta } from 'src/lib/utils';

export const QUERY_KEYS = {
  SSR_ERROR: 'SSR_ERROR',
  RECOMMENDED_PLACES: 'RECOMMENDED_PLACES',
  PLACE_CATEGORIES: 'PLACE_CATEGORIES',
  POPULAR_AREAS: 'POPULAR_AREAS',
  PLACE_DETAIL: 'PLACE_DETAIL',
  RELATED_PLACES: 'RELATED_PLACES',
  ALL_AREAS: 'ALL_AREAS',
  SEARCH_PLACES: 'SEARCH_PLACES',
  MY_PROFILE: 'MY_PROFILE',
  PLACE_REVIEWS: 'PLACE_REVIEWS',
};

export const webData = {
  title: 'past paper',
  slogan: 'Past Paper',
  description:
    'Collection of Past Paper for high school students preparing seating your public exam',
};

export const allSubjects = [
  {
    key: 'core',
    displayName: 'Core',
    displayNameTc: '核心科目',
    items: getMeta(['chi', 'eng', 'm0', 'citizen', 'ls']),
  },
  {
    key: 'science',
    displayName: 'Science',
    displayNameTc: '科學',
    items: getMeta(['phy', 'chem', 'bio', 'm1', 'm2']),
  },
  {
    key: 'business',
    displayName: 'Business',
    displayNameTc: '商業',
    items: getMeta(['bafs', 'econ']),
  },
  {
    key: 'liberal',
    displayName: '文科',
    displayNameTc: '文科',
    items: getMeta(['chihist', 'enghist', 'geog']),
  },
  {
    key: 'others',
    displayName: 'Others',
    displayNameTc: '其他',
    items: getMeta(['ict', 'ths']),
  },
];
