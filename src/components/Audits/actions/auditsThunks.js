// import mockprojectApi from '../../../request/mockData';
import * as auditsApi from './auditsRequests';
import * as actions from './auditsActions';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { showAlert } from '../../../alert';

export const getAudits = (pageNum, pageSize, searchValue) => {
    return async dispatch => {
            dispatch(actions.getAuditsLoader());
            dispatch(showLoading());
            try {
                const response = await auditsApi.getAudits(pageNum, pageSize, searchValue)
                response && dispatch(actions.getAuditsSuccess(response.data));
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
                dispatch(actions.getAuditsFailure(error));
            }
    }
}