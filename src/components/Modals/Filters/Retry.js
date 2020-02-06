import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import { Button, Form, Header, Icon, Message, Modal } from 'semantic-ui-react';
import { hideModal } from '../actions';

class Retry extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            retries: '',
            statuses: '',
            methods: '',
            series: '',
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

    isValid = (retries, statuses, methods, series) => {
        if((retries === '' || retries === undefined) || (statuses === '' || statuses === undefined) || (methods === '' || methods === undefined) || (series === '' || series === undefined))
            return 'Field can not be empty'
        if(validator.isNumeric(retries, {no_symbols: true}) === false)
            return 'Series field must be a number'
        else
            return true
    }

    submitHandler = () => {
        const { addToParent } = this.props;
        const { retries, statuses, methods, series } = this.props;
        let obj = {
            Retries: retries,
            Statuses: statuses,
            Methods: methods,
            Series: series
        }
        
        const isValid = this.isValid(retries, statuses, methods, series);

        if(isValid === true){
            addToParent('Retry', obj);
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
                <Header icon='save' content='Retry Filter' />
                <Modal.Content>
                    <Form size='mini' warning={this.state.error}>
                        <section className='d-flex flex-column'>
                            <div className='col-md-12 mb-3'>
                                <label>Retries</label>
                                <input className='form-control' name='retries' value={this.state.retries} onChange={this.handleChange} type='text'/>
                            </div>
                            <div className='col-md-12'>
                                <label>Statuses</label>
                                <input className='form-control' name='statuses' value={this.state.statuses} onChange={this.handleChange} type='text'/>
                            </div>
                            <div className='col-md-12 mb-3'>
                                <label>Methods</label>
                                <input className='form-control' name='methods' value={this.state.methods} onChange={this.handleChange} type='text'/>
                            </div>
                            <div className='col-md-12'>
                                <label>Series</label>
                                <input className='form-control' name='series' value={this.state.series} onChange={this.handleChange} type='text'/>
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
export default connect(mapStateToProps, mapDispatchToProps)(Retry)