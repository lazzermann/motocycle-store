import { Request, Response, NextFunction } from 'express'
import {route, GET, POST, PUT, DELETE, before} from 'awilix-express'
import {IIdentity} from '../common'
import BaseContext from '../BaseContext'
import statusCode from '../../http-status'

@route('/auth')
export default class AuthController extends BaseContext {
    
@POST()
@route('/signup')
public register(req: Request, res: Response, next: NextFunction) {    
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
    const { passport } = this.di;
        const JST_EXPIRE = 3;
        const REMEMBER_ME_EXPIRE = 30;

        return passport.authenticate('local-login', (err, identity: IIdentity) => {
            if (err) {
                return res.answer(null, err, statusCode.BAD_REQUEST);
            }

            res.cookie('token', identity.token, { maxAge: 1000606024 });
            return res.answer(identity);
        })(req, res, next);
}

@POST()
    @route('/')
    public jwt(req: Request, res: Response, next: NextFunction) {
        const {passport} = this.di
        return passport.authenticate('jwt', (err, identity: IIdentity) => {
            const isLogged = identity && identity.id ;
            console.log('acl identity', identity);
            req.identity = identity;
            if (!isLogged) {
                //identity = clearIdentity()

                req.session.identity = identity;
            }

            const isAllow = undefined
            if (!isAllow) {
                return res.answer(null, statusCode['404_MESSAGE'], statusCode.NOT_FOUND)
            }
        })
    }

}