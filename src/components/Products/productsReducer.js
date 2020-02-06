import types from './productsConstants';

const initialState = {
    loading: false,
    products: [],
    product: {
        name: ''
    },
    clearForm: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_PRODUCT:
            return (
                Object.assign({}, state, {
                    loading: true,
                })
            );
        case types.SAVE_PRODUCT_SUCCESS:
            return (
                Object.assign({}, state, {
                    product: action.payload,
                    clearForm: true,
                    loading: false,
                })
            );
        case types.SAVE_PRODUCT_FAILURE:
            return (
                Object.assign({}, state, {
                    loading: false,
                })
            );
        case types.CREATE_RESOURCE_FAILURE:
            return (
                Object.assign({}, state, {
                    loading: false,
                })
            );
        case types.GET_PRODUCTS:
            return (
                Object.assign({}, state, {
                    loading: true,
                })
            );
        case types.GET_PRODUCTS_SUCCESS:
            return (
                Object.assign({}, state, {
                    products: action.payload,
                    product: {},
                    loading: false,
                })
            );
        case types.GET_PRODUCTS_FAILURE:
            return (
                Object.assign({}, state, {
                    loading: false,
                })
            );
        case types.GET_PRODUCT:
            return (
                Object.assign({}, state, {
                    loading: true,
                })
            );
        case types.GET_PRODUCT_SUCCESS:
            return (
                Object.assign({}, state, {
                    product: action.payload,
                    loading: false,
                })
            );
        case types.GET_PRODUCT_FAILURE:
            return (
                Object.assign({}, state, {
                    loading: false,
                })
            );
        case types.SET_PRODUCT:
            return (
                Object.assign({}, state, {
                    product: action.payload,
                    loading: false,
                })
            );
        case types.DELETE_PRODUCT:
            return (
                Object.assign({}, state, {
                    loading: true,
                })
            );
        case types.DELETE_PRODUCT_SUCCESS:
            return (
                Object.assign({}, state, {
                    loading: false,
                })
            );
        case types.DELETE_PRODUCT_FAILURE:
            return (
                Object.assign({}, state, {
                    loading: false,
                })
            );
        case types.DELETE_RESOURCE:
            return (
                Object.assign({}, state, {
                    loading: true,
                })
            );
        case types.DELETE_RESOURCE_SUCCESS:
            return (
                Object.assign({}, state, {
                    loading: false,
                })
            );
        case types.DELETE_RESOURCE_FAILURE:
            return (
                Object.assign({}, state, {
                    loading: false,
                })
            );
        default:
            return state;
    }
}