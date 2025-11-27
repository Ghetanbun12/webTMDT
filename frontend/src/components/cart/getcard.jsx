import React, { useState, useEffect } from "react";
import { getCart } from "../../api/cart";
import { getProductById, getProducts } from "../../api/products";

const GetCartProduct = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartWithProducts = async () => {
            try {
                // 1. Fetch giỏ hàng
                const cartRes = await getCart();
                const cartData = cartRes.data;
                console.log("Cart data:", cartData);

                // 2. Fetch chi tiết sản phẩm dựa vào productId
                const cartWithProductDetails = await Promise.all(
                    cartData.map(async (item) => {
                        const productRes = await getProductById(item.productId);
                        const product = productRes.data;
                        console.log("Product details:", product);

                        return {
                            ...item,
                            product: productRes.data // thêm thông tin sản phẩm vào mỗi item
                        };
                    })
                );

                setCartItems(cartWithProductDetails);
            }
            catch (err) {
                console.error("Error fetching cart or products:", err);
            }
        };

        fetchCartWithProducts();
    }, []); // CHỈ CHẠY 1 LẦN

    return (
        <div>
            {cartItems.map((item) => (
                <div key={item._id} style={{ marginBottom: "20px" }}>
                    <p><b>Product ID:</b> {item.productId}</p>
                    <p><b>Name:</b> {item.product.name}</p>
                    <p><b>Price:</b> {item.product.price}</p>
                    <p><b>Quantity:</b> {item.quantity}</p>
                    <p><b>img: </b>{item.product.imageUrl}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default GetCartProduct;
