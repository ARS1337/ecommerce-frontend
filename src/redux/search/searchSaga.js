// src/features/search/searchSaga.js
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  SEARCH_REQUEST,
} from "./searchConstants";
import {
  searchSuccess,
  searchFailure,
} from "./searchActions";

// Helper to build query string from params object
function buildQueryString(params) {
  const query = new URLSearchParams();

  if (params.priceLT) query.append("priceLT", params.priceLT);
  if (params.priceGT) query.append("priceGT", params.priceGT);
  if (params.search) query.append("search", params.search);
  if (params.category) query.append("category", params.category);
  if (params.limit) query.append("limit", params.limit);
  if (params.offset) query.append("offset", params.offset);

  return query.toString();
}

// Worker saga
function* handleSearch(action) {
  try {
    const query = buildQueryString(action.payload);
    const url = `http://localhost:8000/product/search?${query}`;
    const response = yield call(axios.get, url);
    yield put(searchSuccess(response.data));
  } catch (error) {
    yield put(searchFailure(error.message || "Unknown error"));
  }
}

// Watcher saga
export default function* searchSaga() {
  yield takeLatest(SEARCH_REQUEST, handleSearch);
}
