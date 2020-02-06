import request from "../../../request/request"
import api from "../../../request/endpoints";


export const getProjects = () => { 
    let options = {
        ...api.getProjects(),
    };
    return request.make(options, true)
}

export const getProject = (projectId) => { 
    let options = {
        ...api.getProject(projectId),
    };
    return request.make(options, true)
}

export const getRequested = (projectId) => { 
    let options = {
        ...api.getRequested(projectId),
    };
    return request.make(options, true)
}

export const getApproved = (projectId) => { 
    let options = {
        ...api.getApproved(projectId),
    };
    return request.make(options, true)
}

export const approveResources = (body, projectId) => { 
    let data = body
    let options = {
        ...api.approveResources(projectId),
        data
    };
    return request.make(options, true)
}

export const declineResources = (body, projectId) => { 
    let data = body
    let options = {
        ...api.declineResources(projectId),
        data
    };
    return request.make(options, true)
}
