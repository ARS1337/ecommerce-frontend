import { all } from 'redux-saga/effects';
import cartSaga from '../redux/cart/cartSaga';
import productSaga from '../redux/product/productSaga';
import categoryWatcherSaga from './categories/categorySaga';
import orderSaga from './order/orderSaga';
import searchSaga from './search/searchSaga';
import sellerProductSaga from "./sellerProduct/sellerProductSaga";

export default function* rootSaga() {
  yield all([
    cartSaga(),
    productSaga(),
    categoryWatcherSaga(),
    orderSaga(),
    searchSaga(),
    sellerProductSaga()
  ]);
}
