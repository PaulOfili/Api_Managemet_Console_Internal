import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import { Button, Form, Header, Icon, Message, Modal } from 'semantic-ui-react';
import { hideModal } from '../actions';

class RedirectTo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            status: '',
            url: '',
            error: false,
            message: ''

        }
    }

    handleChange = (e) => {
        const {name, value} = e.target;
         
        this.setState({
            error: false,
            [name]: value
        })
    }

    isValid = (status, url) => {
        if((status === '' || status === undefined) || (url === '' || url === undefined))
            return 'Field can not be empty'
        if(status.length > 3)
            return 'Status must be a valid HTTP status code'
        if(validator.matches(status, /[1-5][0-9][0-9]/) === false)
            return 'Status must be a valid HTTP status code'
        if(validator.isURL(url, {require_host: false}) === false)
            return 'URL must be valid'
        else
            return true
    }

    submitHandler = () => {
        const { addToParent } = this.props;
        let obj = {
            Status: this.state.status,
            URL: this.state.url
        }
        
        const isValid = this.isValid(this.state.status, this.state.url);

        if(isValid === true){
            addToParent('RedirectTo', obj);
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
                <Header icon='save' content='RedirectTo Filter' />
                <Modal.Content>
                    <Form size='mini' warning={this.state.error}>
                        <section className='d-flex flex-column'>
                            <div className='col-md-12 mb-3'>
                                <label>Status</label>
                                <input className='form-control' name='status' value={this.state.status} onChange={this.handleChange} type='text'/>
                            </div>
                            <div className='col-md-12'>
                                <label>Url</label>
                                <input className='form-control' name='url' value={this.state.url} onChange={this.handleChange} type='text'/>
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
export default connect(mapStateToProps, mapDispatchToProps)(RedirectTo)