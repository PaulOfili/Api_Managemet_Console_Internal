import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Empty} from "antd";
import { Icon, Message } from 'semantic-ui-react';
import * as clientsRequests from "./actions/clientsThunks";
import emptyBoxSvg from '../../assets/img/empty-box.svg';
import Accordion from './Accordion';

function Project({ match, getRequested, getApproved, approved, requested, isLoading, approveResources, declineResources, client, setResourceList }){

    // const [approve, setApprove] = useState({});

    useEffect(() => {
        getRequested(match.params.id)
        getApproved(match.params.id)
    }, [match.params.id, getRequested, getApproved])

    const handleRadio = (e, { value, name }) => { 
        setResourceList({...client, [name]: value})
        // setApprove({...approve, [name]:value}) 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let approvedResources = [];
        let declinedResources = [];
        for (var key in client) {
            if (client.hasOwnProperty(key)) {
              if(client[key] === 'approve')
                approvedResources.push(key)
              if(client[key] === 'decline')
                declinedResources.push(key)
            }
        }
        
        if(approvedResources.length > 0)
            approveResources({ resources: approvedResources}, match.params.id);

        if(declinedResources.length > 0)
            declineResources({ resources: declinedResources}, match.params.id)
    }
    return (
        <section className='main-content'>
                <div className="sub-header">
                    <h3>{match.params.id}</h3>
                </div>
                <section className='route_section'>
                    <div className="splitroutes-text">
                        <div className="item">Here you can approve or decline resources in products for a project</div>
                        <div className="item">Note that only resources listed below are in use by developers.</div>
                    </div>
                    <section>
                        <Message info icon>
                            <Icon name='hand point down'  />
                            <Message.Content>
                                <Message.Header>REQUESTED</Message.Header>
                                <p>Select resources in Products and Approve, Decline or Neglect(remains in Pending state)</p>
                            </Message.Content>
                        </Message>
                        <div>
                        {
                            !isLoading && requested.length === 0 &&
                            <Empty
                                image={emptyBoxSvg}
                                imageStyle={{
                                    height: '3rem',
                                    width: '3rem',
                                    margin: '12.4375rem auto 1.5rem'
                                }}
                                description={
                                    <span>
                                        <span style={{lineHeight: '1.75rem', fontSize: '1.5rem', display: 'block'}}>
                                            <span>No Requested Resources for this project</span>
                                        </span>
                                        <span style={{lineHeight: '1.25rem', fontSize: '1rem', padding: '1rem',
                                            width: '21.0625rem',
                                            margin: '0 auto',
                                            display: 'block'}}>
                                            <span></span>
                                        </span>
                                    </span>
                                }
                            >
                            </Empty>
                            }
                            {
                                !isLoading && requested.length > 0 &&
                                <div>
                                    <Accordion handleRadio={handleRadio} array={requested} approve={client} type={'requested'}/>
                                    <button className='btn btn-primary mt-5 mb-5 right-float' onClick={handleSubmit}>Submit</button>
                                </div>
                            }
                            
                        </div>
                    </section>
                    <section>
                        <Message info icon>
                            <Icon name='hand point down'  />
                            <Message.Content>
                                <Message.Header>APPROVED RESOURCES</Message.Header>
                                <p>Find below all approved Resources for the current project</p>
                            </Message.Content>
                        </Message>
                        <div>
                            {
                               !isLoading && approved.length === 0 &&
                                <Empty
                                    image={emptyBoxSvg}
                                    imageStyle={{
                                        height: '3rem',
                                        width: '3rem',
                                        margin: '12.4375rem auto 1.5rem'
                                    }}
                                    description={
                                        <span>
                                            <span style={{lineHeight: '1.75rem', fontSize: '1.5rem', display: 'block'}}>
                                                <span>No Approved Resources for this project</span>
                                            </span>
                                            <span style={{lineHeight: '1.25rem', fontSize: '1rem', padding: '1rem',
                                                width: '21.0625rem',
                                                margin: '0 auto',
                                                display: 'block'}}>
                                                <span></span>
                                            </span>
                                        </span>
                                    }
                                >
                                </Empty>
                            }
                            {
                                !isLoading && approved.length > 0 &&
                                <Accordion handleRadio={handleRadio} array={approved} approve={false} type={'approved'}/>
                            }
                        </div>
                    </section>
                </section>
        </section>
    );


}

const mapStateToProps = (state) => {
    return {
        client: state.clients.client,
        requested: state.clients.requested,
        approved: state.clients.approved,
        isLoading: state.clients.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        ...clientsRequests,
    }, dispatch)
  };

export default connect(mapStateToProps, mapDispatchToProps)(Project);