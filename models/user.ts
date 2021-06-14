import {action} from './actions'
import {xRead} from '../model'
import {take, call, put} from 'redux-saga/effects'

export const FETCH_USER  = 'FETCH_USER'
export const REQUEST_USER = 'REQUEST_USER'

export const fetchUser = (data: any) => action(FETCH_USER, data)
export const requestUser = (data: any) => action(REQUEST_USER, data)

export function* watchFetchUser() {
    while(true) {
        // const fetchedData = yield take(FETCH_USER);
        // const data = yield call(xRead, { 
        //     user_id: fetchedData.id
        // }); 
        // put(requestUser(data));
    }
}