import * as awilix from 'awilix'

import services, {IServicesContainer} from './services/index'
import models, {IModelContainer} from './models/index'
import configCore from '../config'


const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});

export interface IContextContainer extends IModelContainer, IServicesContainer {
    config: any;
}

container.register({
    config: awilix.asValue(configCore),
    ...models,
    ...services,
})

export default container