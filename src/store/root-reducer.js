import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';
import { productsReducer } from './products/products.reducer';
import { cartReducer } from './cart/cart.reducer';
import { customersReducer } from './customers/customers.reducer';

export const rootReducer = combineReducers( {
    user: userReducer,
    products: productsReducer,
    cart: cartReducer,
    customers: customersReducer,
})