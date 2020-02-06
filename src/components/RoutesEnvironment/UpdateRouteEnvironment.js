import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validator from 'validator';
import { Form, Button } from 'semantic-ui-react';
import { getRouteEnvironment, createRouteEnvironment, updateRouteEnvironment } from './actions/routesEnvironmentThunks';
import { Spin } from 'antd';

function UpdateRouteEnvironment() {

    const [formState, setFormValues] = useState({
                                            routeId: '',
                                            routeIdError: false,
                                            testURL: '',
                                            testURLError: false,
                                            formError: false
                                        });
   
    const product = useSelector(store => store.products.product); 
    const routeEnvironment = useSelector(store => store.routesEnvironment.routeEnvironment); 
    const isLoading = useSelector(store => store.routesEnvironment.loading);

    const dispatch = useDispatch();
    const getCurrentRouteEnvironment = useCallback((id) => dispatch(getRouteEnvironment(id)), [dispatch]);
    const createCurrentRouteEnvironment = (payload) => dispatch(createRouteEnvironment(payload));
    const updateCurrentRouteEnvironment = (payload) => dispatch(updateRouteEnvironment(payload));
    
    useEffect(() => {
        getCurrentRouteEnvironment(product.name.replace(/\s/g, ""));
    }, [product, getCurrentRouteEnvironment])   

    useEffect(() => {
        if(routeEnvironment && routeEnvironment.routeId){
            setFormValues(prevState => ({ ...prevState, routeId: routeEnvironment.routeId, testURL: routeEnvironment.testURL}));
        } else {
            setFormValues(prevState => ({ ...prevState, routeId: product.name.replace(/\s/g, "")}));
        }
    }, [routeEnvironment, product])
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({ ...prevState, [name]: value}));
    }

    const validateForm = () => {
        const { routeId, testURL } = formState;
        if(validator.isAlpha(routeId)){
            setFormValues(prevState => ({ ...prevState, routeIdError: false}));

            if(validator.isURL(testURL)){
                setFormValues(prevState => ({ ...prevState, testURLError: false}));
                return true
            }
            setFormValues(prevState => ({ ...prevState, testURLError: true}));
            return false;
        }
        else{
            setFormValues(prevState => ({ ...prevState, routeIdError: true}));
            return false;
        }
    }

    const onCreateOrUpdateCurrentRouteEnvironment = (type) => {
        const { routeId, testURL } = formState;

        const body =  {
            routeId,
            testURL,
        }

        if(validateForm()){
            if(type === 'create'){
                createCurrentRouteEnvironment(body);
            } else {
                updateCurrentRouteEnvironment(body)
            }
        }

    }

    const { routeId, routeIdError, testURL, testURLError, formError } = formState;

    if (!routeEnvironment.routeId && isLoading) {
        return (
                <div className="d-flex w-100 h-100 align-items-center justify-content-center">
                    <Spin />
                </div>
        )
    }
    return (
        <section className='main-content'>
            {
                (!routeEnvironment.routeId && !isLoading) && 
                <section>
                    <p>You must create a routeEnvironment to proceed. Do so here</p>
                    <br />
                    <br />
                </section>
            }

            <section className='content-wrapper route_section'>
                <div className='row'>
                    <div className='col-md-6'>
                        <Form loading={false} error={formError} size='mini'>
                            <Form.Field required>
                                <label>Route ID</label>
                                {
                                    routeIdError && <div className="ui pointing below prompt label">must contain alphabets only</div>
                                }
                                <Form.Input placeholder='Product name' error={routeIdError} name='routeId' value={routeId} readOnly/>    
                            </Form.Field>
                            <Form.Field required>
                                <label>Test URL</label>
                                {
                                    testURLError && <div className="ui pointing below prompt label">must be a valid url</div>
                                }
                                <Form.Input placeholder='Please input your test URL' error={testURLError} name='testURL' value={testURL} onChange={handleChange}/>    
                            </Form.Field>
                            {(!routeEnvironment.routeId && !isLoading) && 
                                <Button onClick={() => onCreateOrUpdateCurrentRouteEnvironment('create')} size='mini'>Create</Button>                            
                            }
                            {(routeEnvironment.routeId && !isLoading) && 
                                <Button onClick={() => onCreateOrUpdateCurrentRouteEnvironment('update')} size='mini'>Update</Button>                            
                            }
                        </Form>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default UpdateRouteEnvironment;