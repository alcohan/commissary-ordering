export enum ORDERS_ACTION_TYPES {
    FETCH_ORDERS_START = 'customer/FETCH_ORDERS_START',
    FETCH_ORDERS_SUCCESS = 'customer/FETCH_ORDERS_SUCCESS',
    FETCH_ORDERS_FAILED = 'customer/FETCH_ORDERS_FAILED',

    UPDATE_ORDER_START = 'customer/UPDATE_ORDER_START',
    UPDATE_ORDER_FAILED = 'customer/UPDATE_ORDER_FAILED',
    UPDATE_ORDER_SUCCESS = 'customer/UPDATE_ORDER_SUCCESS',
}

export type OrderContent = {
    "LineItem GUID": "24EBB24C-351E-ED11-B83E-00224804C844",
    // "Order ID": "WA00820220818",
    "Item Name": string,
    "Qty Ordered": number,
    "Qty Final": number,
    "UnitPriceCents": number,
    "ExtendedPriceCents": number,
    "Item GUID": string,
    // "LinkedItemName": string,
    "Order GUID": string
}

export type Order = {
    "Order GUID": string,
    "Order ID": string,
    "Store": string,
    "Order Date": Date,
    "SubtotalCents": number,
    "Comment": string,
    "Store GUID": string,
    "Contents": OrderContent[],
}