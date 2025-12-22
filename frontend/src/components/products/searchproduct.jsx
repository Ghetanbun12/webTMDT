import React from "react";
const searchProductsPage = (dataSearch) => {
    return (
        <div>
            {
                dataSearch.map((product) => {
                    <div key={product._id}>
                        <p>{product.name}</p>
                    </div>
                })
            }
        </div>
    )
};  
export default searchProductsPage;