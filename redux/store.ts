import createSagaMiddleware, {Task, END} from 'redux-saga';
import config from '../config'
import {createStore, applyMiddleware, compose, Store} from 'redux';
import {createWrapper, Context, HYDRATE, MakeStore} from 'next-redux-wrapper';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export interface AppState {
    // users: any,
    // products: any,
    // reviews: any
}

export interface AnyAction{

}

const rootSaga = function* root() {
    // yield all( [] );
};

export const makeStore = (state: AppState = {users: null, products: null, reviews: null}, action: AnyAction) => {
    const sagaMiddleware = createSagaMiddleware();

    const composeEnhancers = (config.dev && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
        // @ts-ignore
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(sagaMiddleware)
    );

    const store = createStore(next, enhancer) as SagaStore;
    return store;
}
const wrapper = createWrapper<any>(makeStore)
export default wrapper