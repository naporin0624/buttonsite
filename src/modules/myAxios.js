import axios from 'axios'
const urljoin = require('url-join');
const debug = process.env.NODE_ENV != 'production'
const debug_url = "http://localhost:5000"

const onSuccess = (res) => {
    if (debug) console.log(' << ' + JSON.stringify(res.data))
    return Promise.resolve(res)
}

const onError = (res) => {
    console.log(res)
    throw new Error('API error')
}

const accessUrl = (endpoint) => {
    if (debug) return urljoin(debug_url, endpoint)
    else return endpoint
}

const debugMessage = (type, url, params) => {
    console.log(type + ": " + url + '\nparams: ' + JSON.stringify(params))
}

export default {
    get: (url, params) => {
        let reqUrl = accessUrl(url)
        if (debug) debugMessage("GET", reqUrl, params)
        return axios.get(reqUrl, {
            params
        }).then(onSuccess).catch(onError)
    },
    post: (url, params) => {
        let reqUrl = accessUrl(url)
        if (debug) debugMessage("POST", reqUrl, params)
        return axios.post(reqUrl, params).then(onSuccess).catch(onError)
    },
    put: (url, params) => {
        let reqUrl = accessUrl(url)
        if (debug) debugMessage("PUT", reqUrl, params)
        return axios.put(reqUrl, params).then(onSuccess).catch(onError)
    },
    delete: (url, params) => {
        let reqUrl = accessUrl(url)
        if (debug) debugMessage("DELETE", reqUrl, params)
        return axios.delete(reqUrl, {
            data: params
        }).then(onSuccess).catch(onError)
    }
}