import axios from './interceptor';
import EventEmitter from '../utils/EventEmitter';
import systemConfig from '../config/system';

class authService extends EventEmitter {


    resolveRole = (username) => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + `/users${username}`).then(response => {
                resolve(response.data)
            }).catch((error) => {
                if(error.data && (error.data.status = 404)){
                    axios.post(systemConfig.serverBaseUrl + `/users`, {
                        username: username,
                        role: "USER"
                    }).then(response => {
                        resolve(response.data)
                    }).catch((error) => {
                        if(error.data)
                            reject(error.data);
                        reject(error);     
                    });
                }
            })
        });
    };

}

const instance = new authService();

export default instance;