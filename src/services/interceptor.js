import axios from 'axios'
import systemConfig from '../config/system';
import { getSession } from '../session/cookies';

const AxiosInstance = axios.create({
    baseURL: systemConfig.serverBaseUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})


AxiosInstance.interceptors.request.use(function (config) {
    const token = getSession('access_token');
    config.headers.Authorization =  `Bearer ${token}`;

    return config;
});

AxiosInstance.interceptors.response.use((response) =>{
    return response;
}, (error) => {
    let token = getSession('access_token');
    if (!error.response) {
       return Promise.reject('Network Error')
    }
    else if ((error.response.status === 401)) {
        alert("You are not authorized, Kindly Logout and Login again")
        window.location.href = '/'
    }
    else if ((error.response.status === 500 && typeof token === 'object')) {
        alert("You are not authorized, Kindly Logout and Login again")
        window.location.href = '/'
    }
     else {
        return Promise.reject(error.response)
    }

})

export default AxiosInstance