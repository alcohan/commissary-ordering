import { CUSTOMERS_ACTION_TYPES, Customer, Commissary } from "./customers.types";

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
export type FetchCommissariesSuccess = 
  ActionWithPayload<
    CUSTOMERS_ACTION_TYPES.FETCH_COMMISSARIES_SUCCESS,
    Commissary[]
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

export const fetchCommissariesSuccess = withMatcher(
    (commissariesArray: Commissary[]): FetchCommissariesSuccess =>
        createAction(CUSTOMERS_ACTION_TYPES.FETCH_COMMISSARIES_SUCCESS,
        commissariesArray
    )
)

export type UpdateCustomerStart = ActionWithPayload<
  CUSTOMERS_ACTION_TYPES.UPDATE_CUSTOMER_START,
  Customer
  >;
export type UpdateCustomerSuccess = Action<
  CUSTOMERS_ACTION_TYPES.UPDATE_CUSTOMER_SUCCESS
  >;
export type UpdateCustomerFailed = ActionWithPayload<
  CUSTOMERS_ACTION_TYPES.UPDATE_CUSTOMER_FAILED,
  Error
  >;

export const updateCustomerStart = withMatcher(
  (customerToUpdate: Customer): UpdateCustomerStart => 
    createAction(
      CUSTOMERS_ACTION_TYPES.UPDATE_CUSTOMER_START,
      customerToUpdate
    )
);

export const updateCustomerSuccess = withMatcher(
  (): UpdateCustomerSuccess =>
    createAction(CUSTOMERS_ACTION_TYPES.UPDATE_CUSTOMER_SUCCESS)
);

export const updateCustomerFailed = withMatcher(
  (error: Error): UpdateCustomerFailed =>
    createAction(
      CUSTOMERS_ACTION_TYPES.UPDATE_CUSTOMER_FAILED,
      error
    )
)