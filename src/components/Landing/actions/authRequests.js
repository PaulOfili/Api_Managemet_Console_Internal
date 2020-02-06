import request from "../../../request/request";
import api from "../../../request/endpoints";

export const logoutRequest = () => {
    let options = {
        ...api.logout,
        params: {
            "client_id": process.env.NODE_ENV === 'development' ? process.env.REACT_APP_CLIENT_ID : window._env_.REACT_APP_CLIENT_ID,
            "redirect_uri": process.env.NODE_ENV === 'development' ? process.env.REACT_APP_BASE_URL : window._env_.REACT_APP_BASE_URL,
        }
    };
    return request.make(options)
}