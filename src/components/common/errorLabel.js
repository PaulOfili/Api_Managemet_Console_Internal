import React from 'react';

const ErrorLabel = (props) => {
    
    return (<div className="error-label"><span className="small text-danger">{props.message}</span></div>);
};

export default ErrorLabel;
