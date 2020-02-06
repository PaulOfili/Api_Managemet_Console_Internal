import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Table, Input, Icon, Button } from 'antd';
import Highlighter from 'react-highlight-words';

class UsersTable extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            list: [],
        }
    }
  
    getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
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
          setTimeout(() => this.searchInput.select());
        }
      },
      render: text => (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ),
    });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
    render(){
      const { loading, data } = this.props;

      const columns = [
        {
          title: "username",
          dataIndex: "username",
          key: 'username',
          ...this.getColumnSearchProps('username'),
        },
        {
          title: "role",
          dataIndex: "role",
          sorter: (a, b) => a.role.localeCompare(b.role),
          key: 'role'
    
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <span className='pointer'>
              <span className='button edit'><Link to={`/dashboard/users/view/${record.username}`}>view</Link></span>
            </span>
          ),
        }
      ]
        return (
            <div className=''>
              <Table columns={columns} dataSource={data} loading={loading} size='small' pagination={ {pageSize: 10, showSizeChanger: true, showQuickJumper: true, size: 'large' }} />
            </div>
        )
    }
}
  
const mapStateToProps = (state) => {
  return {
      loading: state.users.loading,
  }
}
  
export default withRouter(connect(mapStateToProps)(UsersTable));