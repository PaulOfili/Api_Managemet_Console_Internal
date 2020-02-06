var hostname = process.env.REACT_APP_HOST_NAME;
var PASSPORT = process.env.REACT_APP_PASSPORT;

if(process.env.NODE_ENV !== 'development'){
    hostname = window._env_.REACT_APP_HOST_NAME;
    PASSPORT = window._env_.REACT_APP_PASSPORT;
}

// const passport = process.env.PASSPORT_URL || 'http://172.26.40.117:6060/passport/oauth';

export default {
    // AUTH
    "logout": {
        "url": `${hostname}/passport/logout`,
        "method": "GET",
        encode: false

    },
    "logoutDueToWrongEmail": {
        "url": `${PASSPORT}/logout`,
        "method": "GET",
        encode: false
    },
    //ROUTES ENVIRONMENT CONFIGURATIONS
    "saveRouteEnvironment": () => {
        return {
            "url": `${hostname}/env`,
            "method": "POST"
        }
    },
    "getRouteEnvironment": (apiId) => {
        return {
            "url": `${hostname}/env/${apiId}`,
            "method": "GET"
        }
    },
    "updateRouteEnvironment": () => {
        return {
            "url": `${hostname}/env/`,
            "method": "PUT"
        }
    },

    //APIS AND ROUTES
    "saveRoute": (apiId) => {
        return {
            "url": `${hostname}/actuator/gateway/routes/${apiId}`,
            "method": "POST"
        }
    },
    "updateRoute": (apiId) => {
        return {
            "url": `${hostname}/actuator/gateway/routes/${apiId}`,
            "method": "POST"
        }
    },
    "getRoutes": () => {
        return {
            "url": `${hostname}/actuator/gateway/routes`,
            "method": "GET"
        }
    },
    "getRoute": (apiId) => {
        return {
            "url": `${hostname}/actuator/gateway/routes/${apiId}`,
            "method": "GET"
        }
    },
    "refreshRoute": () => {
        return {
            "url": `${hostname}/actuator/bus-refresh`,
            "method": "POST"
        }
    },
    "deleteRoute": (apiId) => {
        return {
            "url": `${hostname}/actuator/gateway/routes/${apiId}`,
            "method": "DELETE"
        }
    },
    // PRODUCTS
    "saveProduct": () => {
        return {
            "url": `${hostname}/products`,
            "method": "POST"
        }
    },
    "updateProduct": () => {
        return {
            "url": `${hostname}/products/`,
            "method": "PUT"
        }
    },
    "getProducts": () => {
        return {
            "url": `${hostname}/products`,
            "method": "GET"
        }
    },
    "getProduct": (productID) => {
        return {
            "url": `${hostname}/products/${productID}`,
            "method": "GET"
        }
    },
    "deleteProduct": (productID) => {
        return {
            "url": `${hostname}/products/${productID}`,
            "method": "DELETE"
        }
    },
    // PRODUCT RESOURCES
    "saveResource": (productID) => {
        return {
            "url": `${hostname}/products/${productID}/resources`,
            "method": "POST"
        }
    },
    "getResources": (productID) => {
        return {
            "url": `${hostname}/products/${productID}/resources`,
            "method": "GET"
        }
    },
    "updateResource": (productID) => {
        return {
            "url": `${hostname}/products/${productID}/resources`,
            "method": "PUT"
        }
    },
    "deleteResource": (productID, resourceID) => {
        return {
            "url": `${hostname}/products/${productID}/resources/${resourceID}`,
            "method": "DELETE"
        }
    },

    // CLIENT PERMISSIONS
    "getProjects": () => {
        return {
            "url": `${hostname}/golive/pending`,
            "method": "GET"
        }
    },
    "getProject": (projectId) => {
        return {
            "url": `${hostname}/projects/${projectId}`,
            "method": "GET"
        }
    },
    "getRequested": (projectId) => {
        return {
            "url": `${hostname}/projects/${projectId}/requested`,
            "method": "GET"
        }
    },
    "getApproved": (projectId) => {
        return {
            "url": `${hostname}/projects/${projectId}/approved`,
            "method": "GET"
        }
    },
    "approveResources": (projectId) => {
        return {
            "url": `${hostname}/golive/approve/${projectId}`,
            "method": "POST"
        }
    },
    "declineResources": (projectId) => {
        return {
            "url": `${hostname}/golive/decline/${projectId}`,
            "method": "POST"
        }
    },

    //USERS
    "registerUser": () => {
        return {
            "url": `${hostname}/users`,
            "method": "POST"
        }
    },
    "assignRole": () => {
        return {
            "url": `${hostname}/users`,
            "method": "PUT"
        }
    },
    "getUsers": () => {
        return {
            "url": `${hostname}/users`,
            "method": "GET"
        }
    },
    "getUser": (username) => {
        return {
            "url": `${hostname}/users/${username}`,
            "method": "GET"
        }
    },
    "deleteUser": (username) => {
        return {
            "url": `${hostname}/users/delete/${username}`,
            "method": "DELETE"
        }
    },
    //AUDITS
    "getAudits": (pageNum, pageSize) => {
        return {
            "url": `${hostname}/audit?pageNum=${pageNum}&pageSize=${pageSize}&searchValue=failed`,
            "method": "GET"
        }
    },
    "searchAudits": (pageNum, pageSize, searchValue) => {
        return {
            "url": `${hostname}/audit?searchValue=${searchValue}&pageNum=${pageNum}&pageSize=${pageSize}`,
            "method": "GET"
        }
    },
}