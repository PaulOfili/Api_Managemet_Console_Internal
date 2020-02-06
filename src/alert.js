const SHOW_ALERT = 'SHOW_ALERT';
const HIDE_ALERT = 'HIDE_ALERT';

export const showAlert = (payload, dispatch) => {
    setTimeout(() => (
        dispatch(hideAlert())
    ), 7000)
    return {
        type: SHOW_ALERT,
        payload
    }
}

export const hideAlert = () => {
    return {
        type: HIDE_ALERT
    }
}

const initialState = {
    visible: false,
    message: '',
    type: ''
}
export default function alert(state=initialState, action){
    switch (action.type) {
        case SHOW_ALERT:
            return (
                Object.assign({}, state, {
                    visible: true,
                    message: action.payload.message,
                    type: action.payload.type
                })
            );
        case HIDE_ALERT:
            return (
                Object.assign({}, state, {
                    visible: false,
                    message: '',
                    type: ''
                })
            );
        default:
            return state;
    }
}