import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SET_SEARCH_FILTERS,
} from "./searchConstants";

export const searchRequest = (params) => ({
  type: SEARCH_REQUEST,
  payload: params,
});

export const searchSuccess = (results) => ({
  type: SEARCH_SUCCESS,
  payload: results,
});

export const searchFailure = (error) => ({
  type: SEARCH_FAILURE,
  payload: error,
});

export const setSearchFilters = (filters) => ({
  type: SET_SEARCH_FILTERS,
  payload: filters,
});
