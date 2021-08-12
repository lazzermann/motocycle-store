import {action} from './actions'
import {take, call } from 'redux-saga/effects'
import  {Reviews} from '../../src/Review';
import  {User}  from '../../src/User'
import  {Categories} from '../../src/Category'
import {Entity} from './entity'
import Action from '../decorators/action'

export class UserEntity extends Entity{
    constructor(){
        console.log('UserEntity')
        
        super('user', {})
    }

    @Action()
    public* saveUser(data){
        console.log('user',data)
        yield call(this.xSave, `auth/signup`, false, data)
    }
}

const userEntity = new UserEntity()
export default userEntity