import { createSelector } from 'reselect'
import { RootState } from "../store"
import { CustomersState } from "./customers.reducer"


const selectCustomersReducer = (state: RootState): CustomersState => {
    return state.customers
}

export const selectCustomers = createSelector(
    [selectCustomersReducer],
    (customersSlice) => {return customersSlice.customers}
)

export const selectCustomersIsLoading = createSelector(
    [selectCustomersReducer],
    (customersSlice) => customersSlice.isLoading
)