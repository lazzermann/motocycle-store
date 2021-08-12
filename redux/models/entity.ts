import nextConfig from '../../next.config'
import { normalize, schema } from 'normalizr'
import {put, fork, call, take} from 'redux-saga/effects'
import {action} from './actions'
import { ISagaAction, SagaAction } from 'server/common';

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
        
        this.schema = new schema.Entity(this.schemaName,
            this.schemaStructure,{
            idAttribute : '_id'
        })

        // const instanceOnly = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
        // .filter(prop => prop != "constructor")

        // instanceOnly.forEach((functionName, i) => { 
        //     this[functionName] = this[functionName].bind(this);
        //     console.log(functionName);
            
        //     const func = this[functionName]

        //     const sagaFunc = function * (){
        //         while(true){
        //             const data = yield take(functionName.toUpperCase())
        //             delete(data.type)
        //             console.log(functionName.toUpperCase(),data)
        //             yield fork(func, data)
        //         }
        //     }

        //     Entity.actions[functionName] = {
        //         saga : sagaFunc,
        //         trigger : (data: any) => action(functionName.toUpperCase(), data)
        //     } 
        // });

        
        

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
        console.log('HTTP_METHOD', method)
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
        
        // yield fetch(fullUrl, params)
        //     .then((response) => {
        //         return response.json().then((json) => ({ json, response }));
        //     })

        //     .then(({ json, response }) => {
        //         normalizedData = normalize(json.data, isNormalizeMany ? [this.schema] : this.schema);
        //         console.log('normalized: ', normalizedData);                
        //     });

        return fetch(fullUrl, params)
        .then((response) => {
            return response.json().then((json) => ({ json, response }));
        }).then(({ json, response }) =>
            Promise.resolve({
                success: response.ok ? true : false,
                response: json
            })
        );

        // yield put(func(normalizedData));   
    }

    public * actionRequest (endpoint: string, isNormalizeMany : boolean, method: HTTP_METHOD, data: any, token?: string) {

        const { response } = yield call(this.xFetch, endpoint, method, data);

        const normalizedData = normalize(response.data, isNormalizeMany? [this.schema] : this.schema);
        console.log('Normalized: ', normalizedData);   
        
        yield put(requestResult(this.schemaName, normalizedData));  
        return { ...response };
    }
    public xRead(uri: string,  isNormalizeMany : boolean, data: any = {}, method: HTTP_METHOD = HTTP_METHOD.GET){
        return this.actionRequest(uri, isNormalizeMany, method, data);
    }


    public * xSave(uri: string, isNormalizeMany : boolean, data: any = {}, method: HTTP_METHOD = HTTP_METHOD.POST){
        return this.actionRequest(uri, isNormalizeMany, method, data);
    }
}


// // , token?:string
// function xFetch(endpoint: string, method: HTTP_METHOD, data : any){
//     let url = nextConfig.public.BASE_URL + endpoint

//     const params: any = {
//         method,
//         credentials: 'include',
//         headers:{
//             // Authorization: 'bearer ' + token, // get token from cookies
//         },
//     }

//     if(method !== HTTP_METHOD.GET){
//         params['headers']['content-type'] = 'application/json'
//         params['body'] = JSON.stringify(data)
//     }
//     else{
//         const opts = Object.entries(data).map(([key, val]) => key + '=' + val).join('&');
//         url += (opts.length > 0?'?' + opts:'');
//     }

//     return fetch(url, params)
//         .then((res) =>{
//             return res.json().then((json) =>{
//                 return {json, res}
//             })
//         })
//         .then(({ json, res }) => json );
// }


// export function xSave(uri: string, data: any = {}, method: HTTP_METHOD = HTTP_METHOD.POST){
//     return xFetch(uri, HTTP_METHOD.POST, data)
// }


// export function xRead(uri: string, data: any = {}, method: HTTP_METHOD = HTTP_METHOD.GET){
//     return xFetch(uri, HTTP_METHOD.GET, data)
// }

// export function xDelete(uri: string, data: any = {}, method: HTTP_METHOD = HTTP_METHOD.DELETE){

// }   