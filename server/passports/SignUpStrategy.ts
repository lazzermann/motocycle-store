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
        const { UserModel } = this.di;
        const user = await UserModel.findOne({ email: email });
        if (user) {
            return done({ email: 'That e-mail already taken!' });
        }

        const { firstName, lastName, image } = req.body;

        const userData = {
            email: email && email.trim().toLowerCase(),
            firstName: firstName && firstName.trim(),
            lastName: lastName && lastName.trim(),
            password: password && password.trim(),
            role: "user",
            image: 'https://robohash.org/lol' + lastName.split('').reverse().join('') + firstName.split('').reverse().join(''),
        };

        const newUser = new UserModel(userData);

        newUser.save().then((user: any) => {
            return done(null, {
                id: user._id.toString(),
                email : user.email,
                firstName : user.firstName,
                lastName : user.lastName,
                password : user.password,
                role : user.role,
                image : user.image
            });
        })
        .catch((error: any) => {
            console.log('verifyRequestUser__catch__error', error)
            return done(error.errmsg);
        });
    }

}