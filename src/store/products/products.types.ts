export enum PRODUCTS_ACTION_TYPES {
    FETCH_PRODUCTS_START = 'product/FETCH_PRODUCTS_START',
    FETCH_PRODUCTS_SUCCESS = 'product/FETCH_PRODUCTS_SUCCESS',
    FETCH_PRODUCTS_FAILED = 'product/FETCH_PRODUCTS_FAILED',

    UPDATE_PRODUCT_START = 'product/UPDATE_PRODUCT_START',
    UPDATE_PRODUCT_FAILED = 'product/UPDATE_PRODUCT_FAILED',
    UPDATE_PRODUCT_SUCCESS = 'product/UPDATE_PRODUCT_SUCCESS',
}

export type Product = {
    "Item GUID": string;
    "Sort Order": number;
    "Item Name": string;
    "DisplayName": string;
    "Pack Size": string;
    "List Price (WA)": number;
    "List Price (OR)": number;
    "Weight": number;
    "Category Code": number;
    "GL index": number;
    "Enabled": boolean;
}
