import BaseContext from "../BaseContext";

export default class ProductService extends BaseContext{
    public findAll(){
        const {ProductModel} = this.di
        return ProductModel.find({}).populate('reviews.user')
    }

    public findById(id){
        const {ProductModel} = this.di
        return ProductModel.findById(id)
        .populate('category')
        .populate('reviews.user')
    }

    public async findSimilar(id){
        const {ProductModel} = this.di
        const productByID = await this.findById(id)
        console.log('Server prod by id select', productByID)
        console.log('');
        
        // {price : {"$gte" : productByID.price, "$lte" : (productByID.price + 200)}}

        return ProductModel.find({})
        .where('fuelType', productByID.fuelType)
        .sort({price : -1})
        .limit(3)
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