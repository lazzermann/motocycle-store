import BaseContext from "../BaseContext";

export default class CategoryService extends BaseContext{
    public findAll(){
        const {CategoryModel} = this.di
        return CategoryModel.find({})
    }

    public findId(id){
        const {CategoryModel} = this.di
        return CategoryModel.findById(id)
    }

    public async save(body){
        const {CategoryModel} = this.di
        let category = await CategoryModel.findById(body._id)
        if(category){
            category.set(body)
        }
        else{
            category = new CategoryModel(body)
        }

        return category.save()
    }

    public deleteById(id){
        const {CategoryModel} = this.di
        return CategoryModel.findOneAndRemove({_id : id})
    }
}