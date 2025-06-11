import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_ORDERS_REQUEST,
  CREATE_ORDER_REQUEST,
} from "./orderConstants";
import {
  fetchOrdersSuccess,
  fetchOrdersFailure,
  createOrderSuccess,
  createOrderFailure,
} from "./orderActions";
import api from "../../axiosSingleton";

// GET: Fetch customer orders
function* fetchOrdersSaga(action) {
  try {
    const { limit, offset } = action.payload;

    const response = yield call(() =>
      api.get("/order/customerOrder", {
        params: { limit, offset },
      })
    );

    yield put(fetchOrdersSuccess(response.data));
  } catch (error) {
    yield put(fetchOrdersFailure(error.message || "Fetch orders failed"));
  }
}


// POST: Create order
function* createOrderSaga(action) {
  try {
    const response = yield call(() =>
      api.post("/order", action.payload)
    );
    yield put(createOrderSuccess(response.data));
  } catch (error) {
    yield put(createOrderFailure(error.message || "Create order failed"));
  }
}

export default function* orderSaga() {
  yield takeLatest(FETCH_ORDERS_REQUEST, fetchOrdersSaga);
  yield takeLatest(CREATE_ORDER_REQUEST, createOrderSaga);
}
