import Product from "pages/product";
import BaseContext from "../BaseContext";

export default class ProductService extends BaseContext{
    public findAll(){
        const {ProductModel} = this.di
        return ProductModel.find({}).populate('reviews.user')
    }

    public getTheMostExpensive(){
        const {ProductModel} = this.di
        return ProductModel.find({}).sort({price : -1}).limit(6)
    }

    public async findByCategory(categoryName){
        const {ProductModel, CategoryModel} = this.di
        const selectedCategory = await CategoryModel.findOne({name : categoryName})
        return ProductModel.find({category : selectedCategory})
    }

    public findByName(alias){
        const {ProductModel} = this.di
        return ProductModel.find({ name: {$regex: alias, $options: 'i'}})
    }

    public async save(body){
        const {ProductModel} = this.di
        let product = await ProductModel.findById(body._id)
        if(product){
            product.set(body)
        } 
        else{
            product = new ProductModel(body)
        }

        return product.save()
    }

    public delete(id){
        const {ProductModel} = this.di
        return ProductModel.findOneAndRemove({_id : id})
    }

    public async deleteByUserId(id){
        const {ProductModel} = this.di
        return await ProductModel.find({user: id}).remove()
    }

    
}