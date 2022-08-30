import { createSelector } from 'reselect';
import { cartItem } from './cart.types';

import { RootState } from '../store';
import { CartState } from './cart.reducer';

const selectCartReducer = (state: RootState): CartState => state.cart;
export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
);

export const selectCartIsOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.cartIsOpen
);

// export const selectCartIsOpen = (state) => state.cart.cartIsOpen;

// export const selectCartItems = (state) => state.cart.cartItems;

export const selectCartQuantity = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce( (previousValue:number, item:cartItem) => previousValue+item.quantity, 0)
);

export const selectCartSubtotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce( (total:number, item:cartItem) => total+item["List Price (WA)"]*item.quantity, 0)
);
