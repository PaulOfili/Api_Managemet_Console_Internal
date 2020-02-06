import types from '../clientsConstants';

export const getClients = () => {
    return {
        type: types.GET_CLIENTS
    }
}

export const getClientsSuccess = (payload) => {
    return function(dispatch){
        dispatch({
             type: types.GET_CLIENTS_SUCCESS,
             payload
        });
     }   
}

export const getClientsFailure = (payload) => {
    return function(dispatch){
       dispatch({
            type: types.GET_CLIENTS_FAILURE,
            payload
       });
    }   
}

export const getClient = () => {
    return {
        type: types.GET_CLIENT
    }
}

export const getClientSuccess = (payload) => {
    return function(dispatch){
        dispatch({
             type: types.GET_CLIENT_SUCCESS,
             payload
        });
     }   
}

export const getClientFailure = (payload) => {
    return function(dispatch){
       dispatch({
            type: types.GET_CLIENT_FAILURE,
            payload
       });
    }   
}


export const getRequested = () => {
    return {
        type: types.GET_REQUESTED
    }
}

export const getRequestedSuccess = (payload) => {
    return {
        type: types.GET_REQUESTED_SUCCESS,
        payload
    }
}


export const getRequestedFailure = (payload) => {
    return {
        type: types.GET_REQUESTED_FAILURE,
        payload
    }
}

export const getApproved = () => {
    return {
        type: types.GET_APPROVED
    }
}

export const getApprovedSuccess = (payload) => {
    return {
        type: types.GET_APPROVED_SUCCESS,
        payload
    }
}


export const getApprovedFailure = (payload) => {
    return {
        type: types.GET_APPROVED_FAILURE,
        payload
    }
}

export const approveResources = () => {
    return {
        type: types.APPROVE_RESOURCES
    }
}

export const approveResourcesSuccess = (payload) => {
    return function(dispatch){
        dispatch({
             type: types.APPROVE_RESOURCES_SUCCESS,
             payload
        });
     }   
}

export const approveResourcesFailure = (payload) => {
    return function(dispatch){
       dispatch({
            type: types.APPROVE_RESOURCES_FAILURE,
            payload
       });
    }   
}

export const declineResources = () => {
    return {
        type: types.DECLINE_RESOURCES
    }
}

export const declineResourcesSuccess = (payload) => {
    return function(dispatch){
        dispatch({
             type: types.DECLINE_RESOURCES_SUCCESS,
             payload
        });
     }   
}

export const declineResourcesFailure = (payload) => {
    return function(dispatch){
       dispatch({
            type: types.DECLINE_RESOURCES_FAILURE,
            payload
       });
    }   
}

export const setClient = (payload) => {
    return function(dispatch){
       dispatch({
            type: types.SET_CLIENT,
            payload
       });
    }   
}