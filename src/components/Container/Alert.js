import React from 'react';
import { Alert } from 'antd';
import { connect } from 'react-redux';
import { hideAlert } from '../../alert';

const AlertWrapper = ({ message, type, hideAlert }) => (
    <Alert message={message} type={type} showIcon closable afterClose={hideAlert} />
)

const mapStateToProps = (state) => {
    return {
        message: state.alert.message,
        type: state.alert.type
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        hideAlert: () => dispatch(hideAlert())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertWrapper);