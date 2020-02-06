import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import moment from 'moment-timezone';
import { Button, Form, Header, Icon, Message, Modal } from 'semantic-ui-react';
import { hideModal } from '../actions';

class AfterModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            after: moment().format("YYYY-MM-DD"),
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

    isValid = (date) => {
        if(date === '' || date === undefined)
            return 'Field can not be empty'
        if(validator.isAfter(date) === false)
            return 'Selected date must be after current date'
        else
            return true
    }
    submitHandler = () => {
        //Do validations
        const { addToParent } = this.props;
        const isValid = this.isValid(this.state.after);

        if(isValid === true){
            let timezone = moment.tz.guess();
            let dateTime = moment(this.state.after).tz(timezone).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
            let predicateString = `${dateTime}[${timezone}]`;
            let obj = {
                After: predicateString
            }
            addToParent('After', obj);
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
                <Header icon='save' content='Add a New After Predicate' />
                <Modal.Content>
                    <Form warning={this.state.error} size='mini'>
                        <div>
                            <label>After</label>
                            <input className='form-control' name='after' value={this.state.after} onChange={this.handleChange} type='date'/>
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
export default connect(mapStateToProps, mapDispatchToProps)(AfterModal)