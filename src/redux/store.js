// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartReducer";
import productReducer from "./product/productReducer";
import categoryReducer from "./categories/categoryReducer";
import orderReducer from "./order/orderReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root-saga";
import { filterReducer } from "./filter/filterReducer";
import searchReducer from "./search/searchReducer";
import sellerProductReducer from "./sellerProduct/sellerProductReducer";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    categories: categoryReducer,
    order: orderReducer,
    filter:filterReducer,
    search:searchReducer,
    sellerProduct: sellerProductReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
