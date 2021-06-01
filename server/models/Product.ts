import mongoose from 'mongoose'
import { prop, modelOptions, getModelForClass, DocumentType, Ref } from '@typegoose/typegoose'
import { User, UserType } from './User'
import { Category } from './Cathegory'
import { WhatIsIt } from '@typegoose/typegoose/lib/internal/constants'

export enum FuelType{
    gasoline = 'gasoline',
    diesel = 'diesel'
}
class Review{
    // @prop({
    //     required:true, 
    //     ref: ()=>'User',
    //     foreignField: 'user',
    //     localField: '_id',
    //     justOne: true
    // })

    @prop({ ref: User })
    public user: User

    @prop()
    public grade: number

    @prop()
    public text: string
}

@modelOptions({schemaOptions: {collection: 'products'}})
export class Product{
    // @prop({
    //     required:true, 
    //     ref: ()=> 'User',
    //     foreignField: 'products',
    //     localField: '_id',
    //     justOne: true
    // })
    @prop({ref: Category}, WhatIsIt.ARRAY)
    public category: mongoose.Types.Array<Category>

    @prop({ ref: User })
    public user: User

    // @prop({}, WhatIsIt.ARRAY)
    // public user?: mongoose.Types.Array<User>;

    @prop({type: ()=> Review})
    public reviews: Review[]

    @prop()
    public name: string  

    @prop()
    public price: number

    @prop({type: ()=> String, enum: Object.values(FuelType)})
    public fuelType: string 

    @prop()
    public description: string

    @prop()
    public image: string
}


export type ProductType = mongoose.Model<DocumentType<Product>, {}> & Product
export default getModelForClass(Product)