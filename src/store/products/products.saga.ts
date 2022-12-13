import { takeLatest, all, call, put } from 'typed-redux-saga';

import { getFirebaseDocuments, updateProductDocument} from '../../utils/firebase/firebase.utils';

import { fetchProductsSuccess, fetchProductsFailed, updateProductFailed, updateProductSuccess, UpdateProductStart, fetchProductsStart } from './products.action';

import { Product, PRODUCTS_ACTION_TYPES } from './products.types';

// manually use local json data
// const getProductsAndDocuments = () => {
//     let items: Product[] = require('../../data/items.json');
//     return items;
// }

export function* fetchProductsAsync() {
    try {
        const productsArray = yield* call( getFirebaseDocuments<Product>, "products" );
        yield* put ( fetchProductsSuccess( productsArray ));
    } catch (error) {
        yield* put ( fetchProductsFailed( error as Error ));
    }
}

export function* updateProductAsync(action:UpdateProductStart) {
    try {
        const result = yield* call( updateProductDocument, "products", action.payload );
        yield* put(fetchProductsStart () );
        yield* put( updateProductSuccess ());
    }
    catch (error) {
        yield* put (updateProductFailed(error as Error));
    }
}

export function* onFetchProducts() {
    yield* takeLatest(PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_START, fetchProductsAsync );
}
export function* onUpdateProducts() {
    yield* takeLatest(PRODUCTS_ACTION_TYPES.UPDATE_PRODUCT_START, updateProductAsync );
}

export function* productsSaga() {
    yield* all([call(onFetchProducts),call(onUpdateProducts)])
}