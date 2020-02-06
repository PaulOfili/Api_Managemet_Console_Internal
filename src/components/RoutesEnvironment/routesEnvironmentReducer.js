import { types } from './routesEnvironmentConstants';

const initialState = {
    loading: false,
    routesEnvironment: [],
    routeEnvironment: {},
    clearForm: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_ROUTE_ENVIRONMENT:
            return (
                Object.assign({}, state, {
                    loading: true,
                })
            );
        case types.SAVE_ROUTE_ENVIRONMENT_SUCCESS:
            return (
                Object.assign({}, state, {
                    routeEnvironment: action.payload,
                    clearForm: true,
                    loading: false,
                })
            );
        case types.SAVE_ROUTE_ENVIRONMENT_FAILURE:
            return (
                Object.assign({}, state, {
                    loading: false,
                })
            );
        // case types.GET_ROUTES:
        //     return (
        //         Object.assign({}, state, {
        //             loading: true,
        //         })
        //     );
        // case types.GET_ROUTES_SUCCESS:
        //     return (
        //         Object.assign({}, state, {
        //             apis: action.payload,
        //             loading: false,
        //         })
        //     );
        // case types.GET_ROUTES_FAILURE:
        //     return (
        //         Object.assign({}, state, {
        //             loading: false,
        //         })
        //     );
        case types.GET_ROUTE_ENVIRONMENT:
            return (
                Object.assign({}, state, {
                    loading: true,
                })
            );
        case types.GET_ROUTE_ENVIRONMENT_SUCCESS:
            return (
                Object.assign({}, state, {
                    routeEnvironment: action.payload,
                    loading: false,
                })
            );
        case types.GET_ROUTE_ENVIRONMENT_FAILURE:
            return (
                Object.assign({}, state, {
                    loading: false,
                })
            );
        // case types.SET_ROUTE:
        //     return (
        //         Object.assign({}, state, {
        //             api: action.payload,
        //             loading: false,
        //         })
        //     );
        // case types.DELETE_ROUTE:
        //     return (
        //         Object.assign({}, state, {
        //             loading: true,
        //         })
        //     );
        // case types.DELETE_ROUTE_SUCCESS:
        //     return (
        //         Object.assign({}, state, {
        //             loading: false,
        //         })
        //     );
        // case types.DELETE_ROUTE_FAILURE:
        //     return (
        //         Object.assign({}, state, {
        //             loading: false,
        //         })
        //     );
        // case types.REFRESH_ROUTE_FAILURE:
        //     return (
        //         Object.assign({}, state, {
        //             loading: false,
        //         })
        //     );
        default:
            return state;
    }
}