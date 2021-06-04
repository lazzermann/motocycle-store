import BaseContext from "../BaseContext";
import { mongoose } from "@typegoose/typegoose";

export default class UserService extends BaseContext{
    public findAll(){
        const {UserModel} = this.di
        return UserModel.find({})
    }

    public findById(id){
        const {UserModel} = this.di
        return UserModel.findById(id)
    }

    public async save(body){
        const {UserModel} = this.di
        let user = await UserModel.findById(body._id)
        if(user){
            user.set(body)
        }
        else{
            user = new UserModel(body)
        }

        return user.save()
    }

    public delete(id){
        const {UserModel} = this.di
        return UserModel.findOneAndRemove({_id : id})
    }
}