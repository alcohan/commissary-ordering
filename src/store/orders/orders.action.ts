import { ORDERS_ACTION_TYPES, Order } from "./orders.types";

import {
    createAction,
    Action,
    ActionWithPayload,
    withMatcher,
  } from "../../utils/reducer/reducer.utils";

export type FetchOrdersStart = 
    Action<ORDERS_ACTION_TYPES.FETCH_ORDERS_START>;

export type FetchOrdersSuccess = 
  ActionWithPayload<
    ORDERS_ACTION_TYPES.FETCH_ORDERS_SUCCESS,
    Order[]
    >;

export type FetchOrdersFailed = 
  ActionWithPayload<
    ORDERS_ACTION_TYPES.FETCH_ORDERS_FAILED,
    Error
    >;

export const fetchOrdersStart = withMatcher(
    (): FetchOrdersStart =>
    createAction(ORDERS_ACTION_TYPES.FETCH_ORDERS_START)
)

export const fetchOrdersSuccess = withMatcher(
    (ordersArray: Order[]): FetchOrdersSuccess =>
        createAction(ORDERS_ACTION_TYPES.FETCH_ORDERS_SUCCESS,
        ordersArray
    )
)

export const fetchOrdersFailed = withMatcher(
    (error: Error): FetchOrdersFailed =>
        createAction(ORDERS_ACTION_TYPES.FETCH_ORDERS_FAILED,
        error
    )
)

export type UpdateOrderStart = ActionWithPayload<
  ORDERS_ACTION_TYPES.UPDATE_ORDER_START,
  Order
  >;
export type UpdateOrderSuccess = Action<
  ORDERS_ACTION_TYPES.UPDATE_ORDER_SUCCESS
  >;
export type UpdateOrderFailed = ActionWithPayload<
  ORDERS_ACTION_TYPES.UPDATE_ORDER_FAILED,
  Error
  >;

export const updateOrderStart = withMatcher(
  (orderToUpdate: Order): UpdateOrderStart => 
    createAction(
      ORDERS_ACTION_TYPES.UPDATE_ORDER_START,
      orderToUpdate
    )
);

export const updateOrderSuccess = withMatcher(
  (): UpdateOrderSuccess =>
    createAction(ORDERS_ACTION_TYPES.UPDATE_ORDER_SUCCESS)
);

export const updateOrderFailed = withMatcher(
  (error: Error): UpdateOrderFailed =>
    createAction(
      ORDERS_ACTION_TYPES.UPDATE_ORDER_FAILED,
      error
    )
)