import SignUpStrategy from './SignUpStrategy'
import LogInStrategy from './LogInStrategy'
import JwtStrategy from './JwtStrategy'

import {asClass, asValue} from 'awilix'

export interface IStrategyContainer{
    SignUpStrategy : SignUpStrategy,
    LogInStrategy  : LogInStrategy,
    JwtStrategy    : JwtStrategy
}

export default{
    SignUpStrategy: asClass(SignUpStrategy).singleton(),
    LogInStrategy : asClass(LogInStrategy).singleton(),
    JwtStrategy : asClass(JwtStrategy).singleton() 
}