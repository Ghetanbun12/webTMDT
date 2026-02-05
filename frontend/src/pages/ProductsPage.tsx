import React from 'react';
import ShowProducts from '../components/products/showproducts';
import ProductDetail from '../components/products/productdetail';
const ProductsPage = () => {
    return <>
        <h1>Products Page</h1>
        <ShowProducts/>
        <ProductDetail/>
    </>
}
export default ProductsPage;