import { AnyAction } from "redux";
import { Product } from "./products.types";

import {
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailed,
    updateProductStart,
    updateProductSuccess,
    updateProductFailed,
  } from "./products.action";

export type ProductsState = {
    readonly products: Product[]
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const TEST_PRODUCT: Product = {
    "Item GUID": "3C99BEEC-4E6F-EC11-8943-000D3A5C40F8",
    "Sort Order": 70,
    "Item Name": "Cilantro Lime",
    "DisplayName": "",
    "Pack Size": "Gal",
    "List Price (WA)": 21.94,
    "List Price (OR)": 21.94,
    "Weight": 8,
    "Category Code": 0,
    "GL index": 0,
    "Enabled": true
}
export const PRODUCTS_INITIAL_STATE = {
    products: [],
    isLoading: false,
    error: null,
};

export const productsReducer = (
    state = PRODUCTS_INITIAL_STATE,
    action: AnyAction
): ProductsState => {
    if(fetchProductsStart.match(action)) {
    return { ...state, isLoading: true };
    }
    if(fetchProductsSuccess.match(action)) {
    return { ...state, products: action.payload, isLoading: false };
    }
    if(fetchProductsFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
    }
    if(updateProductStart.match(action)){
        return{...state, isLoading: true};
    }
    if(updateProductSuccess.match(action)) {
        return{...state, isLoading: false};
    }
    if(updateProductFailed.match(action)) {
        return{ ...state, error:action.payload, isLoading:false};
    }
    return state;
}