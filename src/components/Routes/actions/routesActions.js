import types from '../routesConstants';

export const getRoutes = () => {
    return {
        type: types.GET_ROUTES
    }
}

export const getRoutesSuccess = (payload) => {
    return {
        type: types.GET_ROUTES_SUCCESS,
        payload
    }
}

export const getRoutesFailure = (payload) => {
    return function(dispatch){
        dispatch({
            type: types.GET_ROUTES_FAILURE,
             payload
        });
     }   
}

export const getRoute = () => {
    return {
        type: types.GET_ROUTE
    }
}

export const getRouteSuccess = (payload) => {
    return {
        type: types.GET_ROUTE_SUCCESS,
        payload
    }
}

export const getRouteFailure = (payload) => {
    return function(dispatch){
        dispatch({
            type: types.GET_ROUTE_FAILURE,
             payload
        });
     }   
}

export const saveRoute = () => {
    return {
        type: types.SAVE_ROUTE
    }
}

export const saveRouteSuccess = (payload) => {
    return {
        type: types.SAVE_ROUTE_SUCCESS,
        payload
    }
}

export const saveRouteFailure = (payload) => {
    return function(dispatch){
        dispatch({
            type: types.SAVE_ROUTE_FAILURE,
             payload
        });
     }   
}

export const updateRoute = () => {
    return {
        type: types.SAVE_ROUTE
    }
}

export const updateRouteSuccess = (payload) => {
    return {
        type: types.SAVE_ROUTE_SUCCESS,
        payload
    }
}

export const updateRouteFailure = (payload) => {
    return function(dispatch){
        dispatch({
            type: types.SAVE_ROUTE_FAILURE,
             payload
        });
     }   
}

export const deleteRoute = () => {
    return {
        type: types.DELETE_ROUTE
    }
}

export const deleteRouteSuccess = (payload) => {
    return {
        type: types.DELETE_ROUTE_SUCCESS,
        payload
    }
}

export const deleteRouteFailure = (payload) => {
    return function(dispatch){
        dispatch({
            type: types.DELETE_ROUTE_FAILURE,
             payload
        });
     }   
}

export const refreshRouteFailure = (payload) => {
    return function(dispatch){
        dispatch( {
             type: types.REFRESH_ROUTE_FAILURE,
             payload
        });
     }   
}

export const setRoute = (payload) => {
    return {
        type: types.SET_ROUTE,
        payload
    }
}
