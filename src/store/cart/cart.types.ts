import { Product } from "../products/products.types";

export enum CART_ACTION_TYPES  {
    SET_CART_STATUS = 'cart/SET_CART_STATUS',
    SET_CART_CONTENTS = 'cart/SET_CART_CONTENTS',
}

export type cartItem = Product & {
    quantity: number;
}