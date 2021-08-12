import {Entity} from '../models/entity';
import { fork, take } from 'redux-saga/effects';

const saga = (entity: Entity = null) => (constructor: Function = null) =>{
    const entityName = entity.constructor.name;
    if (entityName in Entity.actions) {
        const methods = Entity.actions[entityName];
        Object.keys(methods).map(method => {
            const func = entity[method].bind(entity);
            const sagaFunc = function * () {
                while (true) {
                    const data = yield take(method.toUpperCase());
                    delete(data.type);
                    yield fork(func, data);
                }
            };
            Entity.actions[entityName][method].saga = sagaFunc;
        })
    }
}

export default saga