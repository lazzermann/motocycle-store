import { Entity } from './entity'
import action from 'redux/decorators/action'
import {UserRole} from 'server/common'
import {getIdentity} from './actions'
import {call, put} from 'redux-saga/effects'
import { HTTP_METHOD } from 'redux/models/entity'
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
    public* saveUser(data){
        console.log('user',data)
        const {response} = yield call(this.xFetch, `auth/signup`, HTTP_METHOD.POST, data)
        console.log('Save user', response)
        
        // yield put(getIdentity(response.data[0]));
    }


}


export default new Identity()


