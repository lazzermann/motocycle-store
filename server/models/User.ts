import mongoose from 'mongoose'
import { prop, pre, modelOptions, getModelForClass, DocumentType, Ref } from '@typegoose/typegoose'
import {Product, ProductType} from './Product'
import {WhatIsIt} from '@typegoose/typegoose/lib/internal/constants';
import bcrypt from 'bcrypt'
import {UserRole} from '../common'

@pre<User>('save', function(next){

        //this.updatedAt = Date.now()

        if(!this.isModified('password')){
            return next()
        }
    
        bcrypt.hash(this.password, 10, (hashError: Error, encrypted: string) => {
            if (hashError) {
                return next(hashError);
            }
    
            // replace a password string with hash value
            this.password = encrypted;
            return next();
    })
})

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

    @prop()
    public token: string

    // public validate(body){
    //     let mailValidate = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     if(!mailValidate.test(body.email)){
    //         return true
    //     }

    //     if(body.firstName.replace(/\s+/g, '') === '' || body.lastName.replace(/\s+/g, '') === ''){
    //         return true
    //     }

    //     if(body.password.length < 5){
    //         return true
    //     }

    //     return false
    // }
}

export type UserType = mongoose.Model<DocumentType<User>, {}> & User
export default getModelForClass(User)