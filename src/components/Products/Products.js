import React, { useEffect, useState } from 'react';
import ProductsTable from './ProductsTable';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from 'redux';
import * as productsRequests from "./actions/productsThunks";
import Access from '../common/Access';
import { Input } from 'antd';

const { Search } = Input

function Products({ getProducts, products }) {
    const [searchText, setSearchText] = useState('');
    const [productListBySearch, setProductListBySearch] = useState([]);

    useEffect(() => {
        getProducts();
    }, [getProducts])

    useEffect(() => {
        setProductListBySearch([...products])
    }, [products])

    const handleChange = (e) => {
        setSearchText(e.target.value)
    }

    const onSearch = () => {
        const newProductList = products.filter(product => product.name.includes(searchText));
        setProductListBySearch(newProductList);
    }

    const data = productListBySearch.map((product, index) => {
        const {  id, name, description, category } = product
        return {
            key: index,
            id,
            name,
            description,
            category
        }
    })

    return (
        <section className='main-content'>
            <div className="sub-header">
                <h3>APIs</h3>
            </div>
            <section className='content-wrapper route_section'>
                <div className="splitroutes-text">
                    <div className="item">Here you can add, remove and modify APIs</div>
                    <div className="item">Note that only APIs listed below can be used by developers.</div>
                </div>
                <div className='m-5'>
                    <Search placeholder="Search by Product Name" size='large' onChange={handleChange} onSearch={onSearch} value={searchText} allowClear enterButton />
                </div>
                <section className='splitroutes-new d-flex justify-content-end'>
                    <div className="button-area">
                        <Access>
                            <Link to="/dashboard/apis/create">
                                <button className="btn btn-primary btn-micro button-width" style={{"margin": "0", "height": "30px", "fontSize": "0.7em"}} type="button">+ Create API</button>
                            </Link>
                        </Access>
                    </div>
                </section>
                <section className=''>
                    <ProductsTable data={data} />
                </section>
            </section>
        </section>
    )
}

//Move into component by using Redux hooks 'useSelector' and 'useDispatch

const mapStateToProps = (state) => {
    return {
        products: state.products.products,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        ...productsRequests,
    }, dispatch)
  };
export default connect(mapStateToProps, mapDispatchToProps)(Products);