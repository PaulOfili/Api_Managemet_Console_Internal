import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Steps, Button } from 'antd';
import Product from '../Products/Product';
import Route from '../Routes/Route';
import UpdateRouteEnvironment from '../RoutesEnvironment';
import { getProduct } from '../Products/actions/productsThunks';
import './styles.css';
import { Link } from 'react-router-dom';

const { Step } = Steps;




function UpdateAPIWizard({ match, history }){

    const steps =
        [
            {title: 'Product', content: <Product history={history} />},
            {title: 'Route', content: <Route />},
            {title: 'Route Environment', content: <UpdateRouteEnvironment />},
        ]
    const dispatch = useDispatch();

    const getSingleProduct = useCallback((productId) => dispatch(getProduct(productId)), [dispatch])

    useEffect(() => {
        getSingleProduct(match.params.id)
    }, [match.params.id, getSingleProduct])
    
    const [current, setCurrent] = useState(0);
    // const [disabled, setCurrent] = useState(0);


    const next = () => {
        let currentVal = current + 1;
        setCurrent(currentVal);
      }
    
    const prev = () => {
        let currentVal = current - 1;
        setCurrent(currentVal);
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
                    <Button type="primary" onClick={() => next()}>
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
                {current > 0 && (
                    <Button style={{ marginLeft: 8 }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </section>
    );
}

export default UpdateAPIWizard;