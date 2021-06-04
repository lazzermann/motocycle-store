import SignUpStrategy from './SignUpStrategy'

import {asClass, asValue} from 'awilix'

export interface IStrategyContainer{
    SignUpStrategy : SignUpStrategy
}

export default{
    SignUpStrategy: asClass(SignUpStrategy).singleton()
}