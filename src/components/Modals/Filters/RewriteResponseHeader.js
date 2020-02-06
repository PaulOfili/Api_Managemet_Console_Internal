import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Header, Icon, Message, Modal } from 'semantic-ui-react';
import { hideModal } from '../actions';

class RewriteResponseHeader extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            regex: '',
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

    isValid = (name, regex, replacement) => {
        if((name === '' || name === undefined) || (regex === '' || regex === undefined) || (replacement === '' || replacement === undefined))
            return 'Field can not be empty'
        else
            return true
    }

    submitHandler = () => {
        const { addToParent } = this.props;
        let obj = {
            Name: this.state.name,
            Regex: this.state.regex,
            Replacement: this.state.replacement
        }
        
        const isValid = this.isValid(this.state.path, this.state.replacement);

        if(isValid === true){
            addToParent('RewriteResponseHeader', obj);
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
                <Header icon='save' content='RewriteResponseHeader Filter' />
                <Modal.Content>
                    <Form size='mini' warning={this.state.error}>
                        <section className='d-flex flex-column'>
                            <div className='col-md-12 mb-3'>
                                <label>Name</label>
                                <input className='form-control' name='name' value={this.state.name} onChange={this.handleChange} type='text'/>
                            </div>
                            <div className='col-md-12'>
                                <label>Regex</label>
                                <input className='form-control' name='regex' value={this.state.regex} onChange={this.handleChange} type='text' placeholder='Please use $\ to mean $'/>
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
export default connect(mapStateToProps, mapDispatchToProps)(RewriteResponseHeader)