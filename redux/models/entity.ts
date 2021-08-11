import nextConfig from '../../next.config'
import { normalize, schema } from 'normalizr'
import {put, call} from 'redux-saga/effects'
import {action} from './actions'
import { SagaAction } from 'server/common';

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
    private static actions: {[key: string] : SagaAction} = {}

    constructor(schemaName, schemaStructure){
        this.schemaName = schemaName
        this.schemaStructure = schemaStructure
        
        this.schema = new schema.Entity(this.schemaName,
            this.schemaStructure,{
            idAttribute : '_id'
        })

        const instanceOnly = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
        .filter(prop => prop != "constructor")

        instanceOnly.forEach((functionName, i) => { 
            this[functionName] = this[functionName].bind(this);
            Entity.addWatcher([this[functionName]]);
            console.log(functionName)
            
            Entity.actions[functionName] = {
                saga : this[functionName],
                trigger : (data: any) => action(functionName.toUpperCase(), data)
            } 

            console.log(Entity.actions)
        });

        
        

        this.xFetch = this.xFetch.bind(this)
        this.xRead = this.xRead.bind(this)
        this.xSave = this.xSave.bind(this)
        this.actionRequest = this.actionRequest.bind(this)
    }

    public static getSagas(){
        return Object
                .keys(Entity.actions)
                .map(key => Entity.actions[key].saga())
    }

    public static getTriggers(){
        const list = {}
        Object
            .keys(Entity.actions)
            .map(key => list[key] = Entity.actions[key].trigger)
        return list
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