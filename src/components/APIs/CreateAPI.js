import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Steps, Button } from 'antd';
import CreateProduct from '../Products/CreateProduct';
import CreateRoute from '../Routes/CreateRoutes';
import CreateRouteEnvironment from '../RoutesEnvironment/CreateRouteEnvironment';
import './styles.css';
import { Link } from 'react-router-dom';

const { Step } = Steps;

const steps =
[
    {title: 'Create Product', content: <CreateProduct />},
    {title: 'Route', content: <CreateRoute />},
    {title: 'Route Environment', content: <CreateRouteEnvironment />},
]

function CreateAPIWizard(){
    const [current, setCurrent] = useState(0);

    const product = useSelector(store => store.products.product)
    const route = useSelector(store => store.apis.api)

    const next = () => {
        let currentVal = current + 1;
        setCurrent(currentVal);
    }
    
    // const prev = () => {
    //     let currentVal = current - 1;
    //     setCurrent(currentVal);
    // }
    
    const isDisabled = () => {
        if(current === 0 && !product.id){
            return true
        }
        if(current === 1 && !route.id){
            return true
        }
        return false
    }
    return (
        <section className="step-progress route_section">
            <Steps current={current}>
                {steps.map(item => (
                <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action">
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()} disabled={isDisabled()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary">
                        <Link to={`/dashboard/apis`}>
                            Done
                        </Link>
                </Button>
                )}
                {/* {current > 0 && (
                    <Button style={{ marginLeft: 8 }} onClick={() => prev()}>
                        Previous
                    </Button>
                )} */}
            </div>
        </section>
    );
}

export default CreateAPIWizard