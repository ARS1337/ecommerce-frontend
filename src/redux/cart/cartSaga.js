// src/features/cart/cartSaga.js
import { put, takeLatest, all } from "redux-saga/effects";
import {
  ADD_TO_CART_REQUEST,
  DECREASE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_REQUEST,
  CLEAR_CART_REQUEST,
} from "./cartConstants";

import {
  addToCart,
  decreaseFromCart,
  removeFromCart,
  clearCart,
} from "./cartReducer";

function* handleAddToCart(action) {
  yield put(addToCart(action.payload));
}

function* handleDecreaseFromCart(action) {
  yield put(decreaseFromCart(action.payload));
}

function* handleRemoveFromCart(action) {
  yield put(removeFromCart(action.payload));
}

function* handleClearCart() {
  yield put(clearCart());
}

export default function* cartSaga() {
  yield all([
    takeLatest(ADD_TO_CART_REQUEST, handleAddToCart),
    takeLatest(DECREASE_FROM_CART_REQUEST, handleDecreaseFromCart),
    takeLatest(REMOVE_FROM_CART_REQUEST, handleRemoveFromCart),
    takeLatest(CLEAR_CART_REQUEST, handleClearCart),
  ]);
}
