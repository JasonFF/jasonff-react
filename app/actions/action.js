import fetch from 'isomorphic-fetch';
import {
    truck
} from 'actions';

const BASE_URL = __DEVELOPMENT__?"http://localhost:3000/":"http://api.jasonff.top/"
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
            const data = {
                [`${moduleName}`]: {
                    loaded: true,
                    ...json,
                    ...goods
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
