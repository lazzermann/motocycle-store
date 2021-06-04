import mongoose from 'mongoose'
import Category from '../models/Cathegory'
import { successResult, errorResult } from '../server'
import { Request, Response, NextFunction } from 'express'
import {route, GET, POST, PUT, DELETE, before} from 'awilix-express'
import BaseContext from '../BaseContext'
import statusCode from '../../http-status'
import passport from 'passport'

@route('/auth')
export default class AuthController extends BaseContext {
    
@POST()
@route('/signup')
public register(req: Request, res: Response, next: NextFunction) {
    console.log('Here')
    return this.di.passport.authenticate('local-signup', (errors, identity) => {
        if (errors) {
            console.log('register__errors=', errors);
            res.answer(null, errors, statusCode.BAD_REQUEST);
        } else if (identity) {
            res.answer([identity], 'You have successfully registered! Now you should be able to log in.');
        } else {
            console.log('register__catch__errors=', errors);
            res.answer(null, 'Could not process the form.', statusCode.BAD_REQUEST);
        }
    })(req, res, next);
}

}