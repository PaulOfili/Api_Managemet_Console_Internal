import request from "../../../request/request"
import api from "../../../request/endpoints";

export const saveProduct = (body) => { 
    let data = body
    let options = {
        ...api.saveProduct(),
        data
    };
    return request.make(options, true)
}

export const updateProduct = (body) => { 
    let data = body
    let options = {
        ...api.updateProduct(),
        data
    };
    return request.make(options, true)
}

export const getProducts = () => { 
    let options = {
        ...api.getProducts(),
    };
    return request.make(options, true)
}

export const getProduct = (productId) => { 
    let options = {
        ...api.getProduct(productId),
    };
    return request.make(options, true)
}

export const createResource = (productId, body) => { 
    let data = body
    let options = {
        ...api.saveResource(productId),
        data
    };
    return request.make(options, true)
}

export const updateResource = (productId, body) => { 
    let data = body
    let options = {
        ...api.updateResource(productId),
        data
    };
    return request.make(options, true)
}

export const getResources = (productId) => { 
    let options = {
        ...api.getResources(productId),
    };
    return request.make(options, true)
}

// export const getResource = (productId) => { 
//     let options = {
//         ...api.getResource(productId),
//     };
//     return request.make(options, true)
// }

export const deleteProduct = (productId) => { 
    let options = {
        ...api.deleteProduct(productId),
    };
    return request.make(options, true)
}

export const deleteResource = (productId, resoureId) => { 
    let options = {
        ...api.deleteResource(productId, resoureId),
    };
    return request.make(options, true)
}