import React from "react";
import { Button } from 'semantic-ui-react';

class Table extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      rows: props.properties.rows,
      addRow: true
    };
  }

  // handleRemoveRow = () => {
  //   // this.props.removeFromParent(name)
  //   this.setState({
  //     rows: this.state.rows.slice(0, -1)
  //   });
  // };

  handleRemoveSpecificRow = (name, idx) => () => {
    this.props.removeFromParent(name, idx)
  }



  render() {
    const { properties } = this.props;
    return (
      <div>
        <div className="container mb-3">
          <div className="row clearfix d-flex flex-column">
            <h3 style={{ "paddingLeft": "15px", "fontWeight": "bold"}} className='text-center col-md-5 mb-2'>{properties.name}</h3>
            <div className="col-md-5 column">
              <table
                className="table table-bordered table-hover"
                id="tab_logic"
              >
                <thead>
                  <tr>
                    <th className="text-center"> # </th>
                    {
                      properties.fields.map((field, index) => {
                        return <th key={index} className="text-center">{field}</th>
                      })
                    }
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {properties.rows.map((item, idx) => (
                    <tr key={idx}>
                      <td className='text-center'>{idx + 1}</td>
                      {
                        properties.fields.map((field, index) => (
                          <td key={index} className='text-center'>
                            {properties.rows[idx][field]}
                          </td>
                        ))
                      }
                      <td className='text-center'>
                        <Button
                          size='mini'
                          basic
                          color='red'
                          className="btn btn-outline-danger btn-sm"
                          onClick={this.handleRemoveSpecificRow(properties.name, idx)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button size='mini' color='green' onClick={() => this.props.showModal(properties.modal, { addToParent: this.props.addToParent })} className={`btn btn-sm btn-primary ${properties.addRow === false ? 'd-none' : ''}`}>
                Add Row
              </Button>
              {/* <Button
                size='mini'
                onClick={this.handleRemoveRow}
                className="float-right"
                color='red'
              >
                Delete Last Row
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Table;