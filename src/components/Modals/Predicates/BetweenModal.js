import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import moment from 'moment-timezone';
import { Button, Form, Header, Icon, Message, Modal } from 'semantic-ui-react';
import { hideModal } from '../actions';

class BetweenModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            before: moment().format("YYYY-MM-DD"),
            after: moment().add(1, 'days').format("YYYY-MM-DD"),
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target;
         
        this.setState({
            [name]: value
        })
    }

    isValid = (before, after) => {
        if((before === '' || before === undefined) || (after === '' || after === undefined))
            return 'Field can not be empty'
        if(validator.isAfter(after, before) === false)
            return 'End date must be after start date'
        else
            return true
    }

    submitHandler = () => {
        //Do validations
        const { addToParent } = this.props;

        const isValid = this.isValid(this.state.before, this.state.after);

        if(isValid === true){
            let timezone = moment.tz.guess();
            let afterTime = moment(this.state.after).tz(timezone).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
            let After = `${afterTime}[${timezone}]`;
            let beforeTime = moment(this.state.before).tz(timezone).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
            let Before = `${beforeTime}[${timezone}]`;

            let obj = {
                Before,
                After
            }
            addToParent('Between', obj);
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
                <Header icon='save' content='Add a New Between Predicate' />
                <Modal.Content>
                    <Form warning={this.state.error} size='mini'>
                        <section className='d-flex flex-column'>
                            <div className='col-md-12 mb-3'>
                                <label>Start</label>
                                <input className='form-control' name='before' value={this.state.before} onChange={this.handleChange} type='date'/>
                            </div>
                            <div className='col-md-12'>
                                <label>End</label>
                                <input className='form-control' name='after' value={this.state.after} onChange={this.handleChange} type='date'/>
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
export default connect(mapStateToProps, mapDispatchToProps)(BetweenModal)