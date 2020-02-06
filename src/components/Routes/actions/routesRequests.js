import request from "../../../request/request";
import api from "../../../request/endpoints";

export const saveRoute = (apiId, body) => { 
    let data = body
    let options = {
        ...api.saveRoute(apiId),
        data
    };
    return request.make(options, true)
}

export const updateRoute = (apiId, body) => { 
    let data = body
    let options = {
        ...api.updateRoute(apiId),
        data
    };
    return request.make(options, true)
}

export const getRoutes = () => {
    let options = {
        ...api.getRoutes()
    };
    return request.make(options, true)
}

export const getRoute = (apiId) => {
    let options = {
        ...api.getRoute(apiId)
    };
    return request.make(options, true)
}

export const refreshRoute = () => { 
    let options = {
        ...api.refreshRoute()
    };
    return request.make(options, true)
}

export const deleteRoute = (apiId) => { 
    let options = {
        ...api.deleteRoute(apiId)
    };
    return request.make(options, true)
}




