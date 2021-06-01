import mongoose from 'mongoose'
import { prop, modelOptions, getModelForClass, DocumentType, Ref } from '@typegoose/typegoose'
import use, { User } from './User'

// class FuelType{
//     @prop()
//     public gasoline: string

//     @prop()
//     public diesel: string
// }

enum FuelType{
    gasoline = 'gasoline',
    diesel = 'diesel'
}
class Review{
    @prop({
        required:true, 
        ref: ()=>'use',
        foreignField: 'user',
        localField: '_id',
        justOne: true
    })
    public user?: Ref<User>

    @prop()
    public grade: number

    @prop()
    public text: string
}

@modelOptions({schemaOptions: {collection: 'products'}})
export class Product{
    @prop({
        required:true, 
        ref: ()=> 'use',
        foreignField: 'user',
        localField: '_id',
        justOne: true
    })
    public user?: Ref<User>

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