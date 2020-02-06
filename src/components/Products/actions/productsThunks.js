import * as productApi from './productsRequests';
import * as actions from './productsActions';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { showAlert } from '../../../alert';
import { setRoute } from '../../Routes/actions/routesActions';
// import { push } from 'react-router-redux';

export const createProduct = (body) => {
    return dispatch => {
            dispatch(actions.saveProduct());
            dispatch(showLoading());
            productApi.saveProduct(body).then((response)=> {
                dispatch(hideLoading());
                dispatch(showAlert({
                    type:'success',
                    message: 'Product created successfully. Please update this product by adding resources.'          
                }, dispatch))
                dispatch(actions.saveProductSuccess(response.data));
            }).catch((error) => {

                dispatch(hideLoading());
                dispatch(showAlert({
                    type:'error',
                    message: error.data.message           
                }, dispatch))
                dispatch(actions.saveProductFailure(error))
            })
    }
}

export const updateProduct = (body) => {
    return dispatch => {
            dispatch(actions.saveProduct());
            dispatch(showLoading());
            productApi.updateProduct(body).then((response)=> {
                dispatch(hideLoading());
                dispatch(showAlert({
                    type:'success',
                    message: 'Product updated successfully'          
                }, dispatch))
                dispatch(actions.saveProductSuccess(response.data));
            }).catch((error) => {
                dispatch(hideLoading());
                if(error)
                    dispatch(showAlert({
                        type:'error',
                        message: error.data.message          
                    }, dispatch))
                else
                    dispatch(showAlert({
                        type:'error',
                        message: "Product details can not be updated right now"         
                    }, dispatch))
                dispatch(actions.saveProductFailure(error))
            })
    }
}

export const getProduct = (productID) => {
    return dispatch => {
            dispatch(showLoading());
            dispatch(actions.getProduct());
            productApi.getProduct(productID)
                .then((response) => {
                    dispatch(hideLoading());
                    dispatch(actions.getProductSuccess(response.data));
                })
                .catch((error) => {
                    dispatch(hideLoading());
                    if(error)
                        dispatch(showAlert({
                            type:'error',
                            message: (error.data && error.data.message) ?  error.data.message : error      
                        }, dispatch))
                    else
                        dispatch(showAlert({
                            type:'error',
                            message: "Product can not be retrieved right now"         
                        }, dispatch))
                    dispatch(actions.getProductFailure());
                })
    }
}

export const getProducts = () => {
    return dispatch => {
        dispatch(actions.getProducts());
        dispatch(setRoute({}));
        dispatch(showLoading());
        productApi.getProducts()
                  .then((response) => {
                        dispatch(hideLoading());
                      dispatch(actions.getProductsSuccess(response.data));
                  })
                  .catch((error) => {
                        dispatch(hideLoading());
                        if(error.data && error.data.message)
                            dispatch(showAlert({
                                type:'error',
                                message: error.data.message        
                            }, dispatch))
                        else
                            dispatch(showAlert({
                                type:'error',
                                message: "Product List can not be retrieved right now"         
                            }, dispatch))
                        dispatch(actions.getProductsFailure());
                  })
    }
}

export const createResource = (productId, body, callback) => {
    return dispatch => {
            dispatch(actions.createResource());
            dispatch(showLoading());
            productApi.createResource(productId, body).then((response)=> {
                dispatch(hideLoading());
                callback();
                dispatch(showAlert({
                    type:'success',
                    message: "Created Resource sucessfully"         
                }, dispatch))
                dispatch(actions.saveProductSuccess(response.data));
            }).catch((error) => {
                dispatch(hideLoading());
                if(error.message){
                    dispatch(showAlert({
                        type:'error',
                        message: error.message      
                    }, dispatch))
                }
                else {
                    dispatch(showAlert({
                        type:'error',
                        message: "Unable to get response from server"          
                    }, dispatch))
                }
                dispatch(actions.createResourceFailure(error))
            })
    }
}

export const deleteProduct = (id, history) => {
    return dispatch => {
            dispatch(actions.deleteProduct());
            dispatch(showLoading())
            productApi.deleteProduct(id).then((response)=> {
                dispatch(hideLoading());
                dispatch(showAlert({
                    type:'success',
                    message: "Product deleted"         
                }, dispatch))
                
                dispatch(actions.deleteProductSuccess(response.data));
                history.push('/dashboard/apis');
                // window.location.href = '/dashboard/apis'
            }).catch((error) => {
                dispatch(hideLoading());
                if(error.data && error.data.message){
                    dispatch(showAlert({
                        type:'error',
                        message: error.data.message      
                    }, dispatch))
                }
                else {
                    dispatch(showAlert({
                        type:'error',
                        message: "This product can not be deleted right now."          
                    }, dispatch))
                }
                dispatch(actions.deleteProductFailure(error))
            })
    }
}

export const deleteResource = (productID, resourceID, callback) => {
    return dispatch => {
            dispatch(actions.deleteResource())
            dispatch(showLoading())
            productApi.deleteResource(productID, resourceID).then((response)=> {
                dispatch(hideLoading());
                callback();
                dispatch(showAlert({
                    type:'success',
                    message: "Resource deleted"         
                }, dispatch))
                dispatch(actions.deleteResourceSuccess(response.data));
            }).catch((error) => {
                dispatch(hideLoading());
                dispatch(showAlert({
                    type:'error',
                    message: error     
                }, dispatch))
                dispatch(actions.deleteResourceFailure(error))
            })
    }
}