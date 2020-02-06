import * as apiService from './routesRequests';
import { hideModal } from '../../Modals/actions'
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { showAlert } from '../../../alert';

import {
    saveRoute,
    saveRouteFailure,
    updateRoute as updateRouteLoader,
    updateRouteFailure,
    getRoute as getRouteLoader,
    getRouteSuccess,
    getRouteFailure,
    getRoutes as getRoutesLoader,
    getRoutesSuccess,
    getRoutesFailure,
    deleteRoute as deleteRouteLoader,
    deleteRouteSuccess,
    deleteRouteFailure,
    refreshRouteFailure,
    setRoute,
} from './routesActions';

export const createRoute = (apiId, body) => {
    return dispatch => {
            dispatch(showLoading());
            dispatch(saveRoute());
            apiService.saveRoute(apiId, body).then((response)=> {
                dispatch(hideLoading());
                dispatch(showAlert({
                    type:'success',
                    message: 'Route created successfully'          
                }, dispatch))
                dispatch(getRoute(apiId));
            }).catch((error) => {
                dispatch(hideLoading());
                dispatch(showAlert({
                    type:'error',
                    message: `${error.data.message}. Please add at least one row for the selected predicate predicate.`          
                }, dispatch))
                dispatch(saveRouteFailure(error))
            })
    }
}

export const updateRoute = (apiId, body) => {
    return dispatch => {
            dispatch(showLoading());
            dispatch(updateRouteLoader());
            apiService.updateRoute(apiId, body).then((response)=> {
                dispatch(hideLoading());
                dispatch(showAlert({
                    type:'success',
                    message: 'Updated successfully'          
                }, dispatch))
                dispatch(getRoute(apiId));
            }).catch((error) => {
                dispatch(hideLoading());
                dispatch(showAlert({
                    type:'error',
                    message: `${error.data.message}. Please add at least one row for the selected predicate.`,          
                }, dispatch))
                dispatch(updateRouteFailure(error))
            })
    }
}

export const getRoutes = () => {
    return dispatch => {
            dispatch(showLoading());
            dispatch(getRoutesLoader());
            apiService.refreshRoute().then((response2)=> {
                apiService.getRoutes().then((response)=> {
                    dispatch(hideLoading());
                    dispatch(getRoutesSuccess(response.data));
                }).catch((error) => {
                    dispatch(hideLoading());
                    dispatch(showAlert({
                        type:'error',
                        message: error.message         
                    }, dispatch))
                    dispatch(getRoutesFailure(error))
                })
            }).catch((error) => {
                dispatch(hideLoading());
                dispatch(showAlert({
                    type:'error',
                    message: 'Internal Server Error'        
                }, dispatch))
                dispatch(refreshRouteFailure(error))
            })
    }
}

export const getRoute = (apiId) => {
    return dispatch => {
            dispatch(showLoading());
            dispatch(getRouteLoader());
            apiService.getRoute(apiId).then((response)=> {
                dispatch(hideLoading());
                dispatch(getRouteSuccess(response.data));
            }).catch((error) => {
                dispatch(hideLoading());
                dispatch(showAlert({
                    type:'error',
                    message: `Route with id ${apiId} ${error.statusText}. Please create a route.`        
                }, dispatch))
                dispatch(getRouteFailure(error))
            })
    }
}

export const deleteRoute = (apiId) => {
    return async dispatch => {
            dispatch(showLoading());
            dispatch(deleteRouteLoader());
            apiService.deleteRoute(apiId).then(()=> {
                dispatch(hideLoading());
                dispatch(hideModal());
                dispatch(showAlert({
                    type:'success',
                    message: 'Successfully Deleted'          
                }, dispatch))
                dispatch(getRoutes());
                window.location.href = '/dashboard/routes'
                dispatch(deleteRouteSuccess('Route deleted Successfully'))
            }).catch((error) => {
                dispatch(hideLoading());
                dispatch(showAlert({
                    type:'error',
                    message: error          
                }, dispatch))
                dispatch(deleteRouteFailure(error || 'Problem deleting route'))
            })
    }
}
