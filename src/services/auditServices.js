import axios from './interceptor';
import EventEmitter from '../utils/EventEmitter';
import systemConfig from '../config/system';

class auditService extends EventEmitter {


    getAudits = (pageNum, pageSize) => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + `/audit?pageNum=${pageNum}&pageSize=${pageSize}`).then(response => {
                resolve(response.data)
            }).catch((error) => {
                if(error.data)
                    reject(error.data);
                reject(error);     
            });
        });
    };
    

    /* ---------------------------------------------- */
    /* The Following Methods are for searching */
    /* ---------------------------------------------- */
    searchAudits = (pageNum, pageSize, searchValue) => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + `/audit/search?pageNum=${pageNum}&pageSize=${pageSize}&searchValue=${searchValue}`).then(response => {
                resolve(response.data)
            }).catch((error) => {
                if(error.data)
                    reject(error.data);
                reject(error);     
            });
        });
    };

}

const instance = new auditService();

export default instance;