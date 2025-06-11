import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE } from "./productConstants";

function buildQuery(params) {
  const { tags, priceLT, limit, offset, category } = params;
  const query = new URLSearchParams();

  if (tags) query.append("tags", tags.join(","));
  if (priceLT !== undefined) query.append("priceLT", priceLT);
  if (limit !== undefined) query.append("limit", limit);
  if (offset !== undefined) query.append("offset", offset);
  if (category) query.append("category", category);

  return query.toString();
}

function* fetchProductsSaga(action) {
  try {
    console.log("🔥 fetchProductsSaga TRIGGERED", action);
    const query = buildQuery(action.payload);
    console.log("2222 query ", query);
    const response = yield call(axios.get, `http://localhost:8000/product?${query}`);
    console.log("2222 response ", response);

    yield put({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: response.data,
      meta: { category: action.payload.category },
    });
  } catch (error) {
    yield put({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
  }
}

export default function* watchProductSaga() {
  yield takeEvery(FETCH_PRODUCTS_REQUEST, fetchProductsSaga);
}
