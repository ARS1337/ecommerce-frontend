import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from "./productConstants";

export const fetchProductsRequest = (params) => ({
  type: FETCH_PRODUCTS_REQUEST,
  payload: params, // params: { tags, priceLT, limit, offset, category }
});

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});
