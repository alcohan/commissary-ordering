import { takeLatest, all, call, put } from "typed-redux-saga";
import { fetchCustomersFailed, fetchCustomersSuccess } from "./customers.action";
import { Customer, CUSTOMERS_ACTION_TYPES } from "./customers.types";


//manually use local json data
const getLocalCustomersData = () => {
    let customers: Customer[] = require('../../data/stores.json');
    return customers;
}

export function* fetchCustomersAsync() {
    try {
        const customersArray = yield* call(getLocalCustomersData);
        yield* put (fetchCustomersSuccess(customersArray));
    } catch (error) {
        yield* put (fetchCustomersFailed(error as Error));
    }
}

export function* onFetchCustomers() {
    yield* takeLatest(CUSTOMERS_ACTION_TYPES.FETCH_CUSTOMERS_START,fetchCustomersAsync)
}

export function* customersSaga() {
    yield* all([call(onFetchCustomers)])
}