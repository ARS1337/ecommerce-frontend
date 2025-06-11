import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from './categoryConstants';

function* fetchCategoriesSaga(action) {
  const { limit, offset } = action.payload || { limit: 6, offset: 0 };

  try {
    const response = yield call(
      axios.get,
      `http://localhost:8000/category?limit=${limit}&offset=${offset}`
    );
    yield put({ type: FETCH_CATEGORIES_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_CATEGORIES_FAILURE, payload: error.message });
  }
}

export default function* categoryWatcherSaga() {
  yield takeLatest(FETCH_CATEGORIES_REQUEST, fetchCategoriesSaga);
}
