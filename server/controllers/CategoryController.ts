import mongoose from 'mongoose'
import Category from '../models/Cathegory'
import { successResult, errorResult } from '../server'
import {route, GET, POST, PUT, DELETE, before} from 'awilix-express'
import BaseContext from '../BaseContext'

@route('/category')
export default class CategoryController extends BaseContext{
    @GET()
    @route('/list')
    getAllCategories(req: Request, res: Response){

    }
    @POST()
    @route('/create')
    createCategoryById(req: Request, res: Response){

    }
    @PUT()
    @route('/save')
    updateCategoryById(req: Request, res: Response){

    }
    @DELETE()
    @route('/delete/:id')
    deleteCategoryById(req: Request, res: Response){

    }
}

const categoryRouter = require('express').Router()

categoryRouter.get('/list', (req, res) => {
    const result =  Category.find({})
                        .then((data) => successResult(res, data, ""))
                        .catch((err) => errorResult(res, err, "Cant fetch categories"))
})

categoryRouter.post('/create', (req, res) =>{
    const result = Category.create(req.body)
    .then(data => successResult(res, data, ""))
    .catch(err => errorResult(res, err, "Cant create category"))
})

categoryRouter.put('/save', (req, res) => {
    const result = Category.findByIdAndUpdate(req.body._id, req.body)
    .then(data => successResult(res, data, ""))
    .catch(err => errorResult(res, err, "Cant put category"))
})

categoryRouter.delete('/delete/:id', (req, res) => {
    const result = Category.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id))
    .then(data => successResult(res, data, ""))
    .catch(err => errorResult(res, err, "Cant delete category"))
})


module.exports = categoryRouter