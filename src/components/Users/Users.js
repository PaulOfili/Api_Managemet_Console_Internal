import React, { useEffect, useState } from 'react';
import UsersTable from './UsersTable';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Access from '../common/Access';
import { getUsersSuccess } from './actions/usersActions';
import * as usersRequests from "./actions/usersThunks";
import { Input } from 'antd';

const { Search } = Input;

function Users({ getUsers, users }){

    const [searchText, setSearchText] = useState('');
    const [userListBySearch, setUserListBySearch] = useState([]);

    useEffect(() => {
        getUsers();
    }, [getUsers])

    useEffect(() => {
        setUserListBySearch([...users])
    }, [users])

    const handleChange = (e) => {
        setSearchText(e.target.value)
    }

    const onSearch = () => {
        const newUserList = users.filter(user => user.username.includes(searchText));
        setUserListBySearch(newUserList);
    }

    const data = userListBySearch.map((user, index) => {
        const {  username, role } = user
        return {
            key: index,
            username,
            role
        }
    })
    return (
        <section className='main-content'>
            <div className="sub-header">
                <h3>Users</h3>
            </div>
            <section className='content-wrapper route_section'>
                <div className="splitroutes-text">
                    <div className="item">Here you can add, remove and modify users</div>
                    <div className="item">Note that only users listed below can access the portal.</div>
                </div>
                <div className='m-5'>
                    <Search placeholder="Search by Username" size='large' onChange={handleChange} onSearch={onSearch} value={searchText} allowClear enterButton />
                </div>
                <section className='splitroutes-new d-flex justify-content-end'>
                    <div className="button-area">
                        <Access>
                            <Link to="/dashboard/users/register">
                                <button className="btn btn-primary btn-micro button-width" style={{"margin": "0", "height": "30px", "fontSize": "0.7em"}} type="button">+ Register User</button>
                            </Link>
                        </Access>
                    </div>
                </section>
                <section className='splitroutes-tablearea'>
                    <UsersTable data={data}/>
                </section>
            </section>
        </section>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        ...usersRequests,
        getUsersSuccess
    }, dispatch)
  };
export default connect(mapStateToProps, mapDispatchToProps)(Users);