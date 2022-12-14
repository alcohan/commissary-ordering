import { AnyAction } from "redux";
import { Order } from "./orders.types"

import {
    fetchOrdersStart,
    fetchOrdersSuccess,
    fetchOrdersFailed,
    updateOrderStart,
    updateOrderSuccess,
    updateOrderFailed,
} from "./orders.action"

export type OrdersState = {
    readonly orders: Order[];
    readonly isLoading: boolean;
    readonly error: Error | null;
}

export const ORDERS_INITIAL_STATE = {
    orders: [],
    isLoading: false,
    error: null,
}

export const ordersReducer = (
    state = ORDERS_INITIAL_STATE,
    action: AnyAction
): OrdersState => {
    if (fetchOrdersStart.match(action)) {
        return {...state, isLoading: true };
    }
    if (fetchOrdersSuccess.match(action)) {
        return {...state, orders: action.payload, isLoading: false };
    }
    if (fetchOrdersFailed.match(action)) {
        return {...state, error: action.payload, isLoading: false };
    }
    if(updateOrderStart.match(action)){
        return{...state, isLoading: true};
    }
    if(updateOrderSuccess.match(action)){
        return{...state, isLoading: false};
    }
    if(updateOrderFailed.match(action)){
        return{ ...state, error: action.payload, isLoading:false};
    }
    return state;
}