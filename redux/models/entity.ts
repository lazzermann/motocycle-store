import nextConfig from '../../next.config'
import { normalize, schema } from 'normalizr'
import {put, fork, call, take, select} from 'redux-saga/effects'
import {action, clearSSRData} from './actions'
import { camelizeKeys } from 'humps';

import { ISagaAction, SagaAction, } from 'server/common';
import {isEmpty} from 'src/common'

export enum HTTP_METHOD{
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE'
}

export const REQUEST_RESULT = 'REQUEST_RESULT';
export const requestResult = (entityName: string, data: any) => action(REQUEST_RESULT, { entityName, data });

export class Entity {
    protected schemaName
    protected schemaStructure
    protected schema

    private static watchers: Function[] = [];
    public static actions: ISagaAction = {}

    constructor(schemaName, schemaStructure){
        this.schemaName = schemaName
        this.schemaStructure = schemaStructure
        
        this.schema = new schema.Entity(schemaName, schemaStructure)

        // this.schema = new schema.Entity(this.schemaName,
        //     this.schemaStructure,{
        //     idAttribute : '_id'
        // })

        this.xFetch = this.xFetch.bind(this)
        this.xRead = this.xRead.bind(this)
        this.xSave = this.xSave.bind(this)
        this.actionRequest = this.actionRequest.bind(this)
    }

    public static getSagas(){
        const list = [];
        Object
            .keys(Entity.actions)
            .map(entity => 
                Object.keys(Entity.actions[entity])
                .filter(method => typeof Entity.actions[entity][method].saga == 'function')
                .map(method => 
                    list.push(Entity.actions[entity][method].saga())
                    
                )
            )
        return list;
    }

    public getTriggers(){
        const list = {};
        const entityName = this.constructor.name;
        if (entityName in Entity.actions) {
            const methods = Entity.actions[entityName];
            Object.keys(methods).map(method => {
                list[method] =Entity.actions[entityName][method].trigger;
            })
        }
        return list;
    }

    public static getWatchers(){
        return this.watchers
    }

    public static setWatchers(watchers : Array<Function>){
        this.watchers = watchers
    }

    public static addWatcher(watchers: Array<Function>) {
        Entity.setWatchers(Entity.getWatchers().concat(watchers));
    }

    public xFetch(endpoint: string, method: HTTP_METHOD, data : any){
        console.log('xFetch', endpoint, data)
        let fullUrl = nextConfig.public.BASE_URL + '/' + endpoint;

        const params: any = {
            method,
            credentials: 'include',
            headers: {
                // Authorization: 'bearer ' + token,
            },
        };

        if (method !== HTTP_METHOD.GET) {
            params['headers']['content-type'] = 'application/json';
            params['body'] = JSON.stringify(data);

        } else {
            const opts = Object.entries(data).map(([key, val]) => key + '=' + val).join('&');
            fullUrl += (opts.length > 0 ? '?' + opts : '');
        }

        let normalizedData;
        

        return fetch(fullUrl, params)
        .then((response) => {
            return response.json().then((json) => ({ json, response }));
        }).then(({ json, response }) => {
            console.log('json response', json)
            
            return Promise.resolve({
                success: response.ok ? true : false,
                response: json
            })
        }
        );

        
    }

    public * actionRequest (endpoint: string, method: HTTP_METHOD, data: any, token?: string) {
        let query = yield select((state: any) => {
            console.log('state.ssrReducer', state.ssrReducer)
        
        return state.ssrReducer && state.ssrReducer[this.schemaName] })
        
            
        console.log('actionRequest', endpoint)
        if (query && !isEmpty(query)) {
            yield put(clearSSRData({ name: this.schemaName }));
        } 

        const isServer = typeof window === 'undefined';
        if (!isServer) {
            const { response } = yield call(this.xFetch, endpoint, method, data);
            query = response.data;
        }

        if (query) {
            const schema = (Array.isArray(query) ? [this.schema] : this.schema);
            const normalizedData = normalize(camelizeKeys(JSON.parse(JSON.stringify(query))), schema);
            yield put(requestResult(this.schemaName, normalizedData));
            return { ...query };
        }
        return null;
    }
    public xRead(uri: string,  data: any = {}, method: HTTP_METHOD = HTTP_METHOD.GET){
        return this.actionRequest(uri, method, data);
    }


    public xSave(uri: string, data: any = {}, method: HTTP_METHOD = HTTP_METHOD.POST){
        console.log('xSave', uri, data)
        return this.actionRequest(uri, method, data);
    }
}
