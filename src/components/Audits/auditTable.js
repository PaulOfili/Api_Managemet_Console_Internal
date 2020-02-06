import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Table } from 'antd';
import * as auditsActions from "./actions/auditsActions";
import * as auditsThunks from "./actions/auditsThunks";


function AuditsTable({ loading, data, pageSize, setPageSize, setPageNum, getAudits, pageNum, totalCount, searchText }) {

    const onPageChange = (page, size, searchText) => {
        setPageNum(page);
        setPageSize(size);
        getAudits(page-1, size, searchText)
    }

    const pagination = {
      pageSize: pageSize, 
      current: pageNum, 
      total: totalCount, 
      pageSizeOptions: ['10', '50', '100', '200', '500', '1000'],
      onShowSizeChange: (current, size) => onPageChange(current, size, searchText), 
      showSizeChanger: true, 
      showQuickJumper: true, 
      size: 'large' 
    }

    const handleTableChange = (pager, filters, sorter) => {
        setPageNum(pager.current);

    };
    const columns = [
        {
          title: "id",
          dataIndex: "id",
          key: 'id',
        },
        {
          title: "username",
          dataIndex: "username",
          key: 'username'
    
        },
        {
            title: "client",
            dataIndex: "client",
            key: 'client'
      
        },
        {
            title: "api",
            dataIndex: "api",
            key: 'api'
      
        },
        {
            title: "entity",
            dataIndex: "entity",
            key: 'entity'
      
        },
        {
            title: "action",
            dataIndex: "action",
            key: 'action'
      
        },
        {
            title: "status",
            dataIndex: "status",
            key: 'status'
      
        },
        {
            title: "timestamp",
            dataIndex: "timestamp",
            sorter: (a, b) => new Date(a.timestamp) > new Date(b.timestamp),
            key: 'timestamp'
      
        },
      ]
    return (
        <div className=''>
          <Table scroll={{x: 'max-content'}} columns={columns} dataSource={data} loading={loading} size='small' onChange={handleTableChange} pagination={pagination} />
        </div>
    );
}

const mapStateToProps = ({ audits }) => {
  return {
      loading: audits.loading,
      pageSize: audits.pageSize,
      pageNum: audits.pageNum,
      totalCount: audits.totalCount,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      ...auditsActions,
      ...auditsThunks
  }, dispatch)
};
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuditsTable));