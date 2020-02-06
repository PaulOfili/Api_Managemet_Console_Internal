import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

var PASSPORT = process.env.REACT_APP_PASSPORT;
var CLIENTID = process.env.REACT_APP_CLIENT_ID;
var BASE_URL = process.env.REACT_APP_BASE_URL;

if(process.env.NODE_ENV !== 'development'){
    PASSPORT = window._env_.REACT_APP_PASSPORT;
    CLIENTID = window._env_.REACT_APP_CLIENT_ID;
    BASE_URL = window._env_.REACT_APP_BASE_URL;

}


class Header extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible: false
        }
    }

    toggleDropdown = () => {
        this.setState({
            visible: !this.state.visible
        })
    }

    render(){
        const { visible } = this.state;
        const { email } = this.props;

        return (
            <header className="site-header">
                <nav className="navbar navbar-expand-lg justify-content-end w-100 h-100">
                    {/* <a class="navbar-brand">Navbar</a> */}
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <div className="app-profile" onClick={this.toggleDropdown}>
                                <span className="app-profile-drop-span">{email}</span>
                                <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                                <div className={ visible ? "app-profile-drop active" : "app-profile-drop"}>
                                    {/* <div className="app-profile-drop-user">
                                        <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24"><path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                                        <span>{}</span>
                                    </div> */}
                                    <div className="app-profile-drop-signout">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"></path><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"></path></svg>
                                        <form action={`${PASSPORT}/logout`} method='get' style={{width: '100%', height: '100%'}}>       
                                            <input type='text' name='client_id' value={CLIENTID} readOnly hidden/>
                                            <input type='text' name='redirect_uri' value={BASE_URL} readOnly hidden/>
                                            <button type='submit' style={{background: "transparent", "border": "none", "color": "#d37b7b",  "cursor":"pointer", width: '100%', height: '100%', textAlign: 'left'}} className="">Logout</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}

Header.propTypes = {
    email: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
    return {
        email: state.account.userData.email
    }
}

export default connect(mapStateToProps)(Header);
