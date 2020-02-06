import types from './usersConstants';

const initialState = {
    loading: false,
    users: [],
    user: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.REGISTER_USER:
            return (
                Object.assign({}, state, {
                    loading: true,
                })
            );
        case types.REGISTER_USER_SUCCESS:
            return (
                Object.assign({}, state, {
                    user: action.payload,
                    loading: false,
                })
            );
        case types.REGISTER_USER_FAILURE:
            return (
                Object.assign({}, state, {
                    loading: false,
                })
            );
        case types.GET_USERS:
            return (
                Object.assign({}, state, {
                    loading: true,
                })
            );
        case types.GET_USERS_SUCCESS:
            return (
                Object.assign({}, state, {
                    users: action.payload,
                    loading: false,
                })
            );
        case types.GET_USERS_FAILURE:
            return (
                Object.assign({}, state, {
                    loading: false,
                })
            );
        case types.GET_USER:
            return (
                Object.assign({}, state, {
                    loading: true,
                })
            );
        case types.GET_USER_SUCCESS:
            return (
                Object.assign({}, state, {
                    user: action.payload,
                    loading: false,
                })
            );
        case types.GET_USER_FAILURE:
            return (
                Object.assign({}, state, {
                    loading: false,
                })
            );
        case types.DELETE_USER:
            return (
                Object.assign({}, state, {
                    loading: true,
                })
            );
        case types.DELETE_USER_SUCCESS:
            return (
                Object.assign({}, state, {
                    loading: false,
                })
            );
        case types.DELETE_USER_FAILURE:
            return (
                Object.assign({}, state, {
                    loading: false,
                })
            );
        case types.ASSIGN_ROLE:
            return (
                Object.assign({}, state, {
                    loading: true,
                })
            );
        case types.ASSIGN_ROLE_SUCCESS:
            return (
                Object.assign({}, state, {
                    loading: false,
                })
            );
        case types.ASSIGN_ROLE_FAILURE:
            return (
                Object.assign({}, state, {
                    loading: false,
                })
            );
        default:
            return state;
    }
}