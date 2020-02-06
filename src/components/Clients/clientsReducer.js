import types from './clientsConstants';

const initialState = {
    loading: false,
    clients: [],
    requested: [],
    approved: [],
    client: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_CLIENT:
            return (
                Object.assign({}, state, {
                    loading: true,
                })
            );
        case types.SAVE_CLIENT_SUCCESS:
            return (
                Object.assign({}, state, {
                    clients: action.payload,
                    clearForm: true,
                    loading: false,
                })
            );
        case types.SAVE_CLIENT_FAILURE:
            return (
                Object.assign({}, state, {
                    loading: false,
                })
            );
        case types.GET_CLIENTS:
            return (
                Object.assign({}, state, {
                    loading: true,
                })
            );
        case types.GET_CLIENTS_SUCCESS:
            return (
                Object.assign({}, state, {
                    clients: action.payload,
                    loading: false,
                })
            );
        case types.GET_CLIENTS_FAILURE:
            return (
                Object.assign({}, state, {
                    loading: false,
                })
            );
        case types.GET_CLIENT:
            return (
                Object.assign({}, state, {
                    loading: true,
                })
            );
        case types.GET_CLIENT_SUCCESS:
            return (
                Object.assign({}, state, {
                    client: action.payload,
                    loading: false,
                })
            );
        case types.GET_CLIENT_FAILURE:
            return (
                Object.assign({}, state, {
                    loading: false,
                })
            );
        case types.GET_REQUESTED:
            return (
                Object.assign({}, state, {
                    loading: true,
                })
            );
        case types.GET_REQUESTED_SUCCESS:
            return (
                Object.assign({}, state, {
                    requested: action.payload,
                    loading: false,
                })
            );
        case types.GET_REQUESTED_FAILURE:
            return (
                Object.assign({}, state, {
                    loading: false,
                    error: action.payload
                })
            );
        case types.GET_APPROVED:
            return (
                Object.assign({}, state, {
                    loading: true,
                })
            );
        case types.GET_APPROVED_SUCCESS:
            return (
                Object.assign({}, state, {
                    approved: action.payload,
                    loading: false,
                })
            );
        case types.GET_APPROVED_FAILURE:
            return (
                Object.assign({}, state, {
                    loading: false,
                    error: action.payload
                })
            );
        case types.SET_CLIENT:
            return (
                Object.assign({}, state, {
                    client: action.payload,
                    loading: false,
                })
            );
        default:
            return state;
    }
}