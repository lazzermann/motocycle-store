import {action} from './actions'
import {xRead} from '../model'
import {take, call, put} from 'redux-saga/effects'

export const FETCH_PRODUCTS  = 'FETCH_PRODUCTS'
export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'
export const FETCH_PRODUCT_BY_ID = 'FETCH_PRODUCT_BY_ID' 

export const fetchProducts = (data: any) => action(FETCH_PRODUCTS, data)
export const fetchProductById = (data : any) => action(FETCH_PRODUCT_BY_ID, data)
export const requestProducts = (data: any) => action(REQUEST_PRODUCTS, data)

export function* watchFetchProducts() {
    console.log('Enter while ')
    
    while(true) {
        const fetchedData = yield take(FETCH_PRODUCTS);
        const products = yield call(xRead, '/product', fetchedData); 
        yield put(requestProducts(products));
    }
}

export function* watchFetchProductById(){
    while(true){
        const fetchedProduct = yield take(FETCH_PRODUCT_BY_ID)
        console.log(fetchedProduct)
        
    }
}