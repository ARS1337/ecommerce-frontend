// src/features/cart/cartActions.js
import {
  ADD_TO_CART_REQUEST,
  DECREASE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_REQUEST,
  CLEAR_CART_REQUEST,
} from "./cartConstants";

export const addToCartRequest = (item) => ({
  type: ADD_TO_CART_REQUEST,
  payload: item,
});

export const decreaseFromCartRequest = (item) => ({
  type: DECREASE_FROM_CART_REQUEST,
  payload: item,
});

export const removeFromCartRequest = (id) => ({
  type: REMOVE_FROM_CART_REQUEST,
  payload: id,
});

export const clearCartRequest = () => ({
  type: CLEAR_CART_REQUEST,
});
