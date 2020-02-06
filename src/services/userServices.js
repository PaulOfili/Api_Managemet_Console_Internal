import axios from './interceptor';
import EventEmitter from '../utils/EventEmitter';
import systemConfig from '../config/system';

class userService extends EventEmitter {


    getAllUsers = () => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + '/users').then(response => {
                resolve(response.data)
            }).catch((error) => {
                if(error.data)
                    reject(error.data);
                reject(error);     
            });
        });
    };

    /* ---------------------------------------------- */
    /* The Following Methods are for a single product */
    /* ---------------------------------------------- */

    getSingleUser = ({ username }) => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + `/users/${username}`).then(response => {
                resolve(response.data)
            }).catch((error) => {
                if(error.data)
                    reject(error.data);
                reject(error);     
            });
        });
    };

    updateUser = (payload) => {
        return new Promise((resolve, reject) => {
            axios.put(systemConfig.serverBaseUrl + `/users`, {
                ...payload
            }).then(response => {
                resolve(response.data);
            }).catch((error) => {
                if(error.data)
                    reject(error.data);
                reject(error);     
            });
        });
    };

    deleteUser = ({ username }) => {
        return new Promise((resolve, reject) => {
            axios.delete(systemConfig.serverBaseUrl + `/users/${username}`).then(response => {
                resolve(response.data)
            }).catch((error) => {
                if(error.data)
                    reject(error.data);
                reject(error);     
            });
        });
    };

}

const instance = new userService();

export default instance;