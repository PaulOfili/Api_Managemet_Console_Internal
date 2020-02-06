const initialState = {
    modalType: null,
    modalOpen: false,
    modalProps: {},
    alertOpen: false,
    alertHeader: '',
    alertContent: ''
  }
  
export default function modal(state = initialState, action) {
    switch (action.type) {
      case 'SHOW_MODAL':
        return {
          modalType: action.modalType,
          modalOpen: true,
          modalProps: action.modalProps
        }
      case 'HIDE_MODAL':
        return initialState
      case 'SHOW_ALERT':
        return {
          alertOpen: true,
          alertHeader: action.alertHeader,
          alertContent: action.alertContent
        }
      case 'HIDE_ALERT':
        return initialState
      default:
        return state
    }
  }