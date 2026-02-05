import React, { use, useEffect } from "react";
import { addToCart } from "../../api/cart";
const AddCartProduct = () => {
    useEffect(() => {
        const addCartProduct = async () => {
            try {
                const res = await addToCart();
            } catch (err) {
                console.error("Error adding product to cart:", err);
            }
        };
        addCartProduct();
    }, []);
    return <div>Add Cart Product Component</div>;
};