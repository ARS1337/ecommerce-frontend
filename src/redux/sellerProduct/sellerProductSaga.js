import { call, put, takeLatest, all } from "redux-saga/effects";
import * as types from "./sellerProductConstants";
import * as actions from "./sellerProductActions";
import api from "../../axiosSingleton";

function* fetchSellerProductsSaga(action) {
  try {
    const { limit = 6, offset = 0 } = action.payload || {};
    const response = yield call(api.get, `/product/seller/product?limit=${limit}&offset=${offset}`);
    yield put(actions.fetchSellerProductsSuccess(response.data));
  } catch (e) {
    yield put(actions.fetchSellerProductsFailure(e.message));
  }
}


function* addSellerProductSaga(action) {
  try {
    yield call(api.post, "/product", action.payload);
    yield put(actions.addSellerProductSuccess());
    yield put(actions.fetchSellerProductsRequest());
  } catch (error) {
    yield put(actions.addSellerProductFailure(error.message));
  }
}

function* editSellerProductSaga(action) {
  try {
    const { id, product } = action.payload;
    yield call(api.put, `/product/${id}`, product);
    yield put(actions.editSellerProductSuccess());
    yield put(actions.fetchSellerProductsRequest());
  } catch (error) {
    yield put(actions.editSellerProductFailure(error.message));
  }
}

function* deleteSellerProductSaga(action) {
  try {
    yield call(api.delete, `/product/${action.payload}`);
    yield put(actions.deleteSellerProductSuccess());
    yield put(actions.fetchSellerProductsRequest());
  } catch (error) {
    yield put(actions.deleteSellerProductFailure(error.message));
  }
}

// --- Watcher ---
function* sellerProductSaga() {
  yield all([
    takeLatest(types.FETCH_SELLER_PRODUCTS_REQUEST, fetchSellerProductsSaga),
    takeLatest(types.ADD_SELLER_PRODUCT_REQUEST, addSellerProductSaga),
    takeLatest(types.EDIT_SELLER_PRODUCT_REQUEST, editSellerProductSaga),
    takeLatest(types.DELETE_SELLER_PRODUCT_REQUEST, deleteSellerProductSaga),
  ]);
}

export default sellerProductSaga;
