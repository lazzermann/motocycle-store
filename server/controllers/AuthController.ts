import { Request, Response, NextFunction } from 'express'
import {route, GET, POST, PUT, DELETE, before} from 'awilix-express'
import {Identity} from '../common'
import BaseContext from '../BaseContext'
import statusCode from '../../http-status'

@route('/auth')
export default class AuthController extends BaseContext {
    
@POST()
@route('/signup')
public register(req: Request, res: Response, next: NextFunction) {
    console.log('Hello from UserEntity')
    
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

@POST()
@route('/login')
public login(req: Request, res: Response, next: NextFunction){
    const JST_EXPIRE = 3
    const REMEMBER_ME_EXPIRE = 30
    return this.di.passport.authenticate('local-login', (err, identity: Identity) => {
        if (err) {
            return res.answer(null, err, statusCode.BAD_REQUEST);
        }
        let expire = JST_EXPIRE;
        if (req.body.rememberMe) {
            expire = REMEMBER_ME_EXPIRE;
        }
        res.cookie('token', identity.token, { maxAge: 1000 * 60 * 60 * 24 * expire });
        return res.answer(identity);
    })(req, res, next);
}

}