import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

//functional component to check if user is logged in and render right component if true else redirects to login
const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route {...rest} render={(props) => (
      isLoggedIn
          ? <Component {...props}/>
          : <Redirect to='/' />
  )}/>
)

const mapStateToProps = (state) => {
  return {
      isLoggedIn: state.account.isLoggedIn
  }
}

export default connect(mapStateToProps)(PrivateRoute)
