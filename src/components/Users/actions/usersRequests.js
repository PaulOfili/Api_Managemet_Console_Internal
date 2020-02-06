import request from "../../../request/request"
import api from "../../../request/endpoints";

export const registerUser = (body) => { 
    let data = body
    let options = {
        ...api.registerUser(),
        data
    };
    return request.make(options, true)
}

export const assignRole = (body) => { 
    let data = body
    let options = {
        ...api.assignRole(),
        data
    };
    return request.make(options, true)
}

export const getUsers = () => { 
    let options = {
        ...api.getUsers(),
    };
    return request.make(options, true)
}

export const getUser = (username) => { 
    let options = {
        ...api.getUser(username),
    };
    return request.make(options, true)
}

export const deleteUser = (username) => { 
    let options = {
        ...api.deleteUser(username),
    };
    return request.make(options, true)
}
