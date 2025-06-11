import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from './categoryConstants';

export const fetchCategoriesRequest = (payload = { limit: 6, offset: 0 }) => ({
  type: FETCH_CATEGORIES_REQUEST,
  payload,
});

export const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchCategoriesFailure = (error) => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: error,
});
