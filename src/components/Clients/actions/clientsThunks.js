// import mockprojectApi from '../../../request/mockData';
import * as projectsApi from './clientsRequests';
import * as actions from './clientsActions';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { showAlert } from '../../../alert';

export const getClients = () => {
    return async dispatch => {
            dispatch(actions.getClients());
            dispatch(showLoading());
            try {
                const response = await projectsApi.getProjects();
                response && dispatch(actions.getClientsSuccess(response.data));
                dispatch(hideLoading());
            }
            catch(error){
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
                        message: "Unable to get response from server"          
                    }, dispatch))
                }
                dispatch(actions.getClientsFailure(error));
            }
    }
}

export const getClient = (projectId) => {
    return async dispatch => {
            dispatch(actions.getClient(projectId));
            dispatch(showLoading());
            try {
                const response = await projectsApi.getProject(projectId);
                response && dispatch(actions.getClientSuccess(response.data));
                dispatch(hideLoading());
            }
            catch(error){
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
                        message: "Unable to get response from server"          
                    }, dispatch))
                }
                dispatch(actions.getClientFailure(error));
            }
    }
}

export const getRequested = (projectId) => {
    return async dispatch => {
            dispatch(actions.getRequested());
            dispatch(showLoading());
            try {
                const response = await projectsApi.getRequested(projectId);
                response && dispatch(actions.getRequestedSuccess(response.data));
                dispatch(hideLoading());
            }
            catch(error){
                dispatch(hideLoading());
                if(error.data && error.data.message){

                    dispatch(showAlert({
                        type:'error',
                        message: `Unable to get response from server. ${error.data.message}.`     
                    }, dispatch))
                }
                else {
                    dispatch(showAlert({
                        type:'error',
                        message: "Unable to get response from server"          
                    }, dispatch))
                }
                dispatch(actions.getRequestedFailure(error));
            }
    }
}

export const getApproved = (projectId) => {
    return async dispatch => {
            dispatch(actions.getApproved());
            dispatch(showLoading());
            try {
                const response = await projectsApi.getApproved(projectId);
                response && dispatch(actions.getApprovedSuccess(response.data));
                dispatch(hideLoading());
            }
            catch(error){
                dispatch(hideLoading());
                if(error.data && error.data.message){

                    dispatch(showAlert({
                        type:'error',
                        message: `Unable to get response from server. ${error.data.message}.`       
                    }, dispatch))
                }
                else {
                    dispatch(showAlert({
                        type:'error',
                        message: "Unable to get response from server"          
                    }, dispatch))
                }
                dispatch(actions.getApprovedFailure(error));
            }
    }
}

export const setResourceList = (newObject) => {
    return dispatch => {
        dispatch(actions.setClient(newObject));
    }
}

export const approveResources = (body, projectId) => {
    return async dispatch => {
            dispatch(actions.approveResources());
            dispatch(showLoading());
            try {
                const response = await projectsApi.approveResources(body, projectId);
                response && dispatch(actions.approveResourcesSuccess(response.data));
                dispatch(getApproved(projectId));
                dispatch(getRequested(projectId));
                dispatch(setResourceList({}))
                dispatch(hideLoading());
            }
            catch(error){
                dispatch(hideLoading());
                if(error.data && error.data.message){

                    dispatch(showAlert({
                        type:'error',
                        message: `${error.data.message}. Note: The project must be live before approving resources.`      
                    }, dispatch))
                }
                else {
                    dispatch(showAlert({
                        type:'error',
                        message: "Unable to get response from server"          
                    }, dispatch))
                }
                dispatch(actions.approveResourcesFailure(error));
            }
    }
}

export const declineResources = (body, projectId) => {
    return async dispatch => {
            dispatch(actions.declineResources());
            dispatch(showLoading());
            try {
                const response = await projectsApi.declineResources(body, projectId);
                response && dispatch(actions.declineResourcesSuccess(response.data));
                dispatch(getApproved(projectId));
                dispatch(getRequested(projectId));
                dispatch(setResourceList({}))
                dispatch(hideLoading());
            }
            catch(error){
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
                        message: "Unable to get response from server"          
                    }, dispatch))
                }
                dispatch(actions.declineResourcesFailure(error));
            }
    }
}
