import React from 'react';
import { Icon, Message } from 'semantic-ui-react';
import RoutesTable from './RoutesTable';
import Access from '../common/Access';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as routesRequests from "./actions/routesThunks";


class Routes extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            routeName: '',
            setSearch: false
        }
    }

    componentDidMount(){
        this.props.getRoutes();
    }

    render(){
        let { routes, isLoading } = this.props;

        const data = routes.map((route, index) => {
            const {  route_id, route_definition } = route
            return {
                key: index,
                routeid: route_id,
                uri: route_definition.uri
            }
        })

        return (
            <section className='main-content'>
                <div className="sub-header">
                    <h3>Routes</h3>
                </div>
                <section className='content-wrapper route_section'>
                    <div className="splitroutes-text">
                        <div className="item">Here you can add, remove and modify routes</div>
                        <div className="item">Note that only routes listed below can be used by developers.</div>
                    </div>
                    {/* <section className='splitroutes-new d-flex justify-content-end'>
                        <div className="button-area">
                            <Access>
                                <Link to="/dashboard/routes/create">
                                    <button className="btn btn-primary btn-micro button-width" style={{"margin": "0", "height": "30px", "fontSize": "0.7em"}} type="button">+ Create Route</button>
                                </Link>
                            </Access>
                        </div>
                    </section> */}
                    <section className='splitroutes-tablearea'>
                        {
                            routes.length === 0 && !isLoading
                            ?
                            <Message size='small' warning className='mt-5'>
                                <Icon name='help' />
                                No Record Found.
                            </Message>
                            :
                            <RoutesTable data={data} />
                        }
                    </section>
                </section>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        routes: state.apis.apis,
        isLoading: state.apis.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        ...routesRequests,
    }, dispatch)
  };
export default connect(mapStateToProps, mapDispatchToProps)(Routes);