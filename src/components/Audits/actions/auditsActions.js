import types from '../auditConstants';

export const getAuditsLoader = () => {
    return {
        type: types.GET_AUDITS
    }
}

export const getAuditsSuccess = (payload) => {
    return {
        type: types.GET_AUDITS_SUCCESS,
        payload
    }
}

export const getAuditsFailure = (payload) => {
    return function(dispatch){
        dispatch({
            type: types.GET_AUDITS_FAILURE,
             payload
        });
     }   
}

export const setPageSize = (payload) => {
    return {
        type: types.SET_PAGESIZE,
        payload
    }
}

export const setPageNum = (payload) => {
    return {
        type: types.SET_PAGENUM,
        payload
    }
}