import React, { useEffect, useState } from 'react';
import AuditsTable from './auditTable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input } from 'antd';
import * as auditsRequests from "./actions/auditsThunks";
import * as auditsActions from "./actions/auditsActions";

const { Search } = Input;

function Audits({ getAudits, audits, pageNum, isLoading, pageSize, setPageNum }) {
    
    const [searchText, setSearchText] = useState('');
    const [prevSearchText, setPrevSearchText] = useState('');

    useEffect(() => {
        getAudits(pageNum-1, pageSize, prevSearchText)
    }, [getAudits, pageNum, prevSearchText])


    const data = audits.map(audit => {
        const {  id, username, client, api, entity, action, status, timestamp } = audit
        return {
            key: id,
            id,
            username,
            client,
            api,
            entity,
            action,
            status,
            timestamp
        }
    })

    const handleChange = (e) => {
        setSearchText(e.target.value)
    }

    const onSearch = () => {
        setPrevSearchText(searchText)
        setPageNum(1);
    }

    return (
        <section className='main-content'>
            <div className="sub-header">
                <h3>Audits</h3>
            </div>
            <section className='content-wrapper route_section'>
                <div className="splitroutes-text">
                    <div className="item">Here you can view logs</div>
                    <div className="item">Note that only routes listed below can be used by developers.</div>
                </div>
                <div className='m-5'>
                    <Search placeholder="Search by Username, ClientID, API, Entity, Action, Status" size='large' onChange={handleChange} onSearch={onSearch} value={searchText} allowClear loading={isLoading} enterButton />
                </div>
                <section className='splitroutes-tablearea'>
                    <AuditsTable data={data} searchText={prevSearchText}/>
                </section>
            </section>
        </section>
    )
}

const mapStateToProps = ({ audits }) => {
    return {
        audits: audits.audits,
        isLoading: audits.loading,
        pageNum: audits.pageNum,
        pageSize: audits.pageSize
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        ...auditsRequests,
        ...auditsActions,
    }, dispatch)
  };
export default connect(mapStateToProps, mapDispatchToProps)(Audits);