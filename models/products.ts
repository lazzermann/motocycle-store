import {action} from './actions'
import {xRead} from '../model'
import {take, call, put, select} from 'redux-saga/effects'
import {Product} from '../src/Product'
import { normalize, schema } from 'normalizr'

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
        const normalizeData = normalize(products.data, [Product])
        console.log(normalizeData)
        
        yield put(requestProducts(products));
    }
}

export function* watchFetchProductById(){
    while(true){
        const fetchedProduct = yield take(FETCH_PRODUCT_BY_ID)
        
        console.log(fetchedProduct)
        
        const prods = yield select(state => state.products)
        console.log('Prod select : ', prods, prods.find((o) => o._id !== fetchedProduct.id))
        
        const product = yield call(xRead, `/product/${fetchedProduct.id}`)
        const similarProducts = yield call(xRead, `/product/similar/${fetchedProduct.id}`)

        const normalizeData = normalize(product.data, Product)
        console.log(normalizeData)
        
        similarProducts.data.push(product.data)

        console.log('Sim prods', similarProducts)
        yield put(requestProducts(similarProducts))
    }
}