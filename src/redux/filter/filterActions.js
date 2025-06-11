import {
  SET_FILTER_PRICE,
  SET_FILTER_CATEGORY,
  RESET_FILTERS,
} from "./filterConstants";

export const setFilterPrice = (price) => ({
  type: SET_FILTER_PRICE,
  payload: price,
});

export const setFilterCategory = (category) => ({
  type: SET_FILTER_CATEGORY,
  payload: category,
});

export const resetFilters = () => ({
  type: RESET_FILTERS,
});
