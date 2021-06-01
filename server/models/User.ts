import mongoose from 'mongoose'
import { prop, modelOptions, getModelForClass, DocumentType, Ref } from '@typegoose/typegoose'
import {Product, ProductType} from './Product'
import {WhatIsIt} from '@typegoose/typegoose/lib/internal/constants';


export enum UserRole{
    admin = 'admin',
    user = 'user'
}

@modelOptions({schemaOptions: {collection: 'users'}})
export class User{
    // @prop(
    // {
    //     ref: 'Product',
    //     foreignField: 'user',
    //     localField: '_id',
    //     justOne: false
    // })
    // @prop({ ref: CompanySchema })
    // public company: CompanySchema;
    // public products?: Product
    
    // @prop({}, WhatIsIt.ARRAY)
    // public products?: mongoose.Types.Array<Product>;

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