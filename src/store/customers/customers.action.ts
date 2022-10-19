import { CUSTOMERS_ACTION_TYPES, Customer } from "./customers.types";

import {
    createAction,
    Action,
    ActionWithPayload,
    withMatcher,
  } from "../../utils/reducer/reducer.utils";

export type FetchCustomersStart = 
    Action<CUSTOMERS_ACTION_TYPES.FETCH_CUSTOMERS_START>;

export type FetchCustomersSuccess = 
  ActionWithPayload<
    CUSTOMERS_ACTION_TYPES.FETCH_CUSTOMERS_SUCCESS,
    Customer[]
    >;

export type FetchCustomersFailed = 
  ActionWithPayload<
    CUSTOMERS_ACTION_TYPES.FETCH_CUSTOMERS_FAILED,
    Error
    >;

export const fetchCustomersStart = withMatcher(
    (): FetchCustomersStart =>
    createAction(CUSTOMERS_ACTION_TYPES.FETCH_CUSTOMERS_START)
)

export const fetchCustomersSuccess = withMatcher(
    (customersArray: Customer[]): FetchCustomersSuccess =>
        createAction(CUSTOMERS_ACTION_TYPES.FETCH_CUSTOMERS_SUCCESS,
        customersArray
    )
)

export const fetchCustomersFailed = withMatcher(
    (error: Error): FetchCustomersFailed =>
        createAction(CUSTOMERS_ACTION_TYPES.FETCH_CUSTOMERS_FAILED,
        error
    )
)