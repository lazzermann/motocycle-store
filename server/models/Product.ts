import mongoose from 'mongoose'
import { prop, modelOptions, getModelForClass, DocumentType, Ref } from '@typegoose/typegoose'
import { User } from './User'

class FuelType{
    @prop()
    public gasoline: string

    @prop()
    public diesel: string
}

class Review{
    @prop({required:true, ref: ()=>User})
    public user?: Ref<User>

    @prop()
    public grade: number

    @prop()
    public text: string
}

@modelOptions({schemaOptions: {collection: 'products'}})
export class Product{
    @prop({required:true, ref: ()=> User})
    public user?: Ref<User>

    @prop({type: ()=> Review})
    public reviews: Review[]

    @prop()
    public name: string  

    @prop()
    public price: number

    @prop()
    public fuelType: FuelType 

    @prop()
    public description: string

    @prop()
    public image: string
}


export type ProductType = mongoose.Model<DocumentType<Product>, {}> & Product
export default getModelForClass(Product)