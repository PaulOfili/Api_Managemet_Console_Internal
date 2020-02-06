import React from 'react';
import { Form, List, Radio } from 'semantic-ui-react';

function Accordion({ array, handleRadio, approve, type}){

    return (
        <div className="accordion mt-3" id="accordionExample">
            {
                array.map((product, index) => (
                <div className="" key={index}>
                    <div className="card-header" id={`heading${product.name}`}>
                        <h2 className="mb-0">
                            <button className="btn btn-link field" type="button" data-toggle="collapse" data-target={`#${type}_${product.name}-${index}`} aria-expanded="true" aria-controls="collapseOne">
                                <label className='product_name'>{product.name}</label>
                            </button>
                        </h2>
                    </div>

                    <div id={`${type}_${product.name}-${index}`} className="collapse" aria-labelledby={`heading${product.name}`} data-parent="#accordionExample">
                        <div className="card-body">
                            { 
                                <List>
                                    {
                                        product.resources.map((resource, resource_index) => (
                                            <List.Item id={`${type}_${product.name}-${index}-${resource_index}`} key={resource_index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                                <List.Content style={{ width: '50%'}}>
                                                    <List.Header>{resource.name}</List.Header>
                                                </List.Content>
                                                {
                                                approve &&
                                                <List.Content style={{ width: '50%'}}>
                                                    <Form.Group inline style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                                                        <Form.Field>
                                                            <Radio
                                                                label='Approve'
                                                                name={resource.id}
                                                                value='approve'
                                                                checked={approve[resource.id] === 'approve'}
                                                                onChange={handleRadio}
                                                            />
                                                        </Form.Field>
                                                        <Form.Field>
                                                            <Radio
                                                                label='Decline'
                                                                name={resource.id}
                                                                value='decline'
                                                                checked={approve[resource.id] === 'decline'}
                                                                onChange={handleRadio}
                                                            />
                                                        </Form.Field>
                                                    </Form.Group>
                                                </List.Content>
                                                }
                                            </List.Item>
                                        ))
                                    }
                                </List>
                            }
                        </div>
                    </div>
                </div>
            ))
            }
        </div>
    );
}

export default Accordion;