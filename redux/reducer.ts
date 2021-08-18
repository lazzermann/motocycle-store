import { fromJS, List, Map } from 'immutable'
import { HYDRATE } from "next-redux-wrapper"
import { AnyAction, combineReducers } from "redux"
import {REQUEST_RESULT} from './models/entity'
import {FETCH_PRODUCTS, REQUEST_PRODUCTS} from './models/products'
import {isEmpty, UserRole} from '../src/common'
import {SET_SSR_DATA, CLEAR_SSR_DATA, GET_IDENTITY, UPDATE_IDENTITY, CLEAR_IDENTITY, action} from '../redux/models/actions'
import { IIdentity } from 'server/common'
export interface AppState {
    // entities:{
    //     user : any,
    //     product : any,
    //     category : any,
    //     reviews : any
    // }

    entities: Map<string, Map<string, any>>,

    isHydrate: boolean;
    // users: any,
    // products: any,
}


const stateInit = fromJS({})


const nextReducer = (
    state: AppState,
    action: AnyAction
) => {
    switch (action.type) {
        case HYDRATE:
            // if (action.payload.app === 'init') delete action.payload.app;
            // if (action.payload.page === 'init') delete action.payload.page;
            if (action.payload.entities.size <= 0) {
                return { ...state };
            }
            return { ...state, ...action.payload };
        case 'APP':
            return { ...state, app: action.payload };
        case 'PAGE':
            return { ...state, page: action.payload };
        default:
            return state;
    }   
};

const queryInitialState: any = null;
const ssrReducer = (state = queryInitialState, action: any) => {

    switch (action.type) {
    case SET_SSR_DATA: {
        return { ...action.data };
    }
    case CLEAR_SSR_DATA: {
        if (state && (action.name in state)) {
            console.log('CLEAR SSR ');
            state[action.name] = undefined;
            return { ...state };
        }
        break;
    }
    default:
        return state;
    }
};


const initialIdentity : IIdentity = {
    firstName: 'guest',
    lastName: 'guest',
    role: UserRole.guest,
    id: 'guest',
    image: 'guest',
    email: 'guest',
    token: null
};

const identity = (state = initialIdentity, action: any) =>{
    console.log('Reducer allo', action)
    switch(action.type){
        case GET_IDENTITY :{
            console.log('GET_IDENTITY', action)
            delete(action.type)
            if(action){
                return{
                    ...state,
                    ...action 
                }
            }

            return {...state}
        }
        
        case UPDATE_IDENTITY :{
            
            console.log('UPDATE_INDENTITY allo', {...state, ...action})
            console.log('ACTION UPDATE_INDENTITY ALLO',action ? true : false)
            
            if(action){
                return{
                    ...state,
                    ...action
                }
            }
            return {
                ...state
            }
        }

        case CLEAR_IDENTITY :{
            state = initialIdentity
            return {
                ...state
            }
        }
        
        default:
            return state
        
            
    }
}


function entities(state = stateInit, action: any) {
    
    switch(action.type){
        case REQUEST_RESULT :{
            const { data : {entities} } = action;            
            if(entities){
                Object.keys(entities).map((entityName) =>{
                    let list = state.get(entityName)
                    if(list && list.size > 0){
                        Object.keys(entities[entityName]).map((id) => list = list.remove(id))
                    }

                    state = state.set(entityName, list)
                })
            
                state = state.mergeDeep(fromJS(entities))
            }

            
            return state
        }
            
        default:
            return state
    }
}

const appReducer = combineReducers({
    entities,
    ssrReducer,
    identity
});

function rootReducer(state, action) {
    const intermediateState = appReducer(state, action);
    const finalState = nextReducer(intermediateState, action);
    return finalState;
}

export default rootReducer; 
// export default appReducer