import {take, call } from 'redux-saga/effects'
import {Entity} from './entity'
import {User} from '../../src/User'
import action from '../decorators/action'
import { schema } from 'normalizr';
import { SCHEMA_ENTITIES } from 'server/common';


export class UserEntity extends Entity{
    constructor(){        
        super(SCHEMA_ENTITIES.USER, {})
    }

    @action()
    

    @action()
    public* loginUser(data){
        console.log('login user', data)
        yield call(this.xSave, `auth/login`, data)
    }
}

const userEntity = new UserEntity()
export default userEntity