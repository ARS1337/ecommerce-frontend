import * as types from "./sellerProductConstants";

// Fetch
export const fetchSellerProductsRequest = (payload) => ({
  type: types.FETCH_SELLER_PRODUCTS_REQUEST,
  payload,
});
export const fetchSellerProductsSuccess = (products) => ({ type: types.FETCH_SELLER_PRODUCTS_SUCCESS, payload: products });
export const fetchSellerProductsFailure = (error) => ({ type: types.FETCH_SELLER_PRODUCTS_FAILURE, payload: error });

// Add
export const addSellerProductRequest = (product) => ({ type: types.ADD_SELLER_PRODUCT_REQUEST, payload: product });
export const addSellerProductSuccess = () => ({ type: types.ADD_SELLER_PRODUCT_SUCCESS });
export const addSellerProductFailure = (error) => ({ type: types.ADD_SELLER_PRODUCT_FAILURE, payload: error });

// Edit
export const editSellerProductRequest = (id, product) => ({ type: types.EDIT_SELLER_PRODUCT_REQUEST, payload: { id, product } });
export const editSellerProductSuccess = () => ({ type: types.EDIT_SELLER_PRODUCT_SUCCESS });
export const editSellerProductFailure = (error) => ({ type: types.EDIT_SELLER_PRODUCT_FAILURE, payload: error });

// Delete
export const deleteSellerProductRequest = (id) => ({ type: types.DELETE_SELLER_PRODUCT_REQUEST, payload: id });
export const deleteSellerProductSuccess = () => ({ type: types.DELETE_SELLER_PRODUCT_SUCCESS });
export const deleteSellerProductFailure = (error) => ({ type: types.DELETE_SELLER_PRODUCT_FAILURE, payload: error });
