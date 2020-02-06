import request from "../../../request/request";
import api from "../../../request/endpoints";

export const getAudits = (pageNum, pageSize, searchValue) => {
    let options = {}
    if(!searchValue || searchValue === '')
        options = {
            ...api.getAudits(pageNum, pageSize)
        };
    else 
        options = {
            ...api.searchAudits(pageNum, pageSize, searchValue)
        }
    return request.make(options, true)
}