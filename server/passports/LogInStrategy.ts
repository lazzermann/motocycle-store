import passportLocal from 'passport-local'

import { IContextContainer } from '../container'
import { Request, Response } from 'express'
import {asClass, asValue} from 'awilix'
import bcrypt from 'bcrypt'
import {IIdentity, UserRole} from '../common'
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
        console.log(user)

        if(user === null){
            return done({message: 'Invalid login'})
        }

        let encryptedPass = bcrypt.compareSync(password, user.password) 
        console.log("Encrypted : " +  encryptedPass)
        
        if(encryptedPass){

            const identity : IIdentity ={
                id : user._id.toString(),
                firstName : user.firstName,
                lastName : user.lastName,
                email : user.email,
                image : user.image,
                role: UserRole.user
            }
            // token : token,
            const token = jwt.sign(user.toJSON(), config.jwtSecret)
            identity['token'] = token
            req.session.identity = identity
            return done(null, identity)
        }

        return done({message: 'Invalid login'})
    }
}