import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Access from '../common/Access';
import { Link, withRouter } from 'react-router-dom';
import { Table, Input, Icon, Button } from 'antd';
import Highlighter from 'react-highlight-words';

function RoutesTable({ data }) {

    const [searchText, setSearchText] = useState('')
    const searchInput = useRef(null);

    const getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: filtered => (
        <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => searchInput.current.select());
        }
      },
      render: text => (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ),
    });

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0])
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('')
  };

  const loading = useSelector(store => store.apis.loading)

  const columns = [
    {
      title: "Route Name",
      dataIndex: "routeid",
      key: 'routeid',
      ...getColumnSearchProps('routeid'),
    },
    {
      title: "uri",
      dataIndex: "uri",
      sorter: (a, b) => a.uri.localeCompare(b.uri),
      key: 'uri'

    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Access>
          <span className='pointer'>
            <span className='button edit'><Link to={`/dashboard/main/routes/view/${record.routeid}`}>view</Link></span>
          </span>
        </Access>
      ),
    }
  ]
      return (
        <div className=''>
          <Table columns={columns} dataSource={data} loading={loading} size='small' pagination={ {pageSize: 10, showSizeChanger: true, showQuickJumper: true, size: 'large' }} />
        </div>
      )
}

  
export default withRouter(RoutesTable);