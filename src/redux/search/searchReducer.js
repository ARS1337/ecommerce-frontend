import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SET_SEARCH_FILTERS,
} from "./searchConstants";

const initialState = {
  loading: false,
  data: [],
  error: null,
  filters: {
    search: "",
    category: "",
    priceGT: "",
    priceLT: "",
    limit: 20,
    offset: 0,
  },
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case SEARCH_REQUEST:
      return { ...state, loading: true, error: null };
    case SEARCH_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case SEARCH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default searchReducer;
