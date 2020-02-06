import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Form, Button } from 'semantic-ui-react';
import { registerUser } from './actions/usersThunks';

class RegisterUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            nameError: false,
            role: 'USER',
            formError: false
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSelect = (e, {value}) => {
         
        this.setState({
            role: value
        })
    }
    onSubmit = () => {
        const { username, role } = this.state;

        const body =  {
            username,
            role
        }
        this.props.registerUser(body);

    }
    render(){

        const { username, nameError, role, formError } = this.state;
        const methodOptions =  [
            {
                key: 'ADMIN',
                text: 'ADMIN',
                value: 'ADMIN',
              },
              {
                  key: 'USER',
                  text: 'USER',
                  value: 'USER',
                },
        ]
        return (
            <section className='main-content'>
                <div className="sub-header">
                    <h3>Register User</h3>
                </div>
                <section className='content-wrapper route_section'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <Form loading={false} error={formError} size='mini'>
                                <Form.Field required>
                                    <label>Username</label>
                                    {
                                        nameError && <div className="ui pointing below prompt label">must contain alphabets only</div>
                                    }
                                    <Form.Input placeholder='Username' error={nameError} name='username' value={username} onChange={this.handleChange}/>    
                                </Form.Field>
                                <Form.Field required>
                                    <label>ROLE</label>
                                    <Dropdown
                                        disabled
                                        placeholder='Select Role'
                                        selectOnBlur={false}
                                        fluid
                                        selection
                                        name='role' 
                                        value={role} 
                                        onChange={this.handleSelect}
                                        options={methodOptions}
                                    />    
                                </Form.Field>
                                <Button onClick={this.onSubmit} size='mini'>Create</Button>
                            </Form>
                        </div>
                    </div>
                </section>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.users.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (body) => dispatch(registerUser(body))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);