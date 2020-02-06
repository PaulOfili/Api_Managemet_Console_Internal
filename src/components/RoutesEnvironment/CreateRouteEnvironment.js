import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { Form, Button } from 'semantic-ui-react';
import { setRouteEnvironment } from './actions/routesEnvironmentActions';
import { createRouteEnvironment } from './actions/routesEnvironmentThunks';

// import { createProduct } from './actions/productsThunks';

function CreateRouteEnvironment() {

    const [formState, setFormValues] = useState({
                                            routeId: '',
                                            routeIdError: false,
                                            testURL: '',
                                            testURLError: false,
                                            formError: false
                                        });
   
    const product = useSelector(store => store.products.product); 
    const dispatch = useDispatch();
    const reset = useCallback((body) => dispatch(setRouteEnvironment(body)), [dispatch]);
    const createCurrentRouteEnvironment = (payload) => dispatch(createRouteEnvironment(payload));

    useEffect(() => {
        reset({});
    }, [reset]) 

    useEffect(() => {
        setFormValues(prevState => ({ ...prevState, routeId: product.name.replace(/\s/g, "") }));
    }, [product])
    
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

    // const create = (payload) => dispatch(createProduct(payload));
    const onSubmit = () => {
        const { routeId, testURL } = formState;

        const body =  {
            routeId,
            testURL,
        }

        if(validateForm()){
            createCurrentRouteEnvironment(body);
        }

    }

    const { routeId, routeIdError, testURL, testURLError, formError } = formState;

    return (
        <section className='main-content'>
            <section className='content-wrapper route_section'>
                <div className='row'>
                    <div className='col-md-6'>
                        <Form loading={false} error={formError} size='mini'>
                            <Form.Field required>
                                <label>Route ID</label>
                                {
                                    routeIdError && <div className="ui pointing below prompt label">must contain alphabets only</div>
                                }
                                <Form.Input placeholder='Please input your product name' error={routeIdError} name='routeId' value={routeId} readOnly/>    
                            </Form.Field>
                            <Form.Field required>
                                <label>Test URL</label>
                                {
                                    testURLError && <div className="ui pointing below prompt label">must be a valid url</div>
                                }
                                <Form.Input placeholder='Please input your test URL' error={testURLError} name='testURL' value={testURL} onChange={handleChange}/>    
                            </Form.Field>
                            <Button color='green' onClick={onSubmit} size='mini'>Create</Button>
                        </Form>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default CreateRouteEnvironment;