import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
} from "./orderConstants";

const initialState = {
  orders: [],
  loading: false,
  error: null,
  orderCreationSuccess: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS_REQUEST:
    case CREATE_ORDER_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload.data, // assuming payload has { count, data }
        count: action.payload.count,
      };

    case FETCH_ORDERS_FAILURE:
    case CREATE_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orderCreationSuccess: true,
        orders: [...state.orders, action.payload], // optional
      };

    default:
      return state;
  }
};

export default orderReducer;
