import types from '../constants';


export const showModal = (type, props) => {
    return {
        type: types.SHOW_MODAL,
        modalType: type,
        modalProps: props
    }
}

export const hideModal = () => {
    return {
        type: types.HIDE_MODAL
    }
}
