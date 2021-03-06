import { Entity } from './entity'
import action from 'redux/decorators/action'
import {UserRole} from 'server/common'
import {getIdentity, clearIdentity} from './actions'
import {call, put} from 'redux-saga/effects'
import { HTTP_METHOD } from 'redux/models/entity'
import  Router  from 'next/router'
export class Identity extends Entity {
    public firstName = 'GUEST'
    public lastName = 'GUEST'
    public role = UserRole.guest

    constructor(){
        super('identity', {})
    }
    
    @action()
    public * loginUser(data){
            const { response } = yield call(this.xFetch, 'auth/login', HTTP_METHOD.POST , data);
            console.log('response', response)
            
            // if (response && response.user
            //     && response.user.userId
            //     && response.user.token && response.user.token.length > 0) {
                yield put(getIdentity(response.data));
                // set user's language
                // if (response.user.locale) {
                //     i18n.changeLanguage(response.user.locale);
                // }
                // const href = '/profile';
                // Router.push(href, href, { shallow: true });
            // }
        
    }

    @action()
    public * logOutUser(data){
        document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        yield put(clearIdentity({}))
        // Router.push('/', '/', {shallow: true})
    }

    @action()
    public* saveUser(data){
        console.log('LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOL')
        yield call(this.xFetch, `auth/signup`, HTTP_METHOD.POST, data)        
        // yield put(getIdentity(response.data[0]));
    }


}


export default new Identity()


