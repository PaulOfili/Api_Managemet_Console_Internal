import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Input } from 'semantic-ui-react';
import validator from 'validator';
import Dropdown from './common/Dropdowns';
import Table from './common/Table';
import { predicateFields, filterFields } from './fields';
import { showModal } from '../Modals/actions/index';
import { createRoute } from './actions/routesThunks';
import { setRoute } from './actions/routesActions';
import { filterOptions, predicateOptions } from './routesConstants';

function CreateRoutes() {

    const [formState, setFormValues] = useState({
                                            routeName: '',
                                            uri: '',
                                            uriError: false,
                                            uriMessage: '',
                                            predicates: [],
                                            predicatesTracker: [],
                                            filters: [],
                                            filtersTracker: [],
                                            selectPredicate: true,
                                            selectFilter: true,
                                            predicateError: false,
                                            predicateMessage: ''
                                        });
    
    

    const dispatch = useDispatch();
    const reset = useCallback((body) => dispatch(setRoute(body)), [dispatch]);
    const product = useSelector(store => store.products.product)

    useEffect(() => {
        reset({});
    }, [reset]) 

    useEffect(() => {
        setFormValues(prevState => ({ ...prevState, routeName: product.name.replace(/\s/g, "") }));
    }, [product])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({ ...prevState, [name]: value, uriError: false}));
    }

    //Select Handler for Predicate dropdown
    const handlePredicateSelect = (e, { value }) => {

        //PredicatesTracker (An Array) holds the value for all previously selected items
        //Value (An Array) holds the value for all selected items

        let prevPredicatesTrackerState = formState.predicatesTracker;
        let received = value;

        //compare both values to know if user is trying to add or remove
        if( prevPredicatesTrackerState.length < received.length){
            const lastItem = value[value.length - 1].toLowerCase()
            const itemObj = JSON.parse(JSON.stringify(predicateFields[lastItem]));
            setFormValues(prevState => ({ ...prevState, 
                selectPredicate: false, 
                predicates: [...prevState.predicates, itemObj], 
                predicatesTracker: value, 
                predicateError: false, 
                predicateMessage: ''}));     
        }
        else {
            let item = findMissingItem(prevPredicatesTrackerState, received);
            removePredicateItem(item[0])
        }
       
    }

    const handleFilterSelect = (e, { value }) => {
        let prevFiltersTrackerState = formState.filtersTracker;
        let received = value;
        if( prevFiltersTrackerState.length < received.length){
            const lastItem = value[value.length - 1].toLowerCase()
            const itemObj = filterFields[lastItem];
            setFormValues(prevState => ({ ...prevState, selectFilter: false, filters: [...prevState.filters, itemObj], filtersTracker: value}));     
        }
        else{
            let item = findMissingItem(prevFiltersTrackerState, received);
            removeFilterItem(item[0])
        }
    }

    const addPredicateToParent = (name, obj) => {
        let predicatesArray = formState.predicates
        let foundIndex = predicatesArray.findIndex(x => x.name === name);
        predicatesArray[foundIndex].rows.push(obj);
        setFormValues(prevState => ({ ...prevState, predicates: predicatesArray }));
    }

    const validateUri = () => {
        const isValid = validator.isURL(formState.uri, {require_host: false})
        setFormValues(prevState => ({ ...prevState, uriError: !isValid, uriMessage: 'must be a valid uri' }));
    }

    const removePredicateFromParent = (name, idx) => {
        let predicatesArray = formState.predicates
        let foundIndex = predicatesArray.findIndex(x => x.name === name);
        predicatesArray[foundIndex].rows.splice(idx, 1);
        setFormValues(prevState => ({ ...prevState, predicates: predicatesArray }));
    }

    const addFilterToParent = (name, obj) => {
        let filtersArray = formState.filters
        let foundIndex = filtersArray.findIndex(x => x.name === name);
        filtersArray[foundIndex].rows.push(obj);
        setFormValues(prevState => ({ ...prevState, filters: filtersArray }));
    }

    const removeFilterFromParent = (name, idx) => {
        let filtersArray = formState.filters
        let foundIndex = filtersArray.findIndex(x => x.name === name);
        filtersArray[foundIndex].rows.splice(idx, 1);
        setFormValues(prevState => ({ ...prevState, filters: filtersArray }));
    }

    //compares two arrays and returns an array of missing item
    const findMissingItem = (prevArray, currentArray ) => {
        return prevArray.filter(prev => currentArray.indexOf(prev) === -1);
    }

    const removePredicateItem = (item) => {
        let tracker = formState.predicatesTracker;
        let predicatesArray = formState.predicates
        if(tracker.indexOf(item) !== -1 && predicatesArray.findIndex(x => x.name === item) !== -1){
            setFormValues(prevState => ({ ...prevState, predicatesTracker: tracker.filter(predicate => predicate !== item), predicates: predicatesArray.filter(predicate => predicate.name !== item) }));
        }
    }

    const removeFilterItem = (item) => {
        let tracker = formState.filtersTracker;
        let filtersArray = formState.filters
        if(tracker.indexOf(item) !== -1 && filtersArray.findIndex(x => x.name === item) !== -1){
            setFormValues(prevState => ({ ...prevState, filtersTracker: tracker.filter(filter => filter !== item), filters: filtersArray.filter(filter => filter.name !== item) }));
        }
    }

    const parser = (array) => {
        let results = [];
        for(let i=0; i<array.length; i++){
            let string = `${array[i].name}=`;
            for (let row of array[i].rows) {
                let fieldValues = Object.values(row)
                let stringifiedFieldValues = fieldValues.join(',')
                results.push(string+stringifiedFieldValues)
            }
        }
        return results;
    }

    const saveRoute = () => {
        const isUriValid = validator.isURL(formState.uri, {require_host: false})
        const isPredicateValid = parser(formState.predicates).length > 0

        const shouldSubmit = isUriValid && isPredicateValid;
        if(shouldSubmit){
            let predicates = parser(formState.predicates);
            let filters = parser(formState.filters);
            let body = {
                uri: formState.uri,
                predicates,
                filters
            }
            setFormValues(prevState => ({ ...prevState, uriError: false, uriMessage: ''}));
            setFormValues(prevState => ({ ...prevState, predicateError: false, predicateMessage: ''}));
            create(formState.routeName, body)
        }
        else {
            if(!isUriValid){
                setFormValues(prevState => ({ ...prevState, uriError: true, uriMessage: 'Must be a valid uri'}));
            }
            else{
                setFormValues(prevState => ({ ...prevState, predicateError: true, predicateMessage: 'Add atleast one predicate with at least one row'}));
            }
        }
    }

    const openModal = (type, props) => dispatch(showModal(type, props));
    const create =  (id, obj) => dispatch(createRoute(id, obj))
    const { predicates, filters, routeName, uri, uriError, uriMessage, predicatesTracker, predicateError, predicateMessage, filtersTracker } = formState;

    return (
        <section className='main-content'>
            <section className='route_section'>
                <Form loading={false} error={false} size='mini' >
                    <section className='splitroutes-new' style={{"width":"50%"}}>
                        <Form.Field required>
                            <label>Route Name</label>
                            <Input name='routeName' value={routeName} readOnly/>   
                        </Form.Field>
                        <Form.Field required>
                            <label>URI</label>
                            <Input name='uri' placeholder='uri' value={uri} onBlur={validateUri} onChange={handleChange} error={uriError}/>   
                            {
                                uriError && <h6 className='mt-2 text-danger'>{uriMessage}</h6>
                            }
                        </Form.Field>
                    </section>
                    <section className='predicates'>
                        <div className='row flex-column'>
                            <div className='p-0'>
                                <div className="split-sub-header field required" style={{ "padding": "0 !important"}}>
                                    <label className='ml-3'>Predicates</label>
                                </div>
                                <div className="splitroutes-text pl-3">
                                    <div className="item">Here you can add Predicates. Select a predicate from the dropdown below.</div>
                                </div>
                                <section className='pl-3 d-flex' style={{ "maxWidth": "50%"}}>
                                    <Dropdown name='predicates' placeholder='Select Predicate' options={predicateOptions} onChange={handlePredicateSelect} value={predicatesTracker} error={predicateError}/>
                                </section>
                                {
                                    predicateError && <h6 className='pl-3 mt-2 text-danger'>{predicateMessage}</h6>
                                } 
                            </div>
                        </div>
                        <section className='addPredicateArea'>
                            {
                                predicates.map((predicate, index) => (
                                    <Table key={index} properties={predicate} showModal={openModal} addToParent={addPredicateToParent} removeFromParent={removePredicateFromParent}/>    
                                ))
                            }
                        </section>
                    </section>
                    <section className='filters'>
                        <div className='row flex-column'>
                            <div className='filter__left p-0'>
                                <div className="split-sub-header field">
                                    <label className='ml-3'>Filters</label>
                                </div>
                                <div className="splitroutes-text pl-3">
                                    <div className="item">Here you can add Filters. Select a filter from the dropdown below.</div>
                                </div>
                                <section className='pl-3 d-flex' style={{ "maxWidth": "50%"}}>
                                    <Dropdown name='filters' placeholder='Select Filter' options={filterOptions} onChange={handleFilterSelect} value={filtersTracker}/>
                                </section>
                            </div>
                        </div>
                        <section className='addFilterArea'>
                        {
                                filters.map((filter, index) => (
                                    <Table key={index} properties={filter} showModal={openModal} addToParent={addFilterToParent} removeFromParent={removeFilterFromParent}/>    
                                ))
                            }
                        </section>
                    </section>
                    <section className='submit-button mt-4 d-flex '>
                        <Button size='small' color='green' type='submit' onClick={saveRoute}>Create Route</Button>
                    </section>
                </Form>
            </section>
        </section>
    )
}

export default CreateRoutes;