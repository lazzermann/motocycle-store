import mongoose from 'mongoose'
import Product from '../models/Product'
import Category from '../models/Cathegory'
import { successResult, errorResult } from '../server'
import { Request, Response } from 'express'
import {route, GET, POST, PUT, DELETE, before} from 'awilix-express'
import BaseContext from '../BaseContext'
import statusCode from '../../http-status'

@route('/product')
export default class ProductController extends BaseContext{
    @GET()
    @route('/list')
    getAllUsers(req: Request, res: Response){
        const {ProductService} = this.di
        return ProductService.findAll()
        .then((data) => res.answer(data, "Success", statusCode.OK))
        .catch((err) => res.answer(null, err, statusCode.BAD_REQUEST))
    }

    @GET()
    @route('/:id')
    getProductByID(req: Request, res: Response){
        const {ProductService} = this.di
        return ProductService.findById(req.params.id)
        .then((data) => res.answer(data, "Success", statusCode.OK))
        .catch((err) => res.answer(null, err, statusCode.BAD_REQUEST))
    }

    @GET()
    @route('/similar/:id')
    getSimilarProductsByID(req: Request, res: Response){
        const {ProductService} = this.di
        return ProductService.findSimilar(req.params.id)
        .then((data) => res.answer(data, "Success", statusCode.OK))
        .catch((err) => res.answer(null, err, statusCode.BAD_REQUEST))
    }

    @GET()
    @route('/search/:name')
    getAllProductsByName(req: Request, res: Response){
        const {ProductService} = this.di
        return ProductService.findByName(req.params.name)
        .then((data) => res.answer(data, "Success", statusCode.OK))
        .catch((err) => res.answer(null, err, statusCode.BAD_REQUEST))
    }

    @POST()
    @route('/save')
    updateProductById(req: Request, res: Response){
        const {ProductService} = this.di
        return ProductService.save(req.body)
        .then((data) => res.answer(data, "Success", statusCode.OK))
        .catch((err) => res.answer(null, err, statusCode.BAD_REQUEST))
    }

    @GET()
    @route('/')
    getProductToIndexPage(req: Request, res: Response){
        const {ProductService} = this.di
        return ProductService.getTheMostExpensive()
        .then((data) => res.answer(data, "Success", statusCode.OK))
        .catch((err) => res.answer(null, err, statusCode.BAD_REQUEST))
    }

    @DELETE()
    @route('/delete')
    deleteProductById(req: Request, res: Response){
        const {ProductService} = this.di
        return ProductService.delete(req.body._id)
        .then((data) => res.answer(data, "Success", statusCode.OK))
        .catch((err) => res.answer(null, err, statusCode.BAD_REQUEST))
    }

}