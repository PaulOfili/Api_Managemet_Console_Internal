import * as jwt_decode from 'jwt-decode';
import { getSession, timeRemaining, timeOutUser, saveSession } from "../../../session/cookies";
import { logout, accountLogin, resolveRole as resolveRoleAction } from './authActions';
import { getUser, registerUser } from '../../Users/actions/usersRequests';

export const initAccount = () => {
    let expiry = timeRemaining();
    return dispatch => {
        timeRemaining(expiry, dispatch, logOut)
    }
}


export const logOut = () => {
    return dispatch => {
        dispatch(logout());
        window.location.href = '/'
    }
}

export const resolveRole = (username) => {
    return dispatch => {
        getUser(username).then((response) => {
            dispatch(resolveRoleAction(response.data.role))
        })
        .catch((error) => {
            if(error.data && error.data.status === 403) {
                dispatch(resolveRoleAction("USER"))
            }
            if(error.data && (error.data.status === 404)){
                registerUser({"username": username, "role": "USER"}).then((response) => (
                    dispatch(resolveRoleAction("USER"))
                ))
                .catch((error) => (
                    console.log("Error occured")
                ))
            }
        })
    }
}

export const saveUser = (params, token) => {
    saveSession(params, token);
    return dispatch => {
        let expiry = getSession('exp') * 1000;
        let timeOut = expiry - Date.now();
        timeOutUser(timeOut, dispatch, logOut);
    }
};

export const TimeOutSessionUser = (seconds) => {
    return dispatch => {
        let expiry = seconds * 1000;
        timeOutUser(expiry, dispatch, logOut);
    }
}

export const validateUserData = (data, dispatch, token) => {
    dispatch(saveUser(data, token));
};


export const loginUser = (token) => {
    let decoded_token = jwt_decode(token);

    return dispatch => {            
        validateUserData(decoded_token, dispatch, token)
        dispatch(resolveRole(decoded_token.email))
        dispatch(accountLogin(decoded_token));
    }
};