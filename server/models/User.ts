import mongoose from 'mongoose'
import { prop, modelOptions, getModelForClass, DocumentType, Ref } from '@typegoose/typegoose'
import {Product} from './Product'

export class UserRole{
    @prop()
    public admin: string

    @prop()
    public user: string
}

@modelOptions({schemaOptions: {collection: 'users'}})
export class User{
    @prop({ref: ()=> Product,
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

    @prop()
    public role: UserRole

    @prop()
    public password: string

    @prop()
    public image: string
}

export type UserType = mongoose.Model<DocumentType<User>, {}> & User
export default getModelForClass(User)