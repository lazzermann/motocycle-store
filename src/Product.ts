import Review, {Reviews} from './Review';
import user, {User}  from './User'
import Category, {Categories} from './Category'
import { normalize, schema } from 'normalizr'
export default interface Product{
    _id : string,
    name : string,
    user: user,
    reviews: Array<Review>,
    category : Array<Category>,
    price : number,
    image : string,
    fuelType : string,
    description : string
}

export const Product = new schema.Entity('product',{
    user : User,
    category : [Categories],
    reviews : [Reviews]
},{
    idAttribute : '_id'
})