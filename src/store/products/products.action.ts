import { PRODUCTS_ACTION_TYPES, Product } from "./products.types";

import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";

export type FetchProductsStart =
  Action<PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_START>;

export type FetchProductsSuccess = ActionWithPayload<
  PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_SUCCESS,
  Product[]
>;

export type FetchProductsFailed = ActionWithPayload<
  PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_FAILED,
  Error
>;

export const fetchProductsStart = withMatcher(
  (): FetchProductsStart =>
    createAction(PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_START)
);

export const fetchProductsSuccess = withMatcher(
  (productsArray: Product[]): FetchProductsSuccess =>
    createAction(
      PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_SUCCESS,
      productsArray
    )
);

export const fetchProductsFailed = withMatcher(
  (error: Error): FetchProductsFailed =>
    createAction(PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_FAILED, error)
);


export type UpdateProductStart = ActionWithPayload<
  PRODUCTS_ACTION_TYPES.UPDATE_PRODUCT_START,
  Product
  >;
export type UpdateProductSuccess = Action<
  PRODUCTS_ACTION_TYPES.UPDATE_PRODUCT_SUCCESS
  >;
export type UpdateProductFailed = ActionWithPayload<
  PRODUCTS_ACTION_TYPES.UPDATE_PRODUCT_FAILED,
  Error
  >;

export const updateProductStart = withMatcher(
  (productToUpdate: Product): UpdateProductStart => 
    createAction(
      PRODUCTS_ACTION_TYPES.UPDATE_PRODUCT_START,
      productToUpdate
    )
);

export const updateProductSuccess = withMatcher(
  (): UpdateProductSuccess =>
    createAction(PRODUCTS_ACTION_TYPES.UPDATE_PRODUCT_SUCCESS)
);

export const updateProductFailed = withMatcher(
  (error: Error): UpdateProductFailed =>
    createAction(
      PRODUCTS_ACTION_TYPES.UPDATE_PRODUCT_FAILED,
      error
    )
)