import ACCOUNT_REPO from '../constants/account';

const initialState = {
    userData: {
        sessionInterval: 0
    },
    loading: false,
    isLoggedIn: false,
    role: 'USER'
}

export default function account(state = initialState, action) {
    switch (action.type) {
        case ACCOUNT_REPO.ACCOUNT_LOGIN:
            return (
                Object.assign({}, state, {
                    loading: true,
                })
            );
        case ACCOUNT_REPO.ACCOUNT_WELCOME:
                return (
                    Object.assign({}, state, {
                        isLoggedIn:true,
                        userData: action.payload,
                        error: null,
                        loading: false
                    })
                );
        case ACCOUNT_REPO.ACCOUNT_LOGOUT:
            return (
                Object.assign({}, state, {
                    isLoggedIn: false,
                    token: null,
                    expiresAt: null,
                    error: null,
                    loading: false
             })
            );
        case ACCOUNT_REPO.RESOLVE_ROLE:
            return (
                Object.assign({}, state, {
                    role: action.payload
                })
            );
        default:
            return state;
    }
}