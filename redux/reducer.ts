import { fromJS, List, Map } from 'immutable'
import { HYDRATE } from "next-redux-wrapper"
import { AnyAction, combineReducers } from "redux"

import {FETCH_PRODUCTS, REQUEST_PRODUCTS} from './models/products'

export interface AppState {
    users: any,
    products: any,
}

const nextReducer = (
    state: AppState,
    action: AnyAction
) => {
    switch (action.type) {
        case HYDRATE:
            if (action.payload.app === 'init') delete action.payload.app;
            if (action.payload.page === 'init') delete action.payload.page;
            return {...state, ...action.payload};
        case 'APP':
            return {...state, app: action.payload};
        case 'PAGE':
            return {...state, page: action.payload};
        default:
            return state;
    }   
};

const stateInit = fromJS({})

function entities(state = stateInit, action: any) {
    
    switch(action.type){
        case REQUEST_PRODUCTS:{
            const data = JSON.parse(JSON.stringify(action.entities));
            console.log('action data', data)
            
            return data
        }
            
        default:
            return state
    }
}

// function users(state = [], action: any) {
//     return state;
// }

// const appReducer = combineReducers({
//     products,
//     users
// });

function rootReducer(state, action) {
    const intermediateState = entities(state, action);
    const finalState = nextReducer(intermediateState, action);
    return finalState;
}

export default rootReducer; 