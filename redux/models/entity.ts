import nextConfig from '../../next.config'
import { normalize, schema } from 'normalizr'
import {put} from 'redux-saga/effects'
import parseJSON from 'parse-json'

export enum HTTP_METHOD{
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE'
}

export class Entity {
    protected schemaName
    protected schemaStructure
    protected schema

    private static watchers: Function[] = [];
    
    constructor(schemaName, schemaStructure){
        this.schemaName = schemaName
        this.schemaStructure = schemaStructure
        
        this.schema = new schema.Entity(this.schemaName,
            this.schemaStructure,{
            idAttribute : '_id'
        })

        this.xFetch = this.xFetch.bind(this)
        this.xRead = this.xRead.bind(this)
        this.xSave = this.xRead.bind(this)
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

    public * xFetch(endpoint: string, func: Function, isNormalizeMany : boolean, method: HTTP_METHOD, data : any){
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
        
        yield fetch(fullUrl, params)
            .then((response) => {
                return response.json().then((json) => ({ json, response }));
            })

            .then(({ json, response }) => {
                normalizedData = normalize(json.data, isNormalizeMany ? [this.schema] : this.schema);
                console.log('normalized: ', normalizedData);                
            });

        yield put(func(normalizedData));   
    }

    public * xRead(uri: string, func: Function, isNormalizeMany : boolean, data: any = {}, method: HTTP_METHOD = HTTP_METHOD.GET){
        yield  this.xFetch(uri, func, isNormalizeMany, HTTP_METHOD.GET, data)
    }

    public * xSave(uri: string, func: Function, isNormalizeMany : boolean, data: any = {}, method: HTTP_METHOD = HTTP_METHOD.POST){
        yield this.xFetch(uri, func, isNormalizeMany, HTTP_METHOD.POST, data)
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