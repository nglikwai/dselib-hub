import axios from 'axios';

import { useAuthStore } from '@/stores/auth.store';
import {
  SigninCredentials,
  SignupCredentials,
  Tokens,
} from '@/types/auth.type';
import { Pagination } from '@/types/Pagination.type';
import {
  Place,
  PlaceArea,
  PlaceCategory,
  PlaceOverview,
  PlaceReview,
  SearchPlaceQuery,
} from '@/types/Place.type';
import { User } from '@/types/user.type';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(config => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    const targetUrl = originalRequest.url;

    // Return error if the request is for signin
    if (targetUrl === 'v1/auth/signin' || targetUrl === 'v1/users/me') {
      return Promise.reject(error);
    }

    // Handle 401 errors by refreshing the token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        if (!refreshToken) {
          return Promise.reject('Refresh token not found');
        }
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/refresh`,
          { refreshToken }
        );
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        useAuthStore
          .getState()
          .setTokens({ accessToken, refreshToken: newRefreshToken });

        // Retry the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        useAuthStore.getState().signout();
        window.location.href = '/auth/signin';
        return Promise.reject(err);
      }
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

const signup = async (credentials: SignupCredentials) => {
  try {
    const { data } = await createRequest({
      url: `v1/auth/register`,
      method: 'POST',
      data: credentials,
    });

    if (!data) {
      throw new Error('Failed to signup');
    }

    return data as Tokens;
  } catch (error: any) {
    throw new Error(
      `未能註冊: ${error?.response?.data?.message || error.message}`
    );
  }
};

const signin = async (credentials: SigninCredentials) => {
  try {
    const { data } = await createRequest({
      url: `v1/auth/signin`,
      method: 'POST',
      data: credentials,
    });

    if (!data) {
      throw new Error('Failed to signin');
    }

    return data as Tokens;
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error('電郵地址或密碼不正確');
    }
    throw new Error(`未能登入: ${error.message}`);
  }
};

const signout = async () => {
  try {
    const refreshToken = useAuthStore.getState().refreshToken;

    if (!refreshToken) {
      throw new Error('Refresh token not found');
    }

    await createRequest({
      url: `v1/auth/signout`,
      method: 'POST',
      data: { refreshToken },
    });
  } catch (error: any) {
    throw new Error(`未能登出: ${error.message}`);
  }
};

const getMyProfile = async () => {
  try {
    const { data } = await createRequest({
      url: `v1/users/me`,
      method: 'GET',
    });

    if (!data) {
      throw new Error('Profile not found');
    }

    return data as User;
  } catch (error: any) {
    throw new Error(`Failed to fetch profile: ${error.message}`);
  }
};

const updateMyProfile = async (payload: Partial<User>) => {
  try {
    const { data } = await createRequest({
      url: `v1/users/me`,
      method: 'PATCH',
      data: payload,
    });

    if (!data) {
      throw new Error('Profile not found');
    }

    return data as User;
  } catch (error: any) {
    throw new Error(`Failed to fetch profile: ${error.message}`);
  }
};

const createPlaceReview = async (
  placeId: number,
  payload: Pick<PlaceReview, 'rating' | 'content'>
) => {
  try {
    const { data } = await createRequest({
      url: `v1/places/${placeId}/reviews`,
      method: 'POST',
      data: payload,
    });

    if (!data) {
      throw new Error('Place review not created');
    }

    return data as PlaceReview[];
  } catch (error: any) {
    throw new Error(`Failed to create place review: ${error.message}`);
  }
};

const getPlaceReviews = async (placeId: number) => {
  try {
    const { data } = await createRequest({
      url: `v1/places/${placeId}/reviews`,
      method: 'GET',
    });

    if (!data) {
      throw new Error('Place reviews not found');
    }

    return data as PlaceReview[];
  } catch (error: any) {
    throw new Error(`Failed to fetch place reviews: ${error.message}`);
  }
};

export default {
  getRecommendedPlaces,
  getCategories,
  getPopularAreas,
  getAllAreas,
  getPlaceDetail,
  searchPlaces,
  signup,
  signin,
  signout,
  getMyProfile,
  updateMyProfile,
  createPlaceReview,
  getPlaceReviews,
};
