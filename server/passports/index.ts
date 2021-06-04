import SignUpStrategy from './SignUpStrategy'
import LogInStrategy from './LogInStrategy'

import {asClass, asValue} from 'awilix'

export interface IStrategyContainer{
    SignUpStrategy : SignUpStrategy,
    LogInStrategy  : LogInStrategy
}

export default{
    SignUpStrategy: asClass(SignUpStrategy).singleton(),
    LogInStrategy : asClass(LogInStrategy).singleton() 
}