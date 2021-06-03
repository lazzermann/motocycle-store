import User, {UserType} from './User'
import Product, {ProductType} from './Product'
import Category, {CategoryType} from './Cathegory'
import { asValue } from 'awilix'

export interface IModelContainer {
    UserModel: UserType,
    ProductModel: ProductType,
    CategoryModel: CategoryType
}

export default{
    UserModel:     asValue(User),
    ProductModel:  asValue(Product),
    CategoryModel: asValue(Category)
}