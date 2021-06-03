import mongoose from 'mongoose'
import Product from '../models/Product'
import Category from '../models/Cathegory'
import { successResult, errorResult } from '../server'
import {route, GET, POST, PUT, DELETE, before} from 'awilix-express'
import BaseContext from '../BaseContext'

@route('/product')
export default class ProductController extends BaseContext{
    @GET()
    @route('/list')
    getAllUsers(req: Request, res: Response){

    }

    @GET()
    @route('/:category')
    getAllProductsByCategory(req: Request, res: Response){

    }

    @GET()
    @route('/search/:name')
    getAllProductsByName(req: Request, res: Response){

    }

    @POST()
    @route('/create')
    createProduct(req: Request, res: Response){

    }

    @PUT()
    @route('/save')
    updateProductById(req: Request, res: Response){

    }

    @DELETE()
    @route('/delete')
    deleteProductById(req: Request, res: Response){
    
    }

}

const productRouter = require('express').Router()

productRouter.get('/list', (req, res) => {
    const result =  Product.find({})
    .then((data) => successResult(res, data, ""))
    .catch((err) => errorResult(res, err, "Cant fetch user"))
})

productRouter.get('/:category', async (req, res) => {
    const category =  await Category.findOne({"name" : req.params.category})
    
    const result = Product.find({'category' : category}).sort('price').populate('category').limit(4)
    .then(data => successResult(res, data, ""))
    .catch(err => errorResult(res, err, `${err}`)) 
})

productRouter.get('/search/:name', (req, res) =>{
    const result = Product.find({ name: {$regex: req.params.name, $options: 'i'}})
    .then(data => successResult(res, data, ""))
    .catch(err => errorResult(res, err, `${err}`))
})

productRouter.post('/create', (req, res) =>{
    const result = Product.create(req.body)
    .then((data) => successResult(res, data, ""))
    .catch((err) => errorResult(res, err, `${err}`))
})

productRouter.put('/save',  (req, res) => {
    let doc = Product.findByIdAndUpdate(req.body._id, req.body)
    .then(data => successResult(res, data, ""))
    .catch(err => errorResult(res, err, "Cant update product"))
})

productRouter.delete('/delete/:id', (req, res) => {
    const result =   Product.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id))
    .then((data) => successResult(res, data, ""))
    .catch((err) => errorResult(res, err, `${err}`))
})

module.exports = productRouter