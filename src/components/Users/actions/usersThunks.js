// import mockprojectApi from '../../../request/mockData';
import * as usersApi from './usersRequests';
import * as actions from './usersActions';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { showAlert } from '../../../alert';

export const registerUser = (body) => {
    return dispatch => {
            dispatch(actions.registerUser());
            dispatch(showLoading());
            usersApi.registerUser(body).then((response)=> {
                dispatch(hideLoading());
                dispatch(showAlert({
                    type:'success',
                    message: 'User added successfully'          
                }, dispatch))
                dispatch(actions.registerUserSuccess(response.data));
            }).catch((error) => {
                dispatch(hideLoading());
                dispatch(showAlert({
                    type:'error',
                    message: error.data.message        
                }, dispatch))
                dispatch(actions.registerUserFailure(error))
            })
    }
}

export const assignRole = (body) => {
    return dispatch => {
            dispatch(actions.assignRole());
            dispatch(showLoading());
            usersApi.assignRole(body).then((response)=> {
                dispatch(hideLoading());
                dispatch(showAlert({
                    type:'success',
                    message: 'Role updated successfully'          
                }, dispatch))
                dispatch(actions.assignRoleSuccess(response.data));
            }).catch((error) => {
                dispatch(hideLoading());
                dispatch(showAlert({
                    type:'error',
                    message: error.data.message          
                }, dispatch))
                dispatch(actions.assignRoleFailure(error))
            })
    }
}

export const getUser = (username) => {
    return dispatch => {
            dispatch(showLoading());
            dispatch(actions.getUser());
            usersApi.getUser(username)
                .then((response) => {
                    dispatch(hideLoading());
                    dispatch(actions.getUserSuccess(response.data));
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
                    message: "The user list can not be retrieved right now"         
                }, dispatch))
            dispatch(actions.getUserFailure(error))  
            })
    }
}

export const getUsers = () => {
    return dispatch => {
        dispatch(actions.getUsers());
        dispatch(actions.getUserSuccess({}));
        dispatch(showLoading());
        usersApi.getUsers()
                  .then((response) => {
                        dispatch(hideLoading());
                      dispatch(actions.getUsersSuccess(response.data));
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
                            message: "can't retrieve users right now"         
                        }, dispatch))
                dispatch(actions.getUserFailure(error))
                })
    }
}

export const deleteUser = (username) => {
    return dispatch => {
            dispatch(actions.deleteUser());
            dispatch(showLoading())
            usersApi.deleteUser(username).then((response)=> {
                dispatch(hideLoading());
                dispatch(showAlert({
                    type:'success',
                    message: "User deleted"         
                }, dispatch))
                dispatch(actions.deleteUserSuccess(response.data));
            }).catch((error) => {
                dispatch(hideLoading());
                dispatch(showAlert({
                    type:'error',
                    message: "can't delete product right now"         
                }, dispatch))
                dispatch(actions.deleteUserFailure(error))
            })
    }
}