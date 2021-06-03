import UserService from './UserService'
import ProductService from './ProductService'
import CategoryService from './CategoryService'

import {asClass, asValue} from 'awilix'

export interface IServicesContainer{
    UserService: UserService,
    ProductService: ProductService,
    CategoryService: CategoryService
}

export default{
    UserService: asClass(UserService).singleton(),
    ProductService: asClass(ProductService).singleton(),
    CategoryService: asClass(CategoryService).singleton()
}