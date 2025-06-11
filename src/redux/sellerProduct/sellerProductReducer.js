import * as types from "./sellerProductConstants";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const sellerProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SELLER_PRODUCTS_REQUEST:
    case types.ADD_SELLER_PRODUCT_REQUEST:
    case types.EDIT_SELLER_PRODUCT_REQUEST:
    case types.DELETE_SELLER_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };

    case types.FETCH_SELLER_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload };

    case types.ADD_SELLER_PRODUCT_SUCCESS:
    case types.EDIT_SELLER_PRODUCT_SUCCESS:
    case types.DELETE_SELLER_PRODUCT_SUCCESS:
      return { ...state, loading: false };

    case types.FETCH_SELLER_PRODUCTS_FAILURE:
    case types.ADD_SELLER_PRODUCT_FAILURE:
    case types.EDIT_SELLER_PRODUCT_FAILURE:
    case types.DELETE_SELLER_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default sellerProductReducer;
