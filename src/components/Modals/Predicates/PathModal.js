import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import { Button, Form, Header, Icon, Message, Modal } from 'semantic-ui-react';
import { hideModal } from '../actions';

class PathModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            path: '',
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target;
         
        this.setState({
            [name]: value
        })
    }

    isValid = (name) => {
        if(name === '' || name === undefined)
            return 'Field can not be empty'
        if(validator.matches(name, /[/][a-zA-Z0-9/]+[*]*/g) === false || name.indexOf("//") !== -1 || name[0] !== '/')
            return `Path value should have a / in front of the URI and must be a valid URI Path without duplication of /`
        else
            return true
    }


    submitHandler = () => {
        //Do validations
        const { addToParent } = this.props;
        let obj = {
            Path: this.state.path
        }
        
        const isValid = this.isValid(this.state.path);

        if(isValid === true){
            addToParent('Path', obj);
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
            <Modal open={modalOpen} size='mini'>
                <Header icon='save' content='Add a New Path Predicate' />
                <Modal.Content>
                    <Form  warning={this.state.error} size='mini'>
                        <div>
                            <label>Path</label>
                            <input className='form-control' name='path' value={this.state.path} onChange={this.handleChange} type='text'/>
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
export default connect(mapStateToProps, mapDispatchToProps)(PathModal)