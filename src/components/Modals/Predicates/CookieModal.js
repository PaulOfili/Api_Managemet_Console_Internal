import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import { Button, Form, Header, Icon, Message, Modal } from 'semantic-ui-react';
import { hideModal } from '../actions';

class CookieModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            regex: '',
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

    isValid = (name, regex) => {
        if(name === '' || name === undefined)
            return 'Field can not be empty'
        if(validator.isAlpha(name) === false)
            return 'only letters allowed'
        else
            return true
    }

    submitHandler = () => {
        //Do validations
        const { addToParent } = this.props;
        let obj = {
            Cookie: this.state.name,
            Regex: this.state.regex
        }
        
        const isValid = this.isValid(this.state.name, this.state.regex);

        if(isValid === true){
            addToParent('Cookie', obj);
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
                <Header icon='save' content='Add a New Cookie Predicate' />
                <Modal.Content>
                    <Form size='mini' warning={this.state.error}>
                        <section className='d-flex flex-column'>
                            <div className='col-md-12 mb-3'>
                                <label>Cookie Name</label>
                                <input className='form-control' name='name' value={this.state.name} onChange={this.handleChange} type='text'/>
                            </div>
                            <div className='col-md-12'>
                                <label>Regular expression(Optional)</label>
                                <input className='form-control' name='regex' value={this.state.regex} onChange={this.handleChange} type='text'/>
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
export default connect(mapStateToProps, mapDispatchToProps)(CookieModal)