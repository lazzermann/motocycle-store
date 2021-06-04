import passportLocal from 'passport-local'
import { IContextContainer } from '../container'
import { Request, Response } from 'express'
import {UserRole} from '../common'
import BaseContext from '../BaseContext'

import {asClass, asValue} from 'awilix'

export default class SignUpStrategy extends BaseContext {
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
        console.log('verifyRequestUser')
        const {UserModel} = this.di;
        const u = await UserModel.findOne({ 'email': email });
        if (u) {
            return done({ email: 'That e-mail already taken!' });
        }
        
        const { firstName, lastName } = req.body;
        
        let isRole: string = UserRole.user
       
        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email && email.trim().toLowerCase(),
            password: password && password.trim(),
            role: isRole,
        };
        console.log('take data from body' + userData.firstName + ' ' + userData.lastName)
        console.log(userData.email)
        console.log(userData.password)
        console.log(userData.role)
        
        
        

        const newUser = new UserModel(userData);
        //const error = UserModel.validate(newUser)
        // console.log(error)
        
        // if (error) {
        //     return done(error);
        // }

        newUser.save().then((user: any) => {
            
            return done(null, {
                _id: user._id
            
            });
        })
            .catch((error: any) => {
                console.log('verifyRequestUser__catch__error', error)
                return done(error.errmsg);
            });
    }

}