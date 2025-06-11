import {
  SET_FILTER_PRICE,
  SET_FILTER_CATEGORY,
  RESET_FILTERS,
} from "./filterConstants";

const initialState = {
  price: null,
  category: null,
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER_PRICE:
      return {
        ...state,
        price: action.payload,
      };
    case SET_FILTER_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case RESET_FILTERS:
      return initialState;
    default:
      return state;
  }
};
