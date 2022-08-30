import { takeLatest, all, call, put } from 'typed-redux-saga';

// import { getProductsAndDocuments} from '../../utils/firebase/firebase.utils';

import { fetchProductsSuccess, fetchProductsFailed } from './products.action';

import { Product, PRODUCTS_ACTION_TYPES } from './products.types';

const getProductsAndDocuments = () => {
    let items: Product[] = require('../../data/items.json');
    return items;
}

export function* fetchProductsAsync() {
    try {
        const productsArray = yield* call( getProductsAndDocuments );
        yield* put ( fetchProductsSuccess( productsArray ));
    } catch (error) {
        yield* put ( fetchProductsFailed( error as Error ));
    }
}

export function* onFetchProducts() {
    // yield* takeLatest(PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_START, fetchProductsAsync);
    yield* takeLatest(PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_START, fetchProductsAsync);
}

export function* productsSaga() {
    yield* all([call(onFetchProducts)])
}