import Review from './Review';
import User from './User'
import Category from './Category'
export default interface Product{
    _id : string,
    name : string,
    user: User,
    reviews: Array<Review>,
    category : Array<Category>,
    price : number,
    image : string,
    fuelType : string,
    description : string
}