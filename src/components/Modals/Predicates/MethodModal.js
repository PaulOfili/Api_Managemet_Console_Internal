import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import { Button, Dropdown, Form, Header, Icon, Message, Modal } from 'semantic-ui-react';
import { hideModal } from '../actions';

const methodOptions = [
    {
      key: 'Get',
      text: 'Get',
      value: 'GET',
    },
    {
        key: 'Connect',
        text: 'Connect',
        value: 'CONNECT',
    },
    {
        key: 'Delete',
        text: 'Delete',
        value: 'DELETE',
    },
    {
        key: 'Head',
        text: 'Head',
        value: 'HEAD',
    },
    {
        key: 'Options',
        text: 'Options',
        value: 'OPTIONS',
    },
    {
        key: 'Patch',
        text: 'Patch',
        value: 'PATCH',
    },
    {
        key: 'Post',
        text: 'Post',
        value: 'POST',
    },
    {
        key: 'Put',
        text: 'Put',
        value: 'PUT',
    },
    {
        key: 'Trace',
        text: 'Trace',
        value: 'TRACE',
    }
]
class MethodModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            method: '',
            error: false,
            message: ''
        }
    }

    handleChange = (e, {value}) => {
         
        this.setState({
            method: value
        })
    }

    isValid = (name) => {
        if(name === '' || name === undefined)
            return 'Field can not be empty'
        if(validator.isIn(name.toLowerCase(), ['get', 'connect', 'delete', 'head', 'options', 'patch', 'post', 'put', 'trace']) === false)
            return 'only valid HTTP methods allowed'
        else
            return true
    }

    submitHandler = () => {
        const { addToParent } = this.props;
        let obj = {
            Method: this.state.method,
        }
        
        const isValid = this.isValid(this.state.method);

        if(isValid === true){
            addToParent('Method', obj);
            this.props.hideModal();
        }
        else {
            this.setState({
                error: true,
                message: isValid
            })
        }
    }

    render(){
        const { hideModal, loading, modalOpen } = this.props;

        return (
            <Modal open={modalOpen} size='tiny' style={{overflow: 'visible'}}>
                <Header icon='save' content='Add a New Method Predicate' />
                <Modal.Content>
                    <Form warning={this.state.error} size='mini'>
                        <div>
                            <label>Method</label>
                            <Dropdown
                                placeholder='Select Method'
                                selectOnBlur={false}
                                fluid
                                selection
                                name='method' 
                                value={this.state.method} 
                                onChange={this.handleChange}
                                options={methodOptions}
                            />
                        </div>
                        <Message 
                            warning
                            header='Could you check something!'
                            list={[this.state.message]}
                        />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => hideModal()} color='red' size='tiny'>
                        <Icon name='remove' /> Cancel
                    </Button>
                    <Button onClick={this.submitHandler} color='green' loading={loading ? true : false} size='tiny'>
                        <Icon name='checkmark' /> Add
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        modalOpen: state.modal.modalOpen,
        modalProps: state.modal.modalProps,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        hideModal: () => dispatch(hideModal())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MethodModal)