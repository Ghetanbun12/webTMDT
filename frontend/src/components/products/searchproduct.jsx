import React from "react";
import {contextOutlet} from 'react-router-dom';
const searchProductsPage = () => {
    const {dataSearch} = useOutletContext();
    return (
        <div>
            <h2>hèlaskhflsalkbsajkfbjkasavfjksavfjk</h2>
            <h1>Search Products</h1>
            <ul>
                {dataSearch.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    )
};  
export default searchProductsPage;