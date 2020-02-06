import React from "react";
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { deleteResource } from '../actions/productsThunks';

class ResourcesTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      rows: [],
    };
  }
  
  componentDidMount(){
    this.setState({
      rows: this.props.resources
    })
  }
  
  static getDerivedStateFromProps(nextProps, prevState){
    const { resources } = nextProps
    return resources === prevState.rows
    ? { ...prevState }
    : { ...prevState, rows: resources}  
 }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.resources !== this.props.resources){
      this.setState({
        rows: this.props.resources
      })
    }
  }
  handleRemoveRow = () => {
    this.setState({
      rows: this.state.rows.slice(0, -1)
    });
  };

  handleRemoveSpecificRow = (name) => () => {
    this.props.removeFromParent(name)
  }
  


  render() {
    const { productId } = this.props;
    const { rows } = this.state;
    return (
      <div>
        <div className="container mb-3">
          <div className="row clearfix d-flex flex-column">
            <h3 style={{"fontWeight": "bold"}} className=''>Resources</h3>
            <div className="col-md-6">
              <table
                className="table table-bordered table-hover"
                id="tab_logic"
              >
                <thead>
                  <tr>
                    <th className="text-center"> # </th>
                    <th className="text-center">Name</th>
                    <th className="text-center">Method</th>
                    <th className="text-center">Path</th>
                  </tr>
                </thead>
                <tbody>
                  {rows && rows.map((item, idx) => (
                    <tr key={idx}>
                      <td className='text-center'>{idx + 1}</td>
                      <td className='text-center'>{item && item.name}</td>
                      <td className='text-center'>{item && item.method}</td>
                      <td className='text-center'>{item && item.path}</td>
                      <td className='text-center'>
                        <Button
                          size='mini'
                          basic
                          color='red'
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => this.props.deleteResource(productId, item.id, this.handleRemoveSpecificRow(item.name))}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button size='mini' color='green' onClick={() => this.props.showModal('ADD_RESOURCE', { addToParent: this.props.addToParent, productId: productId  })} className='btn btn-sm btn-primary'>
                Add Resource
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      loading: state.products.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      deleteResource: (productId, resourceId, callback) => dispatch(deleteResource(productId, resourceId, callback))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResourcesTable)