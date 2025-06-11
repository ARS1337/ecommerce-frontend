import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
} from "./orderConstants";

// Fetch Orders
export const fetchOrdersRequest = (payload) => ({
  type: FETCH_ORDERS_REQUEST,
  payload,
});
export const fetchOrdersSuccess = (orders) => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: orders,
});
export const fetchOrdersFailure = (error) => ({
  type: FETCH_ORDERS_FAILURE,
  payload: error,
});

// Create Order
export const createOrderRequest = (orderData) => ({
  type: CREATE_ORDER_REQUEST,
  payload: orderData,
});
export const createOrderSuccess = (response) => ({
  type: CREATE_ORDER_SUCCESS,
  payload: response,
});
export const createOrderFailure = (error) => ({
  type: CREATE_ORDER_FAILURE,
  payload: error,
});
