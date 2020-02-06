import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Form } from 'semantic-ui-react';
import { Spin } from 'antd';
import ResourcesTable from './Resources/ResourcesTable';
import * as productsRequests from "./actions/productsThunks";
import * as modalRequests from '../Modals/actions';
import Access from '../common/Access';

function Product({history}){
    const [formState, setFormValues] = useState({
                                        category: 'PUBLIC',
                                        categoryError: false,
                                        description: '',
                                        descriptionError: false,
                                        resources: [],
                                        name: '',
                                        nameError: false,
                                        url: '',
                                        urlError: false,
                                        formError: false
                                    });

    const product = useSelector((store) => store.products.product);
    const isLoading = useSelector((store) => store.products.loading);

    const dispatch = useDispatch();

    useEffect(() => {
        const { category, name, documentation, description, resources} = product
        setFormValues(prevState => ({ ...prevState, category, name, url: documentation, resources, description}));
    }, [product])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({ ...prevState, [name]: value}));
    }

    const handleSelect = (e, {value}) => {
        setFormValues(prevState => ({ ...prevState, category: value}));
    }

    const addToParent = (obj) => {
        let resourcesArray = formState.resources
        resourcesArray.push(obj);
        setFormValues(prevState => ({ ...prevState, resources: resourcesArray}));
    }

    const removeFromParent = (name) => {
        let resourcesArray = formState.resources
        for(var i = resourcesArray.length -1; i >= 0 ; i--){
            if(resourcesArray[i].name === name){
                resourcesArray.splice(i, 1);
            }
        }
        setFormValues(prevState => ({ ...prevState, resources: resourcesArray}));
    }
    

    const validateForm = () => {
        const { description, name, url, category } = formState;
        if(name.length > 0){
            setFormValues(prevState => ({ ...prevState, nameError: false}));
            if(validator.contains(category.toUpperCase(), 'PUBLIC') || validator.contains(category.toUpperCase(), 'RESTRICTED')){
                setFormValues(prevState => ({ ...prevState, categoryError: false}));
                if(validator.isURL(url)){
                    setFormValues(prevState => ({ ...prevState, urlError: false}));
                    if(description.length > 0){
                        setFormValues(prevState => ({ ...prevState, descriptionError: false}));
                        return true;
                    }
                    setFormValues(prevState => ({ ...prevState, descriptionError: true}));
                    return false
                }
                setFormValues(prevState => ({ ...prevState, urlError: true}));
                return false;
            }
            setFormValues(prevState => ({ ...prevState, categoryError: true}));
            return false;
        }
        else{
            setFormValues(prevState => ({ ...prevState, nameError: true}));
            return false;
        }
    }

    const update = (payload) => dispatch(productsRequests.updateProduct(payload));
    const deleteProduct = (payload, history) => dispatch(productsRequests.deleteProduct(payload, history));
    const showModal = (type, payload) => dispatch(modalRequests.showModal(type, payload));

    const onUpdate = () => {
        const { id } = product;
        const { name, description, category, url } = formState; 
        const obj = {
            id,
            name,
            description,
            category, 
            documentation: url
        }
        if(validateForm()){
            update(obj);
        }
    }
    
    const { description, descriptionError, name, nameError, url, urlError, category, categoryError, resources } = formState;
    const categoryOptions =  [
        {
            key: 'PUBLIC',
            text: 'PUBLIC',
            value: 'PUBLIC',
        },
        {
            key: 'RESTRICTED',
            text: 'RESTRICTED',
            value: 'RESTRICTED',
            },
    ]

    return (
        <section className='main-content'>
            <div className="sub-header d-flex align-items-center justify-content-between">
                <h3>Product</h3>
                <Access>
                    <Button size='mini' color='red' floated='right' onClick={() => showModal("DELETE_MODAL", { message: "Are you sure you want to delete this product?", action: () => deleteProduct(product.id, history)})}>Delete Product</Button>
                </Access>
            </div>
            <section className='content-wrapper route_section'>
                {
                    product.id && isLoading ? 
                    
                    <div className="d-flex w-100 h-100 align-items-center justify-content-center">
                        <Spin />
                    </div> :

                    (
                    !product.id && !isLoading ?
                    <section>
                        <p>
                            Resource(s) not available for this product try creating on the <Link to='/dashboard/products'>product</Link> page
                        </p>
                    </section>
                    :
                    <div className='row'>
                        <div className='col-md-6'>
                            <Form loading={false} error={false} size='mini'>
                                <Form.Field required>
                                    <label>Product Name</label>
                                    {
                                        nameError && <div className="ui pointing below prompt label" style={{width: '100%'}}>The Product Name must not empty and must contain a valid name </div>
                                    }
                                    <Form.Input placeholder='Product name' error={nameError} name='name' defaultValue={name} readOnly/>    
                                </Form.Field>
                                <Form.Field required>
                                    <label>Product Category</label>
                                    {
                                        categoryError && <div className="ui pointing below prompt label">must be 'PUBLIC' or 'RESTRICTED'</div>
                                    }
                                    <Dropdown
                                        placeholder='Select Category'
                                        selectOnBlur={false}
                                        fluid
                                        selection
                                        name='category' 
                                        value={category} 
                                        onChange={handleSelect}
                                        options={categoryOptions}
                                    />    
                                </Form.Field>
                                <Form.Field required>
                                    <label>Product Documentation URL</label>
                                    {
                                        urlError && <div className="ui pointing below prompt label">must be a valid url</div>
                                    }
                                    <Form.Input placeholder='' error={urlError} name='url' value={url} onChange={handleChange}/>    
                                </Form.Field>
                                <Form.Field required>
                                    <label>Product Description</label>
                                    {
                                        descriptionError && <div className="ui pointing below prompt label">please add a description</div>
                                    }
                                    <Form.TextArea placeholder='Tell us more' name='description' error={descriptionError} value={description} onChange={handleChange}/>    
                                </Form.Field>
                                <section>

                                    <ResourcesTable resources={resources} productId={product.id} showModal={showModal} removeFromParent = {removeFromParent} addToParent={addToParent}/>
                                </section>
                                <Access>
                                    <Button type='submit' onClick={onUpdate} size='mini'>Save</Button>
                                </Access>
                            </Form>
                        </div>
                    </div>
                    )
                }
            </section>
        </section>
    )
}


export default Product;