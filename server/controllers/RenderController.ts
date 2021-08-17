import mongoose from 'mongoose'
import Category from '../models/Cathegory'
import { successResult, errorResult } from '../server'
import { Request, Response } from 'express'
import {route, GET, POST, PUT, DELETE, before} from 'awilix-express'
import BaseContext from '../BaseContext'
import statusCode from '../../http-status'
import {ENTITIES, SCHEMA_ENTITIES} from '../common'

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
        console.log('Product page', req.params.id)
        
        const {ProductService} = this.di
        return Promise.all([
            ProductService.findById(req.params.id).lean(),
            ProductService.findSimilar(req.params.id)
        ]).then(values => {
            console.log('values', values)
            
            values[1].push(values[0])
            return res.print('/products/' + req.params.id, { 
                [SCHEMA_ENTITIES.PRODUCT]: values[1],
            });

        })
        .catch((err: any) => {
            console.error('RenderController.product()', err);
        });
        
    }

    @GET()
    @route('/search/:value')
    getSearchPage(req: Request, res: Response){
        console.log('Search page')
        
        const pageURI = '/search/' + req.params.value
        return res.print(pageURI)
    }
}