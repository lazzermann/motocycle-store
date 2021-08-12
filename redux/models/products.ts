import {action} from './actions'
import {take, call } from 'redux-saga/effects'
import  {Reviews} from '../../src/Review';
import  {User}  from '../../src/User'
import  {Categories} from '../../src/Category'
import {Entity} from './entity'
import Action from '../decorators/action'

export const FETCH_PRODUCTS  = 'FETCH_PRODUCTS'
export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'
export const FETCH_PRODUCT_BY_ID = 'FETCH_PRODUCT_BY_ID' 

export const fetchProducts = (data: any) => action(FETCH_PRODUCTS, data)
export const fetchProductById = (data: any) => action(FETCH_PRODUCT_BY_ID, data)
export const requestProducts = (data: any) => action(REQUEST_PRODUCTS, data)


export class ProductEntity extends Entity{
    constructor(){
        console.log('ProductEntity')
        
        super('product', {user : User, category : [Categories], reviews : [Reviews]})
    }

    @Action()
    public * fetchProducts(data){
            yield call(this.xRead, 'product', true)
    }

    @Action()
    public* fetchProductById(data){
            const {productId} = data
            yield call(this.xRead, `product/${productId}`, false)
            yield call(this.xRead, `product/similar/${productId}`, true)
    }
}
const productEntity = new ProductEntity()
export default productEntity