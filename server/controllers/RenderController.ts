import mongoose from 'mongoose'
import Category from '../models/Cathegory'
import { successResult, errorResult } from '../server'
import { Request, Response } from 'express'
import {route, GET, POST, PUT, DELETE, before} from 'awilix-express'
import BaseContext from '../BaseContext'
import statusCode from '../../http-status'

@route("")
export default class RenderController extends BaseContext {

    @GET()
    @route('/')
    getHomePage(req: Request, res: Response){
        console.log('Home Page')
        
        return res.print('/')
    }

    @GET()
    @route('/products/:id')
    getProductPage(req: Request, res: Response){
        console.log('Product page')
        const pageURI = '/products/' + req.params.id
        return res.print(pageURI)
    }

    @GET()
    @route('/search/:value')
    getSearchPage(req: Request, res: Response){
        console.log('Search page')
        
        const pageURI = '/search/' + req.params.value
        return res.print(pageURI)
    }
}