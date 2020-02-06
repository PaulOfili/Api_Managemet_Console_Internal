import types from '../usersConstants';

export const getUsers = () => {
    return {
        type: types.GET_USERS
    }
}

export const getUsersSuccess = (payload) => {
    return {
        type: types.GET_USERS_SUCCESS,
        payload
    }
}

export const getUsersFailure = (payload) => {
    return function(dispatch){
        dispatch({
            type: types.GET_USERS_FAILURE,
             payload
        });
     }
}

export const getUser = () => {
    return {
        type: types.GET_USER
    }
}

export const getUserSuccess = (payload) => {
    return {
        type: types.GET_USER_SUCCESS,
        payload
    }
}

export const getUserFailure = (payload) => {
    return function(dispatch){
        dispatch({
            type: types.GET_USER_FAILURE,
             payload
        });
     }
}

export const registerUser = () => {
    return {
        type: types.REGISTER_USER
    }
}


export const registerUserSuccess = (payload) => {
    return {
        type: types.REGISTER_USER_SUCCESS,
        payload
    }
}

export const registerUserFailure = (payload) => {
    return function(dispatch){
        dispatch({
            type: types.REGISTER_USER_FAILURE,
             payload
        });
     }
}

export const assignRole = () => {
    return {
        type: types.ASSIGN_ROLE
    }
}

export const assignRoleSuccess = (payload) => {
    return {
        type: types.ASSIGN_ROLE_SUCCESS,
        payload
    }
}

export const assignRoleFailure = (payload) => {
    return function(dispatch){
        dispatch({
            type: types.ASSIGN_ROLE_FAILURE,
             payload
        });
     }
}

export const deleteUser = () => {
    return {
        type: types.DELETE_USER
    }
}

export const deleteUserSuccess = (payload) => {
    return {
        type: types.DELETE_USER_SUCCESS,
        payload
    }
}

export const deleteUserFailure = (payload) => {
    return function(dispatch){
        dispatch({
            type: types.DELETE_USER_FAILURE,
             payload
        });
     }
}


