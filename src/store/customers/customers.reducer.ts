import { AnyAction } from "redux";
import { Customer, Commissary } from "./customers.types"

import {
    fetchCustomersStart,
    fetchCustomersSuccess,
    fetchCustomersFailed,
    updateCustomerStart,
    updateCustomerSuccess,
    updateCustomerFailed,
    fetchCommissariesSuccess,
} from "./customers.action"

export type CustomersState = {
    readonly customers: Customer[];
    readonly commissaries: Commissary[];
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const TEST_CUSTOMER: Customer = {
    "Store GUID": "B9A15BDB-4773-EC11-8943-000D3A35254B",
    "Store Code": "GB-007",
    "Store Name": "Hassalo",
    "Commissary ID": "522200001",
    "DeliveryDates": [2, 5]
}

export const CUSTOMERS_INITIAL_STATE = {
    customers: [],
    commissaries: [],
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
    if (fetchCommissariesSuccess.match(action)) {
        return {...state, commissaries: action.payload };
    }
    if (fetchCustomersFailed.match(action)) {
        return {...state, error: action.payload, isLoading: false };
    }
    if(updateCustomerStart.match(action)){
        return{...state, isLoading: true};
    }
    if(updateCustomerSuccess.match(action)){
        return{...state, isLoading: false};
    }
    if(updateCustomerFailed.match(action)){
        return{ ...state, error: action.payload, isLoading:false};
    }
    return state;
}