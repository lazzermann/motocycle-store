import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import passportLocal from 'passport-local'

import { IContextContainer } from '../container'
import { Request, Response } from 'express'
import {asClass, asValue} from 'awilix'
import bcrypt from 'bcrypt'
import {IIdentity, UserRole} from '../common'
import BaseContext from '../BaseContext'
import jwt from 'jsonwebtoken'
import config from '../../config'

export default class JwtStrategy extends BaseContext {
    private _strategy: Strategy;
    private request: Request;

    get strategy() {
        return this._strategy;
    }

    constructor(opts: IContextContainer) {
        super(opts);
        console.log('jwt: initialization JWT strategy');

        this.verifyRequest = this.verifyRequest.bind(this);
        this.getJwtFromRequest = this.getJwtFromRequest.bind(this);

        this._strategy = new Strategy({
            jwtFromRequest: this.getJwtFromRequest,
            secretOrKey: config.jwtSecret,
        }, this.verifyRequest);
    }

    public async verifyRequest(jwtPayload: IIdentity, done: VerifiedCallback) {
        console.log('jwt: verifyRequest', jwtPayload);
        const user = this.di.UserService.findById(jwtPayload.id);
        if (user) {
            return  done(null, jwtPayload);
        } 
        return done('Incorrect identity');
    }

    public getJwtFromRequest(req: Request) {
        this.request = req;
        const getToken = ExtractJwt.fromAuthHeaderAsBearerToken();
        console.log('getToken', req.cookies['token'])
        
        return getToken(req) || req.cookies['token'] || null;
    }
}