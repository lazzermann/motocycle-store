import * as awilix from 'awilix'

import services, {IServicesContainer} from './services/index'
import models, {IModelContainer} from './models/index'
import strategies, {IStrategyContainer} from './passports/index'
import passport, {PassportStatic} from 'passport'
import configCore from '../config'

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});


export interface IContextContainer extends IStrategyContainer, IModelContainer, IServicesContainer {
    config: any
    passport: PassportStatic,
}

// ???? ctx:
export const passportFunc = (ctx: IContextContainer) =>{
    passport.use('local-login',  ctx.LogInStrategy.strategy)
    passport.use('local-signup', ctx.SignUpStrategy.strategy)
    passport.use('jwt', ctx.JwtStrategy)
    return passport
}


container.register({
    config: awilix.asValue(configCore),
    passport: awilix.asFunction(passportFunc).singleton(),
    ...strategies, 
    ...models,
    ...services,
})

export default container