import { createSelector } from 'reselect';
import { RootState } from '../store';

import { ProductsState } from './products.reducer';

const selectProductsReducer = (state:RootState): ProductsState => {
    return state.products
};

export const selectProducts = createSelector(
    [selectProductsReducer],
    (productsSlice) => {return productsSlice.products;} 
)

export const selectProductsIsLoading = createSelector(
    [selectProductsReducer],
    (productsSlice) => productsSlice.isLoading
)