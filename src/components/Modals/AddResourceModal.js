import React from 'react';
import { connect } from 'react-redux';
// import validator from 'validator';
import { Button,  Dropdown, Form, Header, Icon, Message, Modal } from 'semantic-ui-react';
import { hideModal } from './actions';
import { createResource } from '../Products/actions/productsThunks';

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

class AddResourceModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            method: '',
            path: '',
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

    handleDropdown = (e, {value}) => {
         
        this.setState({
            method: value
        })
    }

    isValid = (name, method, path) => {
        if((name === '' || name === undefined) || (method === '' || method === undefined) || (path === '' || path === undefined))
            return 'Field can not be empty'
        if(name.length < 5)
            return 'Name must be between 5 and 50 characters long'
        if(path[0] !== '/')
            return `Path should be in the format /${path}`
        else
            return true
    }

    submitHandler = () => {
        const { productId } = this.props;
        const { name, method, path } = this.state;
        let obj = {
            name,
            method,
            path
        }
        
        const isValid = this.isValid(name, method, path);

        if(isValid === true){
            
            this.props.createResource(productId, obj, this.onSuccess)
        }
        else {
            this.setState({
                error: true,
                message: isValid
            })
        }
    }

     randomId (length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }
    onSuccess = () => {
        const { addToParent } = this.props;
        const { name, method, path } = this.state;
        let obj = {
            id: this.randomId(24),
            name,
            method,
            path
        }
        
        addToParent(obj);
        this.props.hideModal();
    }

    render(){
        const { hideModal, loading, modalOpen } = this.props;

        return (
            <Modal open={modalOpen} size='mini' style={{overflow: 'visible'}}>
                <Header icon='save' content='ADD A RESOURCE' />
                <Modal.Content>
                    <Form size='mini' warning={this.state.error}>
                        <section className='d-flex flex-column'>
                            <div className='col-md-12 mb-3'>
                                <label>Name</label>
                                <input className='form-control' name='name' value={this.state.name} onChange={this.handleChange} type='text'/>
                            </div>
                            <div className='col-md-12 mb-3'>
                                <label>Method</label>
                                <Dropdown
                                    placeholder='Select Method'
                                    selectOnBlur={false}
                                    fluid
                                    selection
                                    name='method' 
                                    value={this.state.method} 
                                    onChange={this.handleDropdown}
                                    options={methodOptions}
                                />
                            </div>
                            <div className='col-md-12'>
                                <label>Path</label>
                                <input className='form-control' name='path' value={this.state.path} onChange={this.handleChange} type='text'/>
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
        loading: state.products.loading,
        productId: state.products.product.id,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        hideModal: () => dispatch(hideModal()),
        createResource: (id, body, callback) => dispatch(createResource(id, body, callback))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddResourceModal)