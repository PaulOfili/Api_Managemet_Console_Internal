import React, { Suspense } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { ToastContainer } from "react-toastify";
import { BackTop } from 'antd';
import "react-toastify/dist/ReactToastify.css";
import { TimeOutSessionUser, resolveRole } from '../Landing/actions/authThunk';
import ModalRoot from '../Modals/ModalRoot';
import Alert from './Alert';
import Header from './Header';
import Toolbar from './Toolbar';
import Sidebar from './Sidebar';
import {
    UserWrapper,
    APIsWrapper,
    AuditsWrapper,
    ClientWrapper,
    MainWrapper
} from '../../routes';


const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

class Layout extends React.Component {

    componentDidMount = () => {
        if (this.props.sessionInterval && this.props.sessionInterval > 0) {
            let seconds = this.props.sessionInterval;
            this.props.timeOutSessionUser(seconds);
        }

        if(!this.props.role)
            this.props.resolveRole(this.props.username)
    }

    render(){
        const { alert } = this.props;
        return (
            <section className="app">
                <Header />
                <LoadingBar style={{ backgroundColor: 'blue', zIndex: '99999' }} />
                <Toolbar />
                <section className="app-body">
                    <Sidebar props={this.props} />
                    {
                            alert.visible ? (
                                <section style={{ width: '350px', marginLeft: '-175px', position: 'fixed', top: '60px', left: '50%', zIndex: '99999'}}>
                                    <Alert
                                        message={alert.message}
                                        type={alert.type}
                                        />
                                </section>
                              ) : null
                        }
                    <main>
                        <ModalRoot />
                        <ToastContainer autoClose={4000} />
                        <Suspense fallback={loading()}>
                            <Switch>
                                <Route path="/dashboard/main" component={MainWrapper} />
                                <Route path="/dashboard/users" component={UserWrapper} />
                                <Route path="/dashboard/clients" component={ClientWrapper} />
                                <Route path="/dashboard/apis" component={APIsWrapper} />
                                <Route path="/dashboard/audits" component={AuditsWrapper} />
                                <Redirect from="/dashboard" to="/dashboard/main" />
                            </Switch>
                        </Suspense>
                        <BackTop />
                        <div id='back-to-top-up'>
                            <BackTop>
                                <div className="ant-back-top-inner">UP</div>
                            </BackTop>
                        </div>
                    </main>
                </section>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sessionInterval: state.account.userData.sessionInterval,
        alert: state.alert,
        username: state.account.userData.email,
        role: state.account.role
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        timeOutSessionUser: (sec) => dispatch(TimeOutSessionUser(sec)),
        resolveRole: (username) => dispatch(resolveRole(username))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout)); 