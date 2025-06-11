import { FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE } from "./productConstants";

const initialState = {
  loading: false,
  products: [],
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCTS_SUCCESS:
      console.log("💾 Saving products for category:", action.meta.category);
      return {
        ...state,
        loading: false,
        products: {
          ...state.products,
          [action.meta.category]: action.payload, // store by category name
        },
      };
    case FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default productReducer;
