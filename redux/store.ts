import createSagaMiddleware, { Task, END } from 'redux-saga'
import { all } from 'redux-saga/effects'
import nextConfig from 'next.config'
import { createStore, applyMiddleware, compose, Store, AnyAction } from 'redux';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import next from 'next';
import { AppState } from './reducer';
import rootReducer from './reducer';

// import {watchFetchUser} from '../actions/user'
import { watchFetchProducts, watchFetchProductById } from '../models/products'

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const rootSaga = function* root() {
    yield all([
        watchFetchProducts(),
        watchFetchProductById()
    ]);
};

export interface SagaStore extends Store {
    sagaTask?: Task;
    runSaga: () => void;
}

export const makeStore: MakeStore<AppState> = () => {
    const sagaMiddleware = createSagaMiddleware();

    const composeEnhancers = (nextConfig.public.IS_DEV && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
        // @ts-ignore
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(sagaMiddleware)
        // other store enhancers if any
    );

    const store = createStore(rootReducer, enhancer) as SagaStore;
    store.sagaTask = sagaMiddleware.run(rootSaga);
    // Entity.store = store;
    store.runSaga = () => sagaMiddleware.run(rootSaga);
    return store;
};


const wrapper = createWrapper<AppState>(makeStore);
export default wrapper;