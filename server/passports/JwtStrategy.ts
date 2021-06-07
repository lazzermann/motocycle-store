import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import passportLocal from 'passport-local'

import { IContextContainer } from '../container'
import { Request, Response } from 'express'
import {asClass, asValue} from 'awilix'
import bcrypt from 'bcrypt'
import {Identity, UserRole} from '../common'
import BaseContext from '../BaseContext'
import jwt from 'jsonwebtoken'
import config from '../../config'

export default class JwtStrategy extends BaseContext {
    private StrategyUser : passportLocal.Strategy
    private request : Request

constructor(opts: IContextContainer) {
        super(opts);
        console.log('jwt: initialization JWT strategy');

        this.verifyRequest = this.verifyRequest.bind(this);
        this.getJwtFromRequest = this.getJwtFromRequest.bind(this);

        this.StrategyUser = new Strategy({
            jwtFromRequest: this.getJwtFromRequest,
            secretOrKey   : config.jwtSecret,
        }, this.verifyRequest);
    }

public async verifyRequest(jwtPayload: any, done: VerifiedCallback) {
}

 public getJwtFromRequest(req: Request) {
        this.request = req;
        const getToken = ExtractJwt.fromAuthHeaderAsBearerToken();
        return  getToken(req) || req.cookies['token'] || null;
    }
}