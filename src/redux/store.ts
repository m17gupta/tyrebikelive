import { configureStore } from "@reduxjs/toolkit";
import attributeReducer from "./slices/attributes/attributeSlices";
import categoryReducer from "./slices/categories/categoriesSlices";
import productsReducer from "./slices/products/productsSlices";

export const store = configureStore({
  reducer: {
    attributes: attributeReducer,
    categories: categoryReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
