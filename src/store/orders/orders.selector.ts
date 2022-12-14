import { createSelector } from 'reselect'
import { RootState } from "../store"
import { OrdersState } from "./orders.reducer"


const selectOrdersReducer = (state: RootState): OrdersState => {
    return state.orders
}

export const selectOrders = createSelector(
    [selectOrdersReducer],
    (ordersSlice) => {return ordersSlice.orders}
)

export const selectOrdersIsLoading = createSelector(
    [selectOrdersReducer],
    (ordersSlice) => ordersSlice.isLoading
)