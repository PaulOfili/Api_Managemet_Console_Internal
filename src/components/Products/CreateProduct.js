import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import validator from 'validator';
import { Form, Dropdown, Button } from 'semantic-ui-react';
import { createProduct } from './actions/productsThunks';

function CreateProduct() {

    const [formState, setFormValues] = useState({
                                        category: 'PUBLIC',
                                        categoryError: false,
                                        description: '',
                                        descriptionError: false,
                                        name: '',
                                        nameError: false,
                                        url: '',
                                        urlError: false,
                                        formError: false
                                    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({ ...prevState, [name]: value}));
    }

    const handleSelect = (e, {value}) => {
        setFormValues(prevState => ({ ...prevState, category: value}));
    }

    const validateForm = () => {
        const { description, name, url, category } = formState;
        if(validator.isAlpha(name)){
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

    const create = (payload) => dispatch(createProduct(payload));

    const onSubmit = () => {
        const { description, name, url, category } = formState;

        const body =  {
            name,
            documentation: url,
            category,
            description,
            resources: []
        }
        if(validateForm()){
            create(body);
        }

    }
    const { description, descriptionError, name, nameError, url, urlError, category, categoryError, formError } = formState;
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
            <section className='content-wrapper route_section'>
                <div className='row'>
                    <div className='col-md-6'>
                        <Form loading={false} error={formError} size='mini'>
                            <Form.Field required>
                                <label>Product Name</label>
                                {
                                    nameError && <div className="ui pointing below prompt label" style={{width: '105%'}}>The Product Name must not be empty and must contain alphabets only</div>
                                }
                                <Form.Input placeholder='Product name' error={nameError} name='name' value={name} onChange={handleChange}/>    
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
                            <Button onClick={onSubmit} color='green' size='mini'>Create</Button>
                        </Form>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default CreateProduct;