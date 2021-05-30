import mongoose from 'mongoose'
import { prop, modelOptions, getModelForClass, DocumentType, Ref } from '@typegoose/typegoose'

@modelOptions({schemaOptions: {collection: 'testEntity'}})
export class testEntity{
    
    @prop()
    public email: string

    @prop()
    public firstName: string
}

export default getModelForClass(testEntity)