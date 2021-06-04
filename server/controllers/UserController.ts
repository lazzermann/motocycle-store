import { successResult, errorResult } from '../server'
import {route, GET, POST, PUT, DELETE, before} from 'awilix-express'
import { Request, Response } from 'express'
import BaseContext from '../BaseContext'
import statusCode from '../../http-status'

@route('/user')
export default class UserController extends BaseContext{
    @GET()
    @route('/list')
    getAllUsers(req : Request, res : Response){
        const {UserService} = this.di
        return UserService.findAll()
        .then((data) => res.answer(data, "Success", statusCode.OK))
        .catch((err) => res.answer(null, err, statusCode.BAD_REQUEST))
    }

    @GET()
    @route('/profile/:id')
    getUserById(req : Request, res : Response){
        const {UserService} = this.di
        return UserService.findById(req.params.id)
        .then((data) => res.answer(data, "Success", statusCode.OK))
        .catch((err) => res.answer(null, err, statusCode.BAD_REQUEST))
    }

    @POST()
    @route('/save')
    createUser(req : Request, res : Response){
        const {UserService} = this.di
        return UserService.save(req.body)
        .then((data) => res.answer(data, "Success", statusCode.OK))
        .catch((err) => res.answer(null, err, statusCode.BAD_REQUEST))
    }

    @DELETE()
    @route('/delete/:id')
    deleteUserAndHisProductsById(req : Request, res : Response){
        const {UserService, ProductService} = this.di
        return UserService.delete(req.params.id)
        .then((data) => {
            ProductService.deleteByUserId(req.params.id)
            return res.answer(data, "Success", statusCode.OK)
        }
        )
        .catch((err) => res.answer(null, err, statusCode.BAD_REQUEST))
    }
}


