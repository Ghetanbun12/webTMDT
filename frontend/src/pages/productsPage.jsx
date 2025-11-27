import React from 'react';
import ShowProducts from '../components/products/showproducts'
import ProductDetail from '../components/products/productdetail';
import CartPage from './cartpage';
const ProductsPage = () => {
    return <>
        <h1>Products Pagse</h1>
        <ShowProducts/>
        <ProductDetail/>
        <CartPage/>
    </>
}
export default ProductsPage;