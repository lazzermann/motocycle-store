import {take, call } from 'redux-saga/effects'
import {Entity} from './entity'
import {User} from '../../src/User'
import action from '../decorators/action'

export class UserEntity extends Entity{
    constructor(){        
        super('user', {})
    }

    @action()
    public* saveUser(data){
        console.log('user',data)
        yield call(this.xSave, `auth/signup`, false, data)
    }

    @action()
    public* loginUser(data){
        console.log('login user', data)
        yield call(this.xSave, `auth/login`, false, data)
    }
}

const userEntity = new UserEntity()
export default userEntity