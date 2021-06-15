import { normalize, schema } from 'normalizr'
export default interface User {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    password: string;
    image: string;
}

export const User = new schema.Entity('user', {},{
    idAttribute : '_id'
})