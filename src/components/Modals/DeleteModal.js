import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from './actions';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const DeleteModal = ({hideModal, modalOpen, modalProps}) => (
  <Modal open={modalOpen} basic size='mini'>
    <Header icon='archive' content='Warning' />
    <Modal.Content>
      <p>
       {modalProps.message}
      </p>
    </Modal.Content>
    <Modal.Actions>
      <Button basic color='red' inverted onClick={() => hideModal()}>
        <Icon name='remove' /> No
      </Button>
      <Button color='green' inverted onClick={() => modalProps.action()}>
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
)

const mapStateToProps = (state) => {
    return {
        modalOpen: state.modal.modalOpen,
        modalProps: state.modal.modalProps,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        hideModal: () => dispatch(hideModal()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal)