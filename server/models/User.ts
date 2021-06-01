import mongoose from 'mongoose'
import { prop, modelOptions, getModelForClass, DocumentType, Ref } from '@typegoose/typegoose'
import prod, {Product} from './Product'

// export class UserRole{
//     @prop()
//     public admin: string

//     @prop()
//     public user: string
// }

enum UserRole{
    admin = 'admin',
    user = 'user'
}

@modelOptions({schemaOptions: {collection: 'users'}})
export class User{
    @prop(
    {
        ref: 'prod',
        foreignField: 'products',
        localField: '_id',
        justOne: false
    })
    public products?: Ref<Product>[]

    @prop()
    public email: string

    @prop()
    public firstName: string

    @prop()
    public lastName: string

    @prop({type: ()=> String, enum: Object.values(UserRole)})
    public role: string

    @prop()
    public password: string

    @prop()
    public image: string
}

export type UserType = mongoose.Model<DocumentType<User>, {}> & User
export default getModelForClass(User)