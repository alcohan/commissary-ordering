export enum PRODUCTS_ACTION_TYPES {
    FETCH_PRODUCTS_START = 'product/FETCH_PRODUCTS_START',
    FETCH_PRODUCTS_SUCCESS = 'product/FETCH_PRODUCTS_SUCCESS',
    FETCH_PRODUCTS_FAILED = 'product/FETCH_PRODUCTS_FAILED',
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