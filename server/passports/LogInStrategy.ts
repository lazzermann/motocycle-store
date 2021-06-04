import passportLocal from 'passport-local'

import { IContextContainer } from '../container'
import { Request, Response } from 'express'
import {asClass, asValue} from 'awilix'
import bcrypt from 'bcrypt'
import {Identity, UserRole} from '../common'
import BaseContext from '../BaseContext'
import jwt from 'jsonwebtoken'
import config from '../../config'

export default class LogInStrategy extends BaseContext {
    private strategyUser: passportLocal.Strategy

    get strategy(){
        return this.strategyUser
    }

    constructor(opts: IContextContainer){
        super(opts)

        this.verifyRequestUser = this.verifyRequestUser.bind(this)

        this.strategyUser = new passportLocal.Strategy({
            passwordField: 'password',
            passReqToCallback: true,
            usernameField: 'email',
            session: false
        }, this.verifyRequestUser)
    }

    public async verifyRequestUser(req: Request, email: string, password: string, done: any) {
        const {UserModel} = this.di
        const user = await UserModel.findOne({ 'email': email });
        let encryptedPass = bcrypt.compareSync(password, user.password)
        console.log(encryptedPass)
        
        if(encryptedPass){
            const token = jwt.sign(user.toJSON(), config.jwtSecret)

            const identity : Identity ={
                userId : user._id,
                firstName : user.firstName,
                lastName : user.lastName,
                email : user.email,
                token : token,
                role: UserRole.user
            }
            
            req.session.identity = identity
            return done(null, identity)
        }

        return done({message: 'Invalid login'})

        // if (u) {
        //      return done({ email: 'That e-mail already taken!' });
        //     console.log(u)
        //     return done(null, u)
        // }
        
        //const { firstName, lastName } = req.body;
        
        // let isRole: string = UserRole.user
       
        // const userData = {
        //     firstName: firstName,
        //     lastName: lastName,
        //     email: email && email.trim().toLowerCase(),
        //     password: password && password.trim(),
        //     role: isRole,
        // };
        
        //const newUser = new UserModel(userData);
        //const error = UserModel.validate(newUser)
        // console.log(error)
        
        // if (error) {
        //     return done(error);
        // }

        // newUser.save().then((user: any) => {
            
        //     return done(null, {
        //         _id: user._id
            
        //     });
        // })
        //     .catch((error: any) => {
        //         console.log('verifyRequestUser__catch__error', error)
        //         return done(error.errmsg);
        //     });
    }
}