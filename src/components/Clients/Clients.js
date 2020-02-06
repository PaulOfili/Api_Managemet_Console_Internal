import React, { useEffect, useState } from 'react';
import ClientsTable from './ClientsTable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as clientsRequests from "./actions/clientsThunks";
import { Input } from 'antd';

const { Search } = Input;

function Clients({ clients, getClients }){ 
    const [searchText, setSearchText] = useState('');
    const [clientListBySearch, setClientListBySearch] = useState([]);

    useEffect(() => {
        getClients();
    }, [getClients])

    useEffect(() => {
        setClientListBySearch([...clients])
    }, [clients])

    const handleChange = (e) => {
        setSearchText(e.target.value)
    }

    const onSearch = () => {
        const newClientList = clients.filter(client => client.name.includes(searchText));
        setClientListBySearch(newClientList);
    }

    const data = clientListBySearch.map((client, index) => {
        const {  id, name, type, owner } = client
        return {
            key: index,
            id,
            name,
            type,
            owner
        }
    })
    return (
        <section className='main-content'>
            <div className="sub-header">
                <h3>Projects</h3>
            </div>
            <section className='content-wrapper route_section'>
                <div className="splitroutes-text">
                    <div className="item">Here you can approve or decline resources in projects</div>
                    <div className="item">Note that only projects listed below are being used by developers.</div>
                </div>
                <div className='m-5'>
                    <Search placeholder="Search by Project/Client Name" size='large' onChange={handleChange} onSearch={onSearch} value={searchText} allowClear enterButton />
                </div>
                <section className='splitroutes-tablearea'>
                    <ClientsTable data={data}/>
                </section>
            </section>
        </section>
    )
}

const mapStateToProps = (state) => {
    return {
        clients: state.clients.clients,
        isLoading: state.clients.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        ...clientsRequests,
    }, dispatch)
  };

export { Clients }
export default connect(mapStateToProps, mapDispatchToProps)(Clients);