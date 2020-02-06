import * as apiService from './routesEnvironmentRequests';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { showAlert } from '../../../alert';

import {
    saveRouteEnvironment,
    saveRouteEnvironmentSuccess,
    saveRouteEnvironmentFailure,
    // updateRouteEnvironment as updateRouteEnvironmentLoader,
    // updateRouteEnvironmentSuccess,
    // updateRouteEnvironmentFailure,
    getRouteEnvironment as getRouteEnvironmentLoader,
    getRouteEnvironmentSuccess,
    getRouteEnvironmentFailure,
    // getRoutes as getRoutesLoader,
    // getRoutesSuccess,
    // getRoutesFailure,
    // deleteRoute as deleteRouteLoader,
    // deleteRouteSuccess,
    // deleteRouteFailure,
    // refreshRouteFailure,
} from './routesEnvironmentActions';

export const createRouteEnvironment = (body) => {
    return dispatch => {
            dispatch(showLoading());
            dispatch(saveRouteEnvironment());
            const data = {
                "routeId": body.routeId,
                "testURL": body.testURL
            }
            apiService.saveRouteEnvironment(data).then((response)=> {
                dispatch(hideLoading());
                dispatch(showAlert({
                    type:'success',
                    message: 'RouteEnvironment created successfully'          
                }, dispatch))
                dispatch(saveRouteEnvironmentSuccess(response.data));
            }).catch((error) => {
                dispatch(hideLoading());
                dispatch(showAlert({
                    type:'error',
                    message: error.data.message          
                }, dispatch))
                dispatch(saveRouteEnvironmentFailure(error))
            })
    }
}

export const updateRouteEnvironment = (body) => {
    return dispatch => {
            dispatch(showLoading());
            dispatch(saveRouteEnvironment());
            apiService.updateRouteEnvironment(body).then((response)=> {
                dispatch(hideLoading());
                dispatch(showAlert({
                    type:'success',
                    message: 'Updated successfully'          
                }, dispatch))
                dispatch(saveRouteEnvironmentSuccess(response.data));
            }).catch((error) => {
                dispatch(hideLoading());
                dispatch(showAlert({
                    type:'error',
                    message: error.message          
                }, dispatch))
                dispatch(saveRouteEnvironmentFailure(error))
            })
    }
}

// export const getRoutes = () => {
//     return dispatch => {
//             dispatch(showLoading());
//             dispatch(getRoutesLoader());
//             apiService.refreshRoute().then((response2)=> {
//                 apiService.getRoutes().then((response)=> {
//                     dispatch(hideLoading());
//                     dispatch(getRoutesSuccess(response.data));
//                 }).catch((error) => {
//                     dispatch(hideLoading());
//                     dispatch(showAlert({
//                         type:'error',
//                         message: error.message         
//                     }, dispatch))
//                     dispatch(getRoutesFailure(error))
//                 })
//             }).catch((error) => {
//                 dispatch(hideLoading());
//                 dispatch(showAlert({
//                     type:'error',
//                     message: 'Internal Server Error'        
//                 }, dispatch))
//                 dispatch(refreshRouteFailure(error))
//             })
//     }
// }

export const getRouteEnvironment = (apiId) => {
    return dispatch => {
            dispatch(showLoading());
            dispatch(getRouteEnvironmentLoader());
            apiService.getRouteEnvironment(apiId).then((response)=> {
                dispatch(hideLoading());
                dispatch(getRouteEnvironmentSuccess(response.data));
            }).catch((error) => {
                dispatch(hideLoading());
                dispatch(showAlert({
                    type:'error',
                    message: `RouteEnvironment with id ${apiId} ${error.statusText}. Please create one!`        
                }, dispatch))
                dispatch(getRouteEnvironmentFailure(error))
            })
    }
}

// export const deleteRoute = (apiId) => {
//     return async dispatch => {
//             dispatch(showLoading());
//             dispatch(deleteRouteLoader());
//             apiService.deleteRoute(apiId).then(()=> {
//                 dispatch(hideLoading());
//                 dispatch(hideModal());
//                 dispatch(showAlert({
//                     type:'success',
//                     message: 'Deleted'          
//                 }, dispatch))
//                 dispatch(getRoutes());
//                 window.location.href = '/dashboard/routes'
//                 dispatch(deleteRouteSuccess('Route deleted Successfully'))
//             }).catch((error) => {
//                 dispatch(hideLoading());
//                 dispatch(showAlert({
//                     type:'error',
//                     message: error          
//                 }, dispatch))
//                 dispatch(deleteRouteFailure(error || 'problem deleting route'))
//             })
//     }
// }
