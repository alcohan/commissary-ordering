export enum CUSTOMERS_ACTION_TYPES {
    FETCH_CUSTOMERS_START = 'customer/FETCH_CUSTOMERS_START',
    FETCH_CUSTOMERS_SUCCESS = 'customer/FETCH_CUSTOMERS_SUCCESS',
    FETCH_CUSTOMERS_FAILED = 'customer/FETCH_CUSTOMERS_FAILED',
    FETCH_COMMISSARIES_SUCCESS = 'customer/FETCH_COMMISSARIES_SUCCESS',

    UPDATE_CUSTOMER_START = 'customer/UPDATE_CUSTOMER_START',
    UPDATE_CUSTOMER_FAILED = 'customer/UPDATE_CUSTOMER_FAILED',
    UPDATE_CUSTOMER_SUCCESS = 'customer/UPDATE_CUSTOMER_SUCCESS',
}

export type Commissary = {
    "ID": string,
    "Code": string,
    "Name": string
}

export type Customer = {
    "Store GUID": string,
    "Store Code": string,
    "Store Name": string,
    "Commissary ID": string,
    "DeliveryDates": number[]
}