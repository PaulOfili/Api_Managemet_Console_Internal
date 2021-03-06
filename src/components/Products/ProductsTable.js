import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Table, Input, Icon, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import Access from '../common/Access';

function ProductsTable({ loading, data }) {
 
    const searchInput = useRef(null);
    const [searchText, setSearchText] = useState('')

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
        setSearchText(selectedKeys[0]);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };

    const columns = [
        {
          title: "name",
          dataIndex: "name",
          key: 'name',
          ...getColumnSearchProps('name'),
        },
        {
          title: "description",
          dataIndex: "description",
          sorter: (a, b) => a.description.localeCompare(b.description),
          key: 'description'
    
        },
        {
          title: "category",
          dataIndex: "category",
          sorter: (a, b) => a.category.localeCompare(b.category),
          key: 'category'
    
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Access>
              <span className='pointer'>
                <span className='button edit'><Link to={`/dashboard/apis/view/${record.id}`}>view</Link></span>
              </span>
            </Access> 
          ),
        }
    ]
    return (
        <div className=''>
          <Table columns={columns} dataSource={data} bordered loading={loading} size='small' pagination={ {pageSize: 10, showSizeChanger: true, showQuickJumper : true, size: 'large' }} />
        </div>
    )
}
  
const mapStateToProps = (state) => {
  return {
      product: state.products.product,
      loading: state.products.loading,
  }
}
  
export default withRouter(connect(mapStateToProps)(ProductsTable));