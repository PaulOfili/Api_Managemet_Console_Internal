import axios from './interceptor';
import EventEmitter from '../utils/EventEmitter';
import systemConfig from '../config/system';

class projectsService extends EventEmitter {



    getAllProjects = () => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + '/golive/pending').then(response => {
                resolve(response.data)
            }).catch((error) => {
                if(error.data)
                    reject(error.data);
                reject(error);     
            });
        });
    };

    /* ---------------------------------------------- */
    /* The Following Methods are for a single project */
    /* ---------------------------------------------- */

    getProjectById = (project_id) => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + `/projects/${project_id}`).then(response => {
                resolve(response.data)
            }).catch((error) => {
                if(error.data)
                    reject(error.data);
                reject(error);     
            });
        });
    };

    updateProject = (payload) => {
        return new Promise((resolve, reject) => {
            axios.put(systemConfig.serverBaseUrl + `/projects`, {
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

    /* ---------------------------------------------- */
    /* The Following Methods are for all requested resources */
    /* ---------------------------------------------- */

    getAllRequestedResources = (project_id) => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + `/projects/${project_id}/requested`).then(response => {
                resolve(response.data)
            }).catch((error) => {
                if(error.data)
                    reject(error.data);
                reject(error);     
            });
        });
    };

    /* -----------------------------------------------------*/
    /* The Following Methods are for all approved resources */
    /* -----------------------------------------------------*/

    getAllApprovedResources = (project_id) => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + `/projects/${project_id}/approved`).then(response => {
                resolve(response.data)
            }).catch((error) => {
                if(error.data)
                    reject(error.data);
                reject(error);     
            });
        });
    };

}

const instance = new projectsService();

export default instance;