import types from './auditConstants';

const initialState = {
    loading: false,
    audits: [],
    totalCount: 0,
    pageNum: 1,
    pageSize: 10
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_AUDITS:
            return (
                Object.assign({}, state, {
                    loading: true,
                })
            );
        case types.GET_AUDITS_SUCCESS:
            return (
                Object.assign({}, state, {
                    audits: action.payload.data,
                    totalCount: action.payload.count,
                    loading: false,
                })
            );
        case types.GET_AUDITS_FAILURE:
            return (
                Object.assign({}, state, {
                    loading: false,
                })
            );
        case types.SET_PAGENUM:
            return (
                Object.assign({}, state, {
                    pageNum: action.payload,
                })
            );
        case types.SET_PAGESIZE:
            return (
                Object.assign({}, state, {
                    pageSize: action.payload,
                })
            );
        default:
            return state;
    }
}