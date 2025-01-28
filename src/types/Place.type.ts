export interface PlaceOverview {
  id: number;
  nameZhHk?: string | null;
  nameEnUs?: string | null;
  thumbnailUrl?: string | null;
  area: PlaceArea;
  categories: PlaceCategory[];
}

export interface Place {
  id: number;
  nameZhHk?: string | null;
  nameEnUs?: string | null;
  thumbnailUrl?: string | null;
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
