// import {AppState, AnyAction} from './store'
import createSagaMiddleware, {Task, END} from 'redux-saga';
import config from '../config'
import {createStore, applyMiddleware, compose, Store, combineReducers} from 'redux';
import {createWrapper, Context, HYDRATE, MakeStore} from 'next-redux-wrapper';


const nextReducer = (
    state,
    action
) => {
    switch (action.type) {
    case HYDRATE:
        if (action.payload.app === 'init') delete action.payload.app;
        if (action.payload.page === 'init') delete action.payload.page;
        if (!state.isHydrate) {
            return { ...state };
        }
        return { ...state, ...action.payload, isHydrate: true  };
    case 'APP':
        return { ...state, app: action.payload };
    case 'PAGE':
        return { ...state, page: action.payload };
    default:
        return state;
    }
};

function products(state = [], action: any) {
}

function users(state = [], action: any) {
}

const appReducer = combineReducers({
    products,
    users
});

function rootReducer(state, action) {
    const intermediateState = appReducer(state, action);
    const finalState = nextReducer(intermediateState, action);
    return finalState;
}

export default rootReducer;