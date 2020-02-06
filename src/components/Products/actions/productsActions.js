import types from '../productsConstants';

export const getProducts = () => {
    return {
        type: types.GET_PRODUCTS
    }
}

export const getProductsSuccess = (payload) => {
    return {
        type: types.GET_PRODUCTS_SUCCESS,
        payload
    }
}

export const getProductsFailure = (payload) => {
    return function(dispatch){
        dispatch({
            type: types.GET_PRODUCTS_FAILURE,
             payload
        });
     }
}

export const getProduct = () => {
    return {
        type: types.GET_PRODUCT
    }
}

export const getProductSuccess = (payload) => {
    return {
        type: types.GET_PRODUCT_SUCCESS,
        payload
    }
}

export const getProductFailure = (payload) => {
    return function(dispatch){
        dispatch({
            type: types.GET_PRODUCT_FAILURE,
             payload
        });
     }
}

export const saveProduct = () => {
    return {
        type: types.SAVE_PRODUCT
    }
}

export const createResource = () => {
    return {
        type: types.CREATE_RESOURCE
    }
}

export const saveProductSuccess = (payload) => {
    return {
        type: types.SAVE_PRODUCT_SUCCESS,
        payload
    }
}

export const saveProductFailure = (payload) => {
    return function(dispatch){
        dispatch({
            type: types.SAVE_PRODUCT_FAILURE,
             payload
        });
     }
}

export const createResourceFailure = (payload) => {
    return function(dispatch){
        dispatch({
            type: types.CREATE_RESOURCE_FAILURE,
             payload
        });
     }
}

export const updateProduct = () => {
    return {
        type: types.SAVE_PRODUCT
    }
}

export const updateProductSuccess = (payload) => {
    return {
        type: types.SAVE_PRODUCT_SUCCESS,
        payload
    }
}

export const updateProductFailure = (payload) => {
    return function(dispatch){
        dispatch({
            type: types.SAVE_PRODUCT_FAILURE,
             payload
        });
     }
}

export const deleteProduct = () => {
    return {
        type: types.DELETE_PRODUCT
    }
}

export const deleteProductSuccess = (payload) => {
    return {
        type: types.DELETE_PRODUCT_SUCCESS,
        payload
    }
}

export const deleteProductFailure = (payload) => {
    return function(dispatch){
        dispatch({
            type: types.DELETE_PRODUCT_FAILURE,
             payload
        });
     }
}

export const deleteResource = () => {
    return {
        type: types.DELETE_RESOURCE
    }
}

export const deleteResourceSuccess = (payload) => {
    return {
        type: types.DELETE_RESOURCE_SUCCESS,
        payload
    }
}

export const deleteResourceFailure = (payload) => {
    return function(dispatch){
        dispatch({
            type: types.DELETE_RESOURCE_FAILURE,
             payload
        });
     }
}

export const setProduct = (payload) => {
    return {
        type: types.SET_PRODUCT,
        payload
    }
}
