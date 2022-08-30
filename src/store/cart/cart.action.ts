import { CART_ACTION_TYPES, cartItem } from "./cart.types";

import {
  createAction,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { Product } from "../products/products.types";

export type SetCartIsOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_STATUS,
  boolean
>;

export type SetCartContents = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_CONTENTS,
  cartItem[]
>;

export const setCartIsOpen = withMatcher((isOpen = false): SetCartIsOpen => {
  return createAction(CART_ACTION_TYPES.SET_CART_STATUS, isOpen);
});

export const setCartContents = withMatcher(
  (newCartItem: cartItem[]) => {
    return createAction(CART_ACTION_TYPES.SET_CART_CONTENTS, newCartItem);
  });

const addCartItem = (cartItem: cartItem[] = [], productToAdd: Product): cartItem[] => {
  //find if cartItem contains productToAdd
  const existingCartItem = cartItem.find(
    (item) => item["Item GUID"] === productToAdd["Item GUID"]
  );
  //if found, increment qty
  if (existingCartItem) {
    return cartItem.map((cartItem) =>
      cartItem["Item GUID"] === productToAdd["Item GUID"]
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  //return new array with modified cartItem / new cart item
  return [...cartItem, { ...productToAdd, quantity: 1 }];
};

const updateCartItem = (cartItem: cartItem[] = [], productToAdd: Product, quantity = 1): cartItem[] => {
  const existingCartItem = cartItem.find(
    (item) => item["Item GUID"] === productToAdd["Item GUID"]
  );
  if (existingCartItem) {
    return cartItem.map((cartItem) =>
      cartItem["Item GUID"] === productToAdd["Item GUID"]
        ? { ...cartItem, quantity: quantity }
        : cartItem
    );
  }
  return [...cartItem, { ...productToAdd, quantity: quantity }];
};

const removeCartItem = (cartItem: cartItem[] = [], productToRemove: Product): cartItem[] => {
  return cartItem.map((cartItem) =>
    cartItem["Item GUID"] === productToRemove["Item GUID"]
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
const deleteCartItem = (cartItem: cartItem[] = [], productToDelete: Product): cartItem[] => {
  return cartItem.filter((cartItem) => cartItem["Item GUID"] !== productToDelete["Item GUID"]);
};

export const addItemToCart = withMatcher((cartItem: cartItem[], productToAdd: Product): SetCartContents => {
  const newCartItems = addCartItem(cartItem, productToAdd);
  return setCartContents(newCartItems);
});

export const removeItemFromCart = withMatcher((
  cartItems: cartItem[],
  productToRemove: Product
): SetCartContents => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return setCartContents(newCartItems);
});

export const deleteItemFromCart = withMatcher((
  cartItems: cartItem[],
  productToDelete: Product
): SetCartContents => {
  const newCartItems = deleteCartItem(cartItems, productToDelete);
  return setCartContents(newCartItems);
});

export const updateItemInCart = withMatcher((
  cartItems: cartItem[],
  productToUpdate: Product,
  quantity: number
): SetCartContents => {
  const newCartItems = updateCartItem(cartItems, productToUpdate, quantity);
  return setCartContents(newCartItems);
})