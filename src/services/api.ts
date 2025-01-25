import axios from 'axios';

import { Pagination } from '@/types/Pagination.type';
import {
  Place,
  PlaceArea,
  PlaceCategory,
  PlaceOverview,
  SearchPlaceQuery,
} from '@/types/Place.type';

const REFRESH_TOKEN_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/tokens/refresh`;

const LOGOUT_URL = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/auth/signout`;

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(config => {
  const accessToken = localStorage.getItem(
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!
  );

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Handle 401 errors by refreshing the token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        const refreshToken = localStorage.getItem(
          process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME!
        );

        if (!refreshToken) {
          // Redirect to logout page if refresh token is missing
          window.location.href = LOGOUT_URL;

          return;
        }

        const response = await fetch(REFRESH_TOKEN_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        const { accessToken } = await response.json();

        if (!accessToken) {
          // Redirect to logout page if failed to refresh access token
          window.location.href = LOGOUT_URL;

          return;
        }

        // Update the access token in local storage
        localStorage.setItem(
          process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!,
          accessToken
        );

        // Retry the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);

        // Redirect to logout page if failed to refresh access token
        window.location.href = LOGOUT_URL;

        return;
      }
    }

    if (error.response?.status === 401 && originalRequest._retry) {
      // Redirect to logout page if refresh token is invalid
      window.location.href = LOGOUT_URL;

      return;
    }

    return Promise.reject(error);
  }
);

const createRequest = async ({ url, method, data, params }: any) => {
  const requestOptions = {
    method,
    url,
    data,
    params,
  };

  return axiosInstance(requestOptions);
};

const getRecommendedPlaces = async () => {
  try {
    const { data } = await createRequest({
      url: `v1/places/recommendations`,
      method: 'GET',
    });

    if (!data) {
      throw new Error('Recommended places not found');
    }

    return data as PlaceOverview[];
  } catch (error: any) {
    throw new Error(`Failed to fetch recommended places: ${error.message}`);
  }
};

const getCategories = async () => {
  try {
    const { data } = await createRequest({
      url: `v1/places/categories`,
      method: 'GET',
    });

    if (!data) {
      throw new Error('Categories not found');
    }

    return data as PlaceCategory[];
  } catch (error: any) {
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }
};

const getPopularAreas = async () => {
  try {
    const { data } = await createRequest({
      url: `v1/places/areas/popular`,
      method: 'GET',
    });

    if (!data) {
      throw new Error('Popular areas not found');
    }

    return data as PlaceArea[];
  } catch (error: any) {
    throw new Error(`Failed to fetch popular areas: ${error.message}`);
  }
};

const getAllAreas = async () => {
  try {
    const { data } = await createRequest({
      url: `v1/places/areas`,
      method: 'GET',
    });

    if (!data) {
      throw new Error('Areas not found');
    }

    return data as PlaceArea[];
  } catch (error: any) {
    throw new Error(`Failed to fetch areas: ${error.message}`);
  }
};

const getPlaceDetail = async (id: number) => {
  try {
    const { data } = await createRequest({
      url: `v1/places/${id}`,
      method: 'GET',
    });

    if (!data) {
      throw new Error('Place not found');
    }

    return data as Place;
  } catch (error: any) {
    throw new Error(`Failed to fetch place: ${error.message}`);
  }
};

const searchPlaces = async (query: SearchPlaceQuery) => {
  try {
    const { data } = await createRequest({
      url: `v1/places/search`,
      method: 'GET',
      params: query,
    });

    if (!data) {
      throw new Error('Failed to search places');
    }

    return data as Pagination<Place>;
  } catch (error: any) {
    throw new Error(`Failed to search places: ${error.message}`);
  }
};

export default {
  getRecommendedPlaces,
  getCategories,
  getPopularAreas,
  getAllAreas,
  getPlaceDetail,
  searchPlaces,
};
