import React from 'react';
import { connect } from 'react-redux';


class Access extends React.Component {
  
  render(){
    const { role, children } = this.props;
    if(role === 'ADMIN')
      return children;
    return null;
  }
}


const mapStateToProps = (state) => {
  return {
    role: state.account.role
  }
}

export default connect(mapStateToProps)(Access);