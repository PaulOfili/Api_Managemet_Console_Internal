const routes = [

    {
        "route_id": "testapi",
        "route_definition": {
            "id": "testapi",
            "predicates": [
                {
                    "name": "Host",
                    "args": {
                        "_genkey_0": "**.apiaddrequestheader.org"
                    }
                },
                {
                    "name": "Path",
                    "args": {
                        "_genkey_0": "/headers"
                    }
                }
            ],
            "filters": [
                {
                    "name": "AddRequestHeader",
                    "args": {
                        "_genkey_0": "X-Request-ApiFoo",
                        "_genkey_1": "ApiBaz"
                    }
                }
            ],
            "uri": "http://httpbin.org:80",
            "order": 0
        },
        "order": 0
    },
    {
        "route_id": "newtest",
        "route_definition": {
            "id": "newtest",
            "predicates": [
                {
                    "name": "Host",
                    "args": {
                        "_genkey_0": "**.apiaddrequestheader.org"
                    }
                },
                {
                    "name": "Path",
                    "args": {
                        "_genkey_0": "/headers"
                    }
                }
            ],
            "filters": [
                {
                    "name": "AddRequestHeader",
                    "args": {
                        "_genkey_0": "X-Request-ApiFoo",
                        "_genkey_1": "ApiBar"
                    }
                }
            ],
            "uri": "http://httpbin.org:80",
            "order": 0
        },
        "order": 0
    },
    {
        "route_id": "testerapi",
        "route_definition": {
            "id": "testerapi",
            "predicates": [
                {
                    "name": "Host",
                    "args": {
                        "_genkey_0": "**.apiaddrequestheader.org"
                    }
                },
                {
                    "name": "Path",
                    "args": {
                        "_genkey_0": "/headers"
                    }
                }
            ],
            "filters": [
                {
                    "name": "AddRequestHeader",
                    "args": {
                        "_genkey_0": "X-Request-ApiFoo",
                        "_genkey_1": "ApiBar"
                    }
                }
            ],
            "uri": "http://httpbin.org:80",
            "order": 0
        },
        "order": 0
    },
    {
        "route_id": "passportoauthtoken",
        "route_definition": {
            "id": "passportoauthtoken",
            "predicates": [
                {
                    "name": "Path",
                    "args": {
                        "_genkey_0": "/passport/oauth/token"
                    }
                }
            ],
            "filters": [],
            "uri": "http://172.26.40.117:6060",
            "order": 0
        },
        "order": 0
    },
    {
        "route_id": "example",
        "route_definition": {
            "id": "example",
            "predicates": [
                {
                    "name": "Path",
                    "args": {
                        "_genkey_0": "/myPath"
                    }
                }
            ],
            "filters": [],
            "uri": "http://example.org",
            "order": 0
        },
        "order": 0
    }
]

//This would be performed on the server in a real app. Just stubbing in.
const delay = 1000;

const filterByRouteId = (id) => {
    return routes.filter((obj) =>
        obj.route_id === id
    );
}
  
class RouteApi {
    static getRoutes() {
        return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(Object.assign([], routes));
        }, delay);
        });
    }

    static refreshRoute() {
        return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(Object.assign([], routes));
        }, delay);
        });
    }

    static getRoute(id) {
        return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(Object.assign([], filterByRouteId(id)));
        }, delay);
        });
    }


    static saveRoute(apiId, route) {
        let obj;
        route = Object.assign({}, route); // to avoid manipulating object passed in.
        return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate server-side validation
            const minDefinitionLength = 1;
            if (route.predicates.length < minDefinitionLength) {
            reject(`Predicate must have at least ${minDefinitionLength} object.`);
            }
            if (route.route_id) {
            const existingRouteIndex = routes.findIndex(a => a.route_id === route.route_id);
            routes.splice(existingRouteIndex, 1, route);
            } else {
            // //Just simulating creation here.
            // //The server would generate ids for new intents in a real app.
            // //Cloning so copy returned is passed by value rather than by reference.
            // intent.id = generateId();
            // intent.questionId = generateId();
            obj = {
                route_id: apiId,
                route_definition: route,
                order: 0
            }

            obj.route_definition['order'] = 0;

            routes.push(obj);
            }

            resolve(obj);
        }, delay);
        }); 
    }

    static deleteRoute(routeId) {
        return new Promise((resolve, reject) => {
        setTimeout(() => {
            const indexOfRouteToDelete = routes.findIndex(route => route.route_id === routeId);
            routes.splice(indexOfRouteToDelete, 1);
            resolve();
        }, delay);
        });
    }
}

export default RouteApi;