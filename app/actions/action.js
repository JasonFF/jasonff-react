import fetch from 'isomorphic-fetch';
import {
    truck
} from 'actions';

const BASE_URL = "http://api.jasonff.top/dist/";

export function action({
    moduleName,
    body,
    url,
    config,
    method,
    goods,
    unload,
    callback
}) {
    return (dispatch) => {
        function resData (json,goods){
            let data = {
                [`${moduleName}`]: {
                    loaded: true,
                    ...json,
                    ...goods
                }
            }
            if (json instanceof Array) {
                data = {
                    [`${moduleName}`]: {
                        loaded: true,
                        items: json,
                        ...goods
                    }
                }
            }
            truck(data,`${moduleName}`)(dispatch)
            if (callback) {
                callback(json)
            }
        }
        if (unload) {
            return truck(null,`${moduleName}`,true)(dispatch)
        }
        if (method && url) {
            let cfg = {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                }
            }
            if (config) {
                cfg = Object.assign({},cfg,config)
            }
            fetch(BASE_URL+url,Object.assign({},cfg,{
                method: method,
                body: JSON.stringify(body)
            })).then(res => res.json()).then(json => resData(json,goods)).catch(ex => resData(ex,goods))
        }else {
            resData({},goods)
        }

    }
}
