import React from 'react';
import ShowProducts from '../components/products/ShowProducts.tsx';  // Chú ý: S hoa, p thường theo tên file thực tế
import ProductDetail from '../components/products/ProductDetail.tsx';
const ProductsPage = () => {
    return <>

        <ShowProducts/>
        <ProductDetail/>
    </>
}
export default ProductsPage;