import axios from 'axios';
import formUrlEncoded from 'form-urlencoded';
import {getSession} from "../session/cookies";

const request = {};

let CancelToken = axios.CancelToken;
let cancel;

request.make = (options, withToken) => {
    let _options = options || {};
    let isEnCoded = options.encode;
    let headers = {};
    let accessToken;
    _options.headers = _options.headers || {};
    headers = {
        ..._options.headers,
        'Content-Type': isEnCoded ? 'application/x-www-form-urlencoded' : 'application/json',
    }
    if (withToken) {
        accessToken = getSession('access_token');
        if (typeof accessToken === 'object') {
            request.cancel()
            alert("Access Token expired, kindly Log in again to generate a new token")
            window.location.href = '/'

        }
        headers['Authorization'] = `Bearer ${accessToken}`
    }

    const defer = new Promise(function (resolve, reject) {
        axios({
            cancelToken: new CancelToken(function executor(c) {
                cancel = c;
            }),
            url: _options.url,
            method: _options.method,
            baseURL: _options.baseURL,
            headers: headers,
            params: _options.params,
            data: isEnCoded ? formUrlEncoded(_options.data || {}) : _options.data || {}
        }).then((response) => {
                    resolve(response);
            }).catch((error) => {
                if (axios.isCancel(error)) {
                    //
                }
                if (error.response) {
                    reject(error.response)
                } else {
                    reject('ERROR_NO_RESPONSE');
                }
            })
    });

    return defer;
}

request.get = (options) => {
    options.method = 'GET';
    return request.make(options);
}

request.post = (options) => {
    options.method = 'POST';
    return request.make(options);
}

request.cancel = () => {
    cancel && cancel();
}

export default request;
