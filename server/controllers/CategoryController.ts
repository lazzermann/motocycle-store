import mongoose from 'mongoose'
import Category from '../models/Cathegory'
import { successResult, errorResult } from '../server'
import { Request, Response } from 'express'
import {route, GET, POST, PUT, DELETE, before} from 'awilix-express'
import BaseContext from '../BaseContext'
import statusCode from '../../http-status'

@route('/category')
export default class CategoryController extends BaseContext{
    @GET()
    @route('/list')
    getAllCategories(req: Request, res: Response){
        const {CategoryService} = this.di
        return CategoryService.findAll()
        .then((data) => res.answer(data, "Success", statusCode.OK))
        .catch((err) => res.answer(null, err, statusCode.BAD_REQUEST))
    }

    @GET()
    @route('/:id')
    getCategoryById(req: Request, res: Response){
        const {CategoryService} = this.di
        return CategoryService.findId(req.params.id)
        .then((data) => res.answer(data, "Success", statusCode.OK))
        .catch((err) => res.answer(null, err, statusCode.BAD_REQUEST))
    }

    @POST()
    @route('/save')
    updateCategoryById(req: Request, res: Response){
        const {CategoryService} = this.di
        return CategoryService.save(req.body)
        .then((data) => res.answer(data, "Success", statusCode.OK))
        .catch((err) => res.answer(null, err, statusCode.BAD_REQUEST))
    }
    @DELETE()
    @route('/delete/:id')
    deleteCategoryById(req: Request, res: Response){
        const {CategoryService} = this.di
        return CategoryService.deleteById(req.params.id)
        .then((data) => res.answer(data, "Success", statusCode.OK))
        .catch((err) => res.answer(null, err, statusCode.BAD_REQUEST))
    }
}