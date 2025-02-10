import { Image } from './Image.type';
import { User } from './user.type';

export interface PlaceOverview {
  id: number;
  nameZhHk?: string | null;
  nameEnUs?: string | null;
  thumbnailObj?: Image | null;
  area: PlaceArea;
  categories: PlaceCategory[];
}

export interface Place {
  id: number;
  nameZhHk?: string | null;
  nameEnUs?: string | null;
  thumbnailObj?: Image | null;
  addressZhHk?: string | null;
  addressEnUs?: string | null;
  telephone?: string | null;
  website?: string | null;
  descriptionZhHk?: string | null;
  descriptionEnUs?: string | null;
  isMemberOnly?: boolean | null;
  isFeatured?: boolean | null;
  transportBus?: string | null;
  transportMinibus?: string | null;
  transportMtr?: string | null;
  openingHours?: {
    mon: string;
    tue: string;
    wed: string;
    thu: string;
    fri: string;
    sat: string;
    sun: string;
    holiday?: string | null;
  } | null;
  operationStatus?:
    | 'NORMAL'
    | 'PERM_CLOSED'
    | 'TEMP_CLOSED'
    | 'RENOVATION'
    | null;
  ref?: string | null;
  remarks?: string | null;
  area: PlaceArea;
  categories: PlaceCategory[];
}

export interface PlaceDistrict {
  id: number;
  nameZhHk: string;
  nameEnUs: string;
  code?: string | null;
}

export interface PlaceArea {
  id: number;
  nameZhHk: string;
  nameEnUs: string;
  code?: string | null;
  district: PlaceDistrict;
}

export interface PlaceCategory {
  id: number;
  nameZhHk: string;
  nameEnUs: string;
  code?: string | null;
  thumbnailUrl: string;
}

export interface SearchPlaceQuery {
  nameZhHk?: string | null;
  areaIds?: number[];
  categoryIds?: number[];
  page?: number;
  limit?: number;
}

export interface PlaceReview {
  id: number;
  rating: number;
  content: string;
  createdAt: string;
  author: User;
}
