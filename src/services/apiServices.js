import axios from './interceptor';
import EventEmitter from '../utils/EventEmitter';
import systemConfig from '../config/system';

class apiService extends EventEmitter {

     /* ---------------------------------------------- */
    /* The Following Methods are for products */
    /* ---------------------------------------------- */

    createProduct = (payload) => {
        return new Promise((resolve, reject) => {
            axios.post(systemConfig.serverBaseUrl + '/products', {
                ...payload
            }).then(response => {
                resolve(response.data)
            }).catch((error) => {
                if(error.data)
                    reject(error.data);
                reject(error);     
            });
        });
    };
     
    getAllProducts = () => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + '/products').then(response => {
                resolve(response.data)
            }).catch((error) => {
                if(error.data)
                    reject(error.data);
                reject(error);     
            });
        });
    };

    getSingleProduct = (productID) => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + `/products/${productID}`).then(response => {
                resolve(response.data)
            }).catch((error) => {
                if(error.data)
                    reject(error.data);
                reject(error);     
            });
        });
    };

    updateProduct = (payload) => {
        return new Promise((resolve, reject) => {
            axios.put(systemConfig.serverBaseUrl + `/products`, {
                ...payload
            }).then(response => {
                resolve(response.data)
            }).catch((error) => {
                if(error.data)
                    reject(error.data);
                reject(error);     
            });
        });
    };

    deleteProduct = (productID) => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + `/products/${productID}`).then(response => {
                resolve(response.data)
            }).catch((error) => {
                if(error.data)
                    reject(error.data);
                reject(error);     
            });
        });
    };

    /* ---------------------------------------------- */
    /* The Following Methods are for Routes */
    /* ---------------------------------------------- */
    
    getRoute = (routeId) => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + `/actuator/gateway/routes/${routeId}`).then(response => {
                resolve(response.data)
            }).catch((error) => {
                if(error.data)
                    reject(error.data);
                reject(error);     
            });
        });
    };

    updateRoute = (payload) => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + `/actuator/gateway/routes/`, {
                ...payload
            }).then(response => {
                resolve(response.data)
            }).catch((error) => {
                if(error.data)
                    reject(error.data);
                reject(error);     
            });
        });
    };

    /* ----------------------------------------------------------*/
    /* The Following Methods are for Routes Environments Config */
    /* --------------------------------------------------------*/
    getRouteEnviron = (routeId) => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + `/env/${routeId}`).then(response => {
                resolve(response.data)
            }).catch((error) => {
                if(error.data)
                    reject(error.data);
                reject(error);     
            });
        });
    };

    updateRouteEnviron = (payload) => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + `/env`, {
                ...payload
            }).then(response => {
                resolve(response.data)
            }).catch((error) => {
                if(error.data)
                    reject(error.data);
                reject(error);     
            });
        });
    };
}

const instance = new apiService();

export default instance;