import { AnyAction } from "redux";
import { Customer } from "./customers.types"

import {
    fetchCustomersStart,
    fetchCustomersSuccess,
    fetchCustomersFailed
} from "./customers.action"

export type CustomersState = {
    readonly customers: Customer[]
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const TEST_CUSTOMER: Customer = {
    "Store GUID": "B9A15BDB-4773-EC11-8943-000D3A35254B",
    "Store": "GB-007",
    "Store Name": "Hassalo",
    "Commissary ID": "522200001",
    "DeliveryDates": [2, 5]
}

export const CUSTOMERS_INITIAL_STATE = {
    customers: [],
    isLoading: false,
    error: null,
}

export const customersReducer = (
    state = CUSTOMERS_INITIAL_STATE,
    action: AnyAction
): CustomersState => {
    if (fetchCustomersStart.match(action)) {
        return {...state, isLoading: true };
    }
    if (fetchCustomersSuccess.match(action)) {
        return {...state, customers: action.payload, isLoading: false };
    }
    if (fetchCustomersFailed.match(action)) {
        return {...state, error: action.payload, isLoading: false };
    }
    return state;
}