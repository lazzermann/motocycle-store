import { fromJS, List, Map } from 'immutable'
import { HYDRATE } from "next-redux-wrapper"
import { AnyAction, combineReducers } from "redux"
import {REQUEST_RESULT} from './models/entity'
import {FETCH_PRODUCTS, REQUEST_PRODUCTS} from './models/products'
import {isEmpty} from '../src/common'

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

const HYDRATE_ACTION = 'HYDRATE_ACTION'

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

const stateInit = fromJS({})

function entities(state = stateInit, action: any) {
    
    switch(action.type){
        case REQUEST_RESULT :{
            const { data : {entities} } = action;
            // if(entities){
            //     const newData = fromJS(action.data.entities);
            //     console.log(newData)
            //     state = isEmpty(state) ? newData: state.mergeDeep(newData);
            // }
            
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

// function isHydrate(state = true, action: any) {
//     switch (action.type) {
//     case HYDRATE_ACTION:
//         return action.value;
//     }
//     return state;
// }

// function users(state = [], action: any) {
//     return state;
// }

const appReducer = combineReducers({
    entities,
});

function rootReducer(state, action) {
    const intermediateState = appReducer(state, action);
    const finalState = nextReducer(intermediateState, action);
    return finalState;
}

export default rootReducer; 
// export default appReducer