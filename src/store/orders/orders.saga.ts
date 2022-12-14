import { takeLatest, all, call, put } from "typed-redux-saga";
import {  } from "../../utils/firebase/firebase.utils";
import { fetchOrdersFailed, fetchOrdersStart, fetchOrdersSuccess, updateOrderFailed, UpdateOrderStart, updateOrderSuccess } from "./orders.action";
import { Order, OrderContent, ORDERS_ACTION_TYPES } from "./orders.types";

// const testOrder: Order = {
//     "Order GUID": "00EBB24C-351E-ED11-B83E-00224804C844",
//     "Order ID": "WA00820220818",
//     "Store": "WA-008",
//     "Order Date": "2022-08-18 00:00:00",
//     "Subtotal": 623.80,
//     "Comment": "",
//     "Store GUID": "8C3A3474-5F72-EC11-8943-000D3A35254B",
//     "Contents": [{
//         "Item Name": "Spicy Garlic Carrots",
//         "Qty Ordered": 2,
//         "Qty Final": 2,
//         "Unit Price": 12,
//         "Extended Price": 24,
//         "Item GUID": "0AE9F3A6-7780-EC11-8D21-002248028B68",
//       },
//       {
//         "Item Name": "SPGB",
//         "Qty Ordered": 8,
//         "Qty Final": 8,
//         "Unit Price": 12,
//         "Extended Price": 96,
//         "Item GUID": "0AE9F3A6-7780-EC11-8D21-002248028B68",
//       }
//     ]
//   }

//manually use local json data
const getLocalOrdersData = () => {
    let tempOrders = require('../../data/orders.json') as Order[];
    let tempDetails = require('../../data/orderdetails.json') as OrderContent[];

    tempOrders.forEach(thisOrder => thisOrder["Contents"] = tempDetails.filter(thisItem => thisItem["Order GUID"]===thisOrder["Order GUID"]))
    console.log(tempOrders)
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