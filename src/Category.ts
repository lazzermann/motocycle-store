import { normalize, schema } from 'normalizr';
export default interface Category{
    _id : string,
    name : string,
    description : string
} 

export const Categories = new schema.Entity('category',{},{
    idAttribute : '_id'
})