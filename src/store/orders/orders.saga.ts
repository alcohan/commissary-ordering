import { takeLatest, all, call, put } from "typed-redux-saga";
import {  } from "../../utils/firebase/firebase.utils";
import { fetchOrdersFailed, fetchOrdersStart, fetchOrdersSuccess, updateOrderFailed, UpdateOrderStart, updateOrderSuccess } from "./orders.action";
import { Order, OrderContent, ORDERS_ACTION_TYPES } from "./orders.types";

//manually use local json data
const getLocalOrdersData = () => {
    let tempOrders = require('../../data/orders.json') as Order[];
    let tempDetails = require('../../data/orderdetails.json') as OrderContent[];

    // tempDetails.forEach( (thisItem: OrderContent) => {
    //     thisItem["Unit Price"] = thisItem["Unit Price"]* 100;
    //     thisItem["Extended Price"] = thisItem["Extended Price"]* 100;
    // })

    tempOrders.forEach(
        (thisOrder: Order) => {
            // shenanigans: get rid of symbols in subtotal to effectively multiply by 100
            // thisOrder["Subtotal"]= thisOrder["Subtotal"].replace(/[$,\.]+/g,"");
            thisOrder["Order Date"] = new Date(thisOrder["Order Date"]).toISOString();
            thisOrder["Contents"] = tempDetails.filter(
                thisItem => 
                    thisItem["Order GUID"]===thisOrder["Order GUID"] );
            return thisOrder;
        }
        )

    return tempOrders;
}

export function* fetchOrdersAsync() {
    try {
        const ordersArray = yield* call(getLocalOrdersData);
        yield* put (fetchOrdersSuccess(ordersArray));
    } catch (error) {
        yield* put (fetchOrdersFailed(error as Error));
    }
}

export function* updateOrderAsync(action:UpdateOrderStart) {
    try {
        // const result = yield* call( updateOrderDocument, "orders", action.payload );
        yield* put (fetchOrdersStart () );
        yield* put (updateOrderSuccess () );
    }
    catch (error) {
        yield* put(updateOrderFailed(error as Error));
    }
}

export function* onFetchOrders() {
    yield* takeLatest(ORDERS_ACTION_TYPES.FETCH_ORDERS_START,fetchOrdersAsync)
}

export function* onUpdateOrders() {
    yield* takeLatest(ORDERS_ACTION_TYPES.UPDATE_ORDER_START, updateOrderAsync );
}

export function* ordersSaga() {
    yield* all([call(onFetchOrders), call(onUpdateOrders)])
}