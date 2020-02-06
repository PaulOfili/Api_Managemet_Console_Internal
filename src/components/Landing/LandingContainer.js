import React, { Component } from 'react';
import cuid from 'cuid';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import querystring from 'query-string';
import LandingNav from './LandingNav';
import { loginFailure, logout } from './actions/authActions';
import { loginUser } from './actions/authThunk';
import * as jwt_decode from 'jwt-decode';

var PASSPORT = process.env.REACT_APP_PASSPORT;
var CLIENTID = process.env.REACT_APP_CLIENT_ID;
var BASE_URL = process.env.REACT_APP_BASE_URL;

if(process.env.NODE_ENV !== 'development'){
    PASSPORT = window._env_.REACT_APP_PASSPORT;
    CLIENTID = window._env_.REACT_APP_CLIENT_ID;
    BASE_URL = window._env_.REACT_APP_BASE_URL;

}

class LandingContainer extends Component {
  constructor(props) {
    super(props);
    this.myLogoutForm = React.createRef();
  }

  componentDidMount = () => {
    const { loginUser, loginFailure, logout } = this.props;
    let hash;
    let query;
    try {
      hash = this.props.location.hash
      query = this.props.location.search
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        /* eslint-disable no-console */
        console.error(err)
        /* eslint-enable no-console */
      }
    }
    if(hash){
      const response = querystring.parse(hash.substr(1))
      
      if (response.access_token) {
        const decoded_token = this.decodeToken(response.access_token)

        if (this.isEmailValid(decoded_token.email)) {
          loginUser(response.access_token);
        } else {
          this.myLogoutForm.current.submit();
        }

      } else {
        loginFailure(response.error || "Invalid Access token")
      }
    }

    if(query){
      const parsed = querystring.parse(query);
      if(parsed.message === 'Logout successful'){
        logout()
      }
    }
  }

  isEmailValid = (email) => {
    return email.indexOf("@interswitch") !== -1
  }

  decodeToken = (token) => {
    return jwt_decode(token)
  }
    render(){
      const { userData } = this.props;

      return (
        <section className='login__base'>
            {
              userData.client_id ? <Redirect to="/dashboard"/>
              :
              <section>
                <LandingNav />
                <div className="landing-wrapper text-center">

                    <h2>Administrator Portal</h2>
                    <div className="h5 ">Welcome to Administrator Portal</div>

                    <strong style={{color: 'red'}}>If you do not have Interswitch domain email that is <span style={{fontStyle: 'italic'}}>@interswitch</span>, you will not be able to successfully sign in to the platform.</strong>
                </div>
                <section className="login-card passport-container center-block">
                  <form action={`${PASSPORT}/oauth/authorize`} method='get'>       
                      <input type='text' name='client_id' value={CLIENTID} readOnly hidden/>
                      <input type='text' name='redirect_uri' value={BASE_URL} readOnly hidden/>
                      <input type='text' name='response_type' value='token' readOnly hidden/>
                      <input type='text' name='scope' value='profile' readOnly hidden/>
                      <input type='text' name='state' value={cuid()} readOnly hidden/>
                      <button type='submit' style={{color:"white"}} className="btn btn-primary center-block">Login with Passport</button>
                  </form>

                  <form ref={this.myLogoutForm} action={`${PASSPORT}/logout`} method='get' style={{width: '100%', height: '100%'}}>       
                      <input type='text' name='client_id' value={CLIENTID} readOnly hidden/>
                      <input type='text' name='redirect_uri' value={BASE_URL} readOnly hidden/>
                      <button type='submit' style={{background: "transparent", "border": "none", "color": "#d37b7b",  "cursor":"pointer", width: '100%', height: '100%', textAlign: 'left'}} className="" hidden>Logout</button>
                  </form>
                </section>
                <footer className="landing-footer col-lg-6 col-lg-push-3">
                  <div className="center-block text-center">
                      <ul className="list-inline list-unstyled">
                          <li>© 2019 Interswitch Nigeria</li>
      
                          <li className="flyingman"><img src="https://mufasa.interswitchng.com/p/iswportal/images/flying-man-icon.png" alt="Flying man icon"/></li>
      
                          <li>
                              <ul className="list-unstyled list-inline">
                                  <li><a href='https://www.interswitchgroup.com/#about'>About</a></li>
                                  <li><a href='https://www.interswitchgroup.com/#solutions'>Solutions</a></li>
                                  <li><a href='https://www.interswitchgroup.com/#services'>Services</a></li>
                                  <li><a href='https://www.interswitchgroup.com/ng/career-at-the-switch'>Careers</a></li>
                              </ul>
                          </li>
                      </ul>
                  </div>
                </footer>
              </section>
     
            }
        </section>
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.account.isLoggedIn,
        isLoading: state.account.loading,
        userData: state.account.userData,
        sessionInterval: state.account.expiresAt,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (token) => dispatch(loginUser(token)),
        loginFailure: (error) => dispatch(loginFailure(error)),
        logout: () => dispatch(logout())
       }
    }
    
  
  export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);