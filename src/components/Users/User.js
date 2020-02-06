import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Spin } from 'antd';
import { Dropdown, Form, Button, Message } from 'semantic-ui-react';
import { assignRole, getUser } from './actions/usersThunks';

class User extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            nameError: false,
            role: '',
            roleError: false,
            formError: false
        }
    }

    //This should be a useEffect and the change it should be waiting for is match.params.id
    componentDidMount(){
        const { getUser, match } = this.props;
        getUser(match.params.id);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.user.id !== this.props.user.id){
            let { username, role } = this.props.user;
            this.setState({
                name: username,
                role
            });
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
        const { name, role } = this.state;

        const body =  {
            username:name,
            role
        }
        this.props.assignRole(body);

    }
    render(){
        const { name, nameError, role, formError } = this.state;
        const { loading, user } = this.props;
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
                    <h3>User</h3>
                </div>
                {
                    !user.id && loading ? 
                    
                    <div className="d-flex w-100 h-100 align-items-center justify-content-center">
                        <Spin />
                     </div> :
                    (
                    !user.id && !loading ?
                    <section>
                        <Message.Header>Unavailable</Message.Header>
                        <p>
                            Information not available go back to <Link to='/dashboard/users'>Users</Link> page
                        </p>
                    </section>
                    :
                    <section className='content-wrapper route_section'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <Form loading={loading} error={formError} size='mini'>
                                <Form.Field required>
                                    <label>Username</label>
                                    <Form.Input placeholder='Username' error={nameError} name='name' value={name} onChange={this.handleChange}/>    
                                </Form.Field>
                                <Form.Field required>
                                    <label>ROLE</label>
                                    <Dropdown
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
                                <Button onClick={this.onSubmit} size='mini'>Update</Button>
                            </Form>
                            </div>
                        </div>
                    </section>
                    )

                }
                
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.users.user,
        loading: state.users.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        assignRole: (body) => dispatch(assignRole(body)),
        getUser: (username) => dispatch(getUser(username))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));