import mongoose from 'mongoose'
import Product from '../../server/models/Product'
import Category from '../../server/models/Cathegory'
import { successResult, errorResult } from '../../server/server'

const productRouter = require('express').Router()

productRouter.get('/list', (req, res) => {
    const result =  Product.find({})
    .then((data) => successResult(res, data, ""))
    .catch((err) => errorResult(res, err, "Cant fetch user"))
})

productRouter.get('/:category', async (req, res) => {
    const category =  await Category.findOne({"name" : req.params.category})
    console.log(category)
    
    const result = Product.find({'category' : category}).populate('category').limit(4)
    .then(data => successResult(res, data, ""))
    .catch(err => errorResult(res, err, `${err}`)) 
})

productRouter.get('/search/:name', (req, res) =>{
    const searchedProducts = Product.find({ name: {$regex: req.params.name, $options: 'i'}})
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
    .catch(err => errorResult(res, err, "Cant put users"))
})

productRouter.delete('/delete/:id', (req, res) => {
    const result =   Product.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id))
    .then((data) => successResult(res, data, ""))
    .catch((err) => errorResult(res, err, `${err}`))
})

module.exports = productRouter