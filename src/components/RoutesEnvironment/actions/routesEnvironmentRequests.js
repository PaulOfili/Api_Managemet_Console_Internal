import request from "../../../request/request";
import api from "../../../request/endpoints";

export const saveRouteEnvironment = (body) => { 
    let data = body
    let options = {
        ...api.saveRouteEnvironment(),
        data
    };
    return request.make(options, true)
}

export const updateRouteEnvironment = (body) => { 
    let data = body
    let options = {
        ...api.updateRouteEnvironment(),
        data
    };
    return request.make(options, true)
}

// export const getRoutesEnvironment = () => {
//     let options = {
//         ...api.getRoutes()
//     };
//     return request.make(options, true)
// }

export const getRouteEnvironment = (apiId) => {
    let options = {
        ...api.getRouteEnvironment(apiId)
    };
    return request.make(options, true)
}

// export const refreshRouteEnvironment = () => { 
//     let options = {
//         ...api.refreshRoute()
//     };
//     return request.make(options, true)
// }

// export const deleteRouteEnvironment = (apiId) => { 
//     let options = {
//         ...api.deleteRoute(apiId)
//     };
//     return request.make(options, true)
// }




