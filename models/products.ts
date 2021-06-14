import {action} from './actions'
import {xRead} from '../model'
import {take, call, put} from 'redux-saga/effects'

export const FETCH_PRODUCTS  = 'FETCH_PRODUCTS'
export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'

export const fetchProducts = (data: any) => action(FETCH_PRODUCTS, data)
export const requestProducts = (data: any) => action(REQUEST_PRODUCTS, data)

export function* watchFetchProducts() {
    console.log('Enter while ')
    
    while(true) {
        const fetchedData = yield take(FETCH_PRODUCTS);
        const products = yield call(xRead, '/product', fetchedData); 
        yield put(requestProducts(products));
    }
}