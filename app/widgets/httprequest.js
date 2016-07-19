import fetch from 'isomorphic-fetch';

const rootUrl = 'http://api.jasonff.top/';

let commonFetch = (method, url, parameters, version, options)=> {
    const urlPath = String(url);
    let paraString = '';
    for (let key in parameters) {
        let value = parameters[key];
        if (typeof value === 'object' || Array.isArray(value)) {
            value = JSON.stringify(value);
        }

        let item = key + '=' + value;
        if (paraString.length == 0) {
            paraString = paraString + item;
        } else {
            paraString = paraString + '&' + item;
        }
    }
    if (paraString.length != 0) {
        url = url + '?' + paraString;
    }
    let wholeUrl = encodeURI(rootUrl + url);

    if (options != null) return fetch(rootUrl + urlPath, options);

    let newOptions = ((version == null) ? {
        headers: {
             "X-Requested-With":"XMLHttpRequest"
        }
    } : {
        headers: {
            'Accept': 'application/vnd.souban-v' + version + '+json',
            'Content-Type': 'application/json'
        }
    });
    if (method === 'get') {
        newOptions.method = 'get';
        return fetch(wholeUrl, newOptions);
    }
    if (method === 'post') {
        newOptions.method = 'post';
        let form = new FormData();
        for (let key in parameters) {
            let value = parameters[key];
            if (typeof value === 'object' || Array.isArray(value)) {
                value = JSON.stringify(value);
            }
            form.append(key,value);
        }
        newOptions.body = form;
        return fetch(rootUrl+urlPath, newOptions);
    }
    if (method === 'put') {
        newOptions.method = 'put';
        let form = new FormData();
        for (let key in parameters) {
            let value = parameters[key];
            if (typeof value === 'object' || Array.isArray(value)) {
                value = JSON.stringify(value);
            }
            form.append(key,value);
        }
        newOptions.body = form;
        return fetch(rootUrl+urlPath, newOptions);
    }
    if (method === 'delete') {
        newOptions.method = 'delete';
        let form = new FormData();
        for (let key in parameters) {
            let value = parameters[key];
            if (typeof value === 'object' || Array.isArray(value)) {
                value = JSON.stringify(value);
            }
            form.append(key,value);
        }
        newOptions.body = form;
        return fetch(rootUrl+urlPath, newOptions);
    }

    return fetch(rootUrl + urlPath, options);
};

export let fetchGet = (url, parameters, version) => {
    return commonFetch('get', url, parameters, version);
};

export let fetchPost = (url, parameters, version) => {
    return commonFetch('post', url, parameters, version);
};

export let fetchPut = (url, parameters, version) => {
    return commonFetch('put', url, parameters, version);
};

export let fetchDelete = (url, parameters, version) => {
    return commonFetch('delete', url, parameters, version);
};
