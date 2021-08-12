import {action} from './actions'
import {take, call } from 'redux-saga/effects'
import  {Reviews} from '../../src/Review';
import  {User}  from '../../src/User'
import  {Categories} from '../../src/Category'
import {Entity} from './entity'

export const FETCH_PRODUCTS  = 'FETCH_PRODUCTS'
export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'
export const FETCH_PRODUCT_BY_ID = 'FETCH_PRODUCT_BY_ID' 

export const fetchProducts = (data: any) => action(FETCH_PRODUCTS, data)
export const fetchProductById = (data: any) => action(FETCH_PRODUCT_BY_ID, data)
export const requestProducts = (data: any) => action(REQUEST_PRODUCTS, data)

export class ProductEntity extends Entity{
    constructor(){
        super('product', {user : User, category : [Categories], reviews : [Reviews]})
    }

    public * fetchProducts(data){
            yield call(this.xRead, 'product', true)
    }


    public* fetchProductById(data){
            const {productId} = data
            console.log('productId', productId) 
            yield call(this.xRead, `product/${productId}`, false)
            yield call(this.xRead, `product/similar/${productId}`, true)
    }
}


// export function* watchFetchProducts() {
//     console.log('Enter while ')
    
//     // while(true) {
//     //     const fetchedData = yield take(FETCH_PRODUCTS);
//     //     const products = yield call(this.xRead, requestProducts, '/product', fetchedData); 
//     // }
// }

// export function* watchFetchProductById(){
//     while(true){
//         const fetchedProduct = yield take(FETCH_PRODUCT_BY_ID)
        
//         console.log(fetchedProduct)
        
//         const prods = yield select(state => state.products)
//         console.log('Prod select : ', prods, prods.find((o) => o._id !== fetchedProduct.id))
        
//         const product = yield call(xRead, `/product/${fetchedProduct.id}`)
//         const similarProducts = yield call(xRead, `/product/similar/${fetchedProduct.id}`)

//         const normalizeData = normalize(product.data, Product)
//         console.log(normalizeData)
        
//         similarProducts.data.push(product.data)

//         console.log('Sim prods', normalizeData)
//         yield put(requestProducts(normalizeData))
//     }
// }

// const productEntity = new ProductEntity()
// let staticProperties = Object.getOwnPropertyNames(ProductEntity.prototype)
//                             .filter(prop => typeof productEntity[prop] === "function" && prop !== "constructor")
//                             .map(prop => productEntity[prop].bind(productEntity))
// console.log('staticProperties',staticProperties)
// Entity.addWatcher(staticProperties)

// staticProperties.forEach(prop => console.log(prop))


export default new ProductEntity()