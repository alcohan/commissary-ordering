import { takeLatest, all, call, put } from "typed-redux-saga";
import { getFirebaseDocuments, updateCustomerDocument } from "../../utils/firebase/firebase.utils";
import { fetchCommissariesSuccess, fetchCustomersFailed, fetchCustomersStart, fetchCustomersSuccess, updateCustomerFailed, UpdateCustomerStart, updateCustomerSuccess } from "./customers.action";
import { Customer, Commissary, CUSTOMERS_ACTION_TYPES } from "./customers.types";


//manually use local json data
// const getLocalCustomersData = () => {
//     let customers: Customer[] = require('../../data/stores.json');
//     return customers;
// }
// const getLocalCommissaryData = () => {
//     let commissaries: Commissary[] = require('../../data/commissaries.json');
//     return commissaries;
// }

export function* fetchCustomersAsync() {
    try {
        const customersArray = yield* call(getFirebaseDocuments<Customer>,"customers");
        const commissariesArray = yield* call(getFirebaseDocuments<Commissary>,"commissaries");
        yield* put (fetchCommissariesSuccess(commissariesArray));
        yield* put (fetchCustomersSuccess(customersArray));
    } catch (error) {
        yield* put (fetchCustomersFailed(error as Error));
    }
}

export function* updateCustomerAsync(action:UpdateCustomerStart) {
    try {
        const result = yield* call( updateCustomerDocument, "customers", action.payload );
        yield* put (fetchCustomersStart () );
        yield* put (updateCustomerSuccess () );
    }
    catch (error) {
        yield* put(updateCustomerFailed(error as Error));
    }
}

export function* onFetchCustomers() {
    yield* takeLatest(CUSTOMERS_ACTION_TYPES.FETCH_CUSTOMERS_START,fetchCustomersAsync)
}

export function* onUpdateCustomers() {
    yield* takeLatest(CUSTOMERS_ACTION_TYPES.UPDATE_CUSTOMER_START, updateCustomerAsync );
}

export function* customersSaga() {
    yield* all([call(onFetchCustomers), call(onUpdateCustomers)])
}