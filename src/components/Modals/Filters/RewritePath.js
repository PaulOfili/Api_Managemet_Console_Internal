import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import { Button, Form, Header, Icon, Message, Modal } from 'semantic-ui-react';
import { hideModal } from '../actions';

class RewritePath extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            path: '',
            replacement: '',
            error: false,
            message: ''

        }
    }

    handleChange = (e) => {
        const {name, value} = e.target;
         
        this.setState({
            [name]: value
        })
    }

    isValid = (name, value) => {
        if((name === '' || name === undefined) || (value === '' || value === undefined))
            return 'Field can not be empty'
        if(validator.matches(name, /^\/[a-z0-9]+$/i) === false)
            return `Path should be in the format /${name}`
        else
            return true
    }

    submitHandler = () => {
        const { addToParent } = this.props;
        let obj = {
            Path: this.state.path,
            Replacement: this.state.replacement
        }
        
        const isValid = this.isValid(this.state.path, this.state.replacement);

        if(isValid === true){
            addToParent('RewritePath', obj);
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
                <Header icon='save' content='RewritePath Filter' />
                <Modal.Content>
                    <Form size='mini' warning={this.state.error}>
                        <section className='d-flex flex-column'>
                            <div className='col-md-12 mb-3'>
                                <label>Path Regex</label>
                                <input className='form-control' name='path' value={this.state.path} onChange={this.handleChange} type='text'/>
                            </div>
                            <div className='col-md-12'>
                                <label>Replacement</label>
                                <input className='form-control' name='replacement' value={this.state.replacement} onChange={this.handleChange} type='text'/>
                            </div>
                        </section>
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
export default connect(mapStateToProps, mapDispatchToProps)(RewritePath)