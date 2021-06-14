import nextConfig from './next.config'

export enum HTTP_METHOD{
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE'
}

// , token?:string
function xFetch(endpoint: string, method: HTTP_METHOD, data : any){
    let url = nextConfig.public.BASE_URL + endpoint

    const params: any = {
        method,
        credentials: 'include',
        headers:{
            // Authorization: 'bearer ' + token, // get token from cookies
        },
    }

    if(method !== HTTP_METHOD.GET){
        params['headers']['content-type'] = 'application/json'
        params['body'] = JSON.stringify(data)
    }
    else{
        const opts = Object.entries(data).map(([key, val]) => key + '=' + val).join('&');
        url += (opts.length > 0?'?' + opts:'');
    }

    return fetch(url, params)
        .then((res) =>{
            return res.json().then((json) =>{
                return {json, res}
            })
        })
        .then(({ json, res }) => json );
}


export function xSave(uri: string, data: any = {}, method: HTTP_METHOD = HTTP_METHOD.POST){
    return xFetch(uri, HTTP_METHOD.POST, data)
}


export function xRead(uri: string, data: any = {}, method: HTTP_METHOD = HTTP_METHOD.GET){
    return xFetch(uri, HTTP_METHOD.GET, data)
}

export function xDelete(uri: string, data: any = {}, method: HTTP_METHOD = HTTP_METHOD.DELETE){

}   