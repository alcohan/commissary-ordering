import { all, call } from 'typed-redux-saga/macro';

import { productsSaga } from './products/products.saga';
import { userSagas } from './user/user.saga';
import { customersSaga } from './customers/customers.saga';

export function* rootSaga() {
    yield* all([
        call(productsSaga),
        call(customersSaga),
        call(userSagas)
    ])
}