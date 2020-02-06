import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Spin } from 'antd';
import { Button, Form, Input } from 'semantic-ui-react';
import Dropdown from './common/Dropdowns';
import Table from './common/Table';
import { predicateFields, filterFields } from './fields';
import { showModal } from '../Modals/actions/index';
import { filterOptions, predicateOptions } from './routesConstants';
import { setRoute } from './actions/routesActions';
import { updateRoute, getRoute } from './actions/routesThunks';
import Access from '../common/Access';
import validator from 'validator';


function Route() {
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
    
    const getCurrentRoute = useCallback((id) => dispatch(getRoute(id)), [dispatch]);

    const update = (id, body) => dispatch(updateRoute(id, body));
    // const reset = useCallback((body) => dispatch(setRoute(body)), [dispatch]);
    const openModal = (action, props) => dispatch(showModal(action, props))

    const product = useSelector(store => store.products.product);                                 
    const route = useSelector((store) => store.apis.api);
    const isLoading = useSelector((store) => store.apis.loading);

    const generateFilter = useCallback((array) => {
        let sieve = {};
        let filters = [];
        let filtersTracker = [];
        for(let i=0; i<array.length; i++){
            if(!sieve[array[i].name]){
                sieve[array[i].name] = true
                filtersTracker.push(array[i].name);
                //JSON methods can be used to deep copy an object
                let filterObj = JSON.parse(JSON.stringify(filterFields[array[i].name.toLowerCase()]))
                filterObj.rows = parseRows(array, filterObj)
                filters.push(filterObj)
            }
        }
        setFormValues(prevState => ({ ...prevState, filters, filtersTracker}));
    }, [])

    const generatePredicate = useCallback((array) => {
        let sieve = {}
        let predicates = [];
        let predicatesTracker = [];
        for(let i=0; i<array.length; i++){
            if(!sieve[array[i].name]){
                sieve[array[i].name] = true
                predicatesTracker.push(array[i].name);
                //JSON methods can be used to deep copy an object
                let predicateObj = JSON.parse(JSON.stringify(predicateFields[array[i].name.toLowerCase()]))
                    predicateObj.rows = parseRows(array, predicateObj)
                predicates.push(predicateObj)
            }
        }
        setFormValues(prevState => ({ ...prevState, predicates, predicatesTracker}));
    }, [])


    // useEffect(() => {
    //     reset({});
    // }, [reset]) 

    useEffect(() => {
        getCurrentRoute(product.name.replace(/\s/g, ""));
    }, [product, getCurrentRoute])       

    
    useEffect(() => {
        if(route && route.id){
            setFormValues(prevState => ({ ...prevState, routeName: route.id, uri: route.uri}));
            generateFilter(route.filters);
            generatePredicate(route.predicates);
        } else {
            setFormValues(prevState => ({ ...prevState, routeName: product.name.replace(/\s/g, "")}));
        }
    }, [route, generateFilter, generatePredicate, product])

    const parseRows = (array, obj) => {
        let results = [];
        for(let i=0; i<array.length; i++){
          if(array[i].name === obj.name){
            const entries = Object.values(array[i].args)

            let item = {};
            for (const index in entries) {
                item[obj.fields[index]] = entries[index]
            }
            
            results.push(item);
          }
        }
        return results;
      }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({ ...prevState, [name]: value, uriError: false}));
    }

    const handlePredicateSelect = (e, { value }) => {
        let prevPredicatesTrackerState = formState.predicatesTracker;
        let received = value;
        if( prevPredicatesTrackerState.length < received.length){
            const lastItem = value[value.length - 1].toLowerCase()
            const itemObj = JSON.parse(JSON.stringify(predicateFields[lastItem]));
            setFormValues(prevState => ({ ...prevState, selectPredicate: false, predicates: [...prevState.predicates, itemObj], predicatesTracker: value, predicateError: false}));    
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

    const findMissingItem = (prevArray, currentArray ) => {
        return prevArray.filter(prev => currentArray.indexOf(prev) === -1)
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
    const isPredicateFieldValid = (predicates) => {
        let isPathIncluded = false;
        for (let predicate of predicates) {
            if (predicate.name === "Path" && predicate.rows.length > 0){
                isPathIncluded = true;
                break;
            }
        }
        return isPathIncluded;
    }

    const createOrUpdateRoute = () => {
        const isUriValid = validator.isURL(formState.uri, {require_host: false})
        const isPredicateValid = isPredicateFieldValid(formState.predicates);
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
            update(product.name.replace(/\s/g, ""), body)
        } else {
            if(!isUriValid){
                setFormValues(prevState => ({ ...prevState, uriError: true, uriMessage: 'Must be a valid uri'}));
            }
            else{
                setFormValues(prevState => ({ ...prevState, predicateError: true, predicateMessage: 'Add atleast one predicate of type Path with at least one row'}));
            }
        }
    }

    const { predicates, filters, routeName, uri, uriError, uriMessage, predicatesTracker, predicateError, predicateMessage, filtersTracker } = formState;
    if (!route.id && isLoading) {
        return (<div className="d-flex w-100 h-100 align-items-center justify-content-center">
                    <Spin />
                </div>)
    }
    return (
        <section className='main-content'>
            {
                (!route.id && !isLoading) && 
                <section>
                    <p>You must create a route to proceed. Do so here</p>
                    <br />
                    <br />
                </section>
            }
            <section>
                <div className="sub-header d-flex align-items-center justify-content-between">
                    <h3>Update Route</h3>
                </div>
                <section className='route_section'>
                    <Form loading={false} error={false} size='mini' >
                        <section className='splitroutes-new' style={{"width":"50%"}}>
                            <Form.Field required>
                                <label>Route ID</label>
                                <Input value={routeName} name="routeName" readOnly/>    
                            </Form.Field>
                            <Form.Field required>
                                <label>URI</label>
                                <Input name='uri' placeholder='uri' value={uri} onChange={handleChange} error={uriError}/>
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
                                        <div className="item">Here you can add Predicates. Select a predicate from the dropdown below. Path must be included as part of the predicates</div>
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
                                        <Table 
                                            key={index} 
                                            properties={predicate} 
                                            showModal={openModal} 
                                            addToParent={addPredicateToParent} 
                                            removeFromParent={removePredicateFromParent}/>    
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
                            <Access>
                                <Button size='small' color='green' type='submit' onClick={createOrUpdateRoute}>Save</Button>
                            </Access>
                        </section>
                    </Form>
                </section>
            </section>
        </section>
    )
}


export default withRouter(Route);