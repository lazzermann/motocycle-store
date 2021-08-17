import { Entity } from './entity'
import action from 'redux/decorators/action'
import {UserRole} from 'server/common'
import {getIdentity} from './actions'
import {call, put} from 'redux-saga/effects'
export class Identity extends Entity {
    public firstName = 'GUEST'
    public lastName = 'GUEST'
    public role = UserRole.guest

    constructor(){
        super('identity', {})
    }
    
    @action()
    public * loginUser(data){
            const { response } = yield call(this.xSave, 'auth/login', data);
            console.log('response', response)
            
            // if (response && response.user
            //     && response.user.userId
            //     && response.user.token && response.user.token.length > 0) {
                yield put(getIdentity(response));
                // set user's language
                // if (response.user.locale) {
                //     i18n.changeLanguage(response.user.locale);
                // }
                // const href = '/profile';
                // Router.push(href, href, { shallow: true });
            // }
        
    }


}


export default new Identity()


