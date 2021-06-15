
import Owner, {User} from './User'
import { normalize, schema } from 'normalizr'
export default interface Review{
    _id : string,
    text : string,
    user : Owner,
    grade : number,
    image : string,
}

export const Reviews = new schema.Entity('reviews', {
    user : User
},{
    idAttribute : '_id'
})