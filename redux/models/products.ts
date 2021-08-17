import {action} from './actions'
import {call } from 'redux-saga/effects'
import  {Reviews} from '../../src/Review';
import  {User}  from '../../src/User'
import  {Categories} from '../../src/Category'
import {Entity} from './entity'
import act from '../decorators/action'
import { schema } from 'normalizr';
import { SCHEMA_ENTITIES } from 'server/common';

export const FETCH_PRODUCTS  = 'FETCH_PRODUCTS'
export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'
export const FETCH_PRODUCT_BY_ID = 'FETCH_PRODUCT_BY_ID' 

export const fetchProducts = (data: any) => action(FETCH_PRODUCTS, data)
export const fetchProductById = (data: any) => action(FETCH_PRODUCT_BY_ID, data)
export const requestProducts = (data: any) => action(REQUEST_PRODUCTS, data)


export class ProductEntity extends Entity{
    constructor(){
        console.log('ProductEntity')
        
        super(SCHEMA_ENTITIES.PRODUCT, {
                user : new schema.Entity(SCHEMA_ENTITIES.USER), 
                category : [new schema.Entity(SCHEMA_ENTITIES.CATEGORY)], 
                reviews : [new schema.Entity(SCHEMA_ENTITIES.REVIEW)]})
    }

    @act()
    public * fetchProducts(data){
        yield call(this.xRead, 'product')
    }

    @act()
    public* fetchProductById(data){
        const {productId} = data
        yield call(this.xRead, `product/${productId}`)
        yield call(this.xRead, `product/similar/${productId}`)

    }
    
//     @act()
//     public* fetchSimilarProductsById(data){
//             const {productId} = data
//     }

    @act()
    public* fetchBySearch(data){
        const {searchName} = data
        yield call(this.xRead, `product/search/${searchName}`)
    }
}
const productEntity = new ProductEntity()
export default productEntity