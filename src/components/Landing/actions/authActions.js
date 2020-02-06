import types from '../constants/account';
import { removeSession } from '../../../session/cookies';

export const login = () => {
    return {
        type: types.ACCOUNT_LOGIN
    };
};
export const accountLogin = (data) => {
    return {
        type: types.ACCOUNT_WELCOME,
        payload: data
    };
};

export const loginFailure = (error) => {
    return {
        type: types.ACCOUNT_LOGIN_FAILURE,
        error
    };
};

export const resolveRole = (payload) => {
    return {
        type: types.RESOLVE_ROLE,
        payload
    };
};

export const logout = () => {
    removeSession()
    return {
        type: types.ACCOUNT_LOGOUT
    }
}

