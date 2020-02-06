import { types } from '../routesEnvironmentConstants';

// export const getRoutes = () => {
//     return {
//         type: types.GET_ROUTES
//     }
// }

// export const getRoutesSuccess = (payload) => {
//     return {
//         type: types.GET_ROUTES_SUCCESS,
//         payload
//     }
// }

// export const getRoutesFailure = (payload) => {
//     return function(dispatch){
//         dispatch({
//             type: types.GET_ROUTES_FAILURE,
//              payload
//         });
//      }   
// }

export const getRouteEnvironment = () => {
    return {
        type: types.GET_ROUTE_ENVIRONMENT
    }
}

export const getRouteEnvironmentSuccess = (payload) => {
    return {
        type: types.GET_ROUTE_ENVIRONMENT_SUCCESS,
        payload
    }
}

export const getRouteEnvironmentFailure = (payload) => {
    return function(dispatch){
        dispatch({
            type: types.GET_ROUTE_ENVIRONMENT_FAILURE,
             payload
        });
     }   
}

export const saveRouteEnvironment = () => {
    return {
        type: types.SAVE_ROUTE_ENVIRONMENT
    }
}

export const saveRouteEnvironmentSuccess = (payload) => {
    return {
        type: types.SAVE_ROUTE_ENVIRONMENT_SUCCESS,
        payload
    }
}

export const saveRouteEnvironmentFailure = (payload) => {
    return function(dispatch){
        dispatch({
            type: types.SAVE_ROUTE_ENVIRONMENT_FAILURE,
             payload
        });
     }   
}

export const updateRoute = () => {
    return {
        type: types.UPDATE_ROUTE
    }
}

export const updateRouteSuccess = (payload) => {
    return {
        type: types.UPDATE_ROUTE_SUCCESS,
        payload
    }
}

export const updateRouteFailure = (payload) => {
    return function(dispatch){
        dispatch({
            type: types.UPDATE_ROUTE_FAILURE,
             payload
        });
     }   
}

// export const deleteRoute = () => {
//     return {
//         type: types.DELETE_ROUTE
//     }
// }

// export const deleteRouteSuccess = (payload) => {
//     return {
//         type: types.DELETE_ROUTE_SUCCESS,
//         payload
//     }
// }

// export const deleteRouteFailure = (payload) => {
//     return function(dispatch){
//         dispatch({
//             type: types.DELETE_ROUTE_FAILURE,
//              payload
//         });
//      }   
// }

// export const refreshRouteFailure = (payload) => {
//     return function(dispatch){
//         dispatch( {
//              type: types.REFRESH_ROUTE_FAILURE,
//              payload
//         });
//      }   
// }

export const setRouteEnvironment = (payload) => {
    return {
        type: types.SET_ROUTE_ENVIRONMENT,
        payload
    }
}
