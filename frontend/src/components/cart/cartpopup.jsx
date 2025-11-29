import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getCart } from "../../api/cart";
import { getProductById } from "../../api/products";
import "../../styles/cart/cartpopup.css";
import { useNavigate } from "react-router-dom";

const CartPopup = ({ isOpen, onClose }) => {
    const [items, setItems] = useState([]);
    const Navigate = useNavigate();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (!isOpen) return;

        const fetchData = async () => {
            const cartRes = await getCart();
            const cart = cartRes.data;

            const full = await Promise.all(
                cart.map(async (item) => {
                    const product = await getProductById(item.productId);
                    return {
                        ...item,
                        product: product.data
                    };
                })
            );

            setItems(full);
        };

        fetchData();
    }, [isOpen]);
   useEffect(() => {
   const totalMoney = items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );
    setTotal(totalMoney);
}, [items]);

    return (
        <div className={`cart-popup-overlay ${isOpen ? "active" : ""}`}>
            <div className="cart-popup">
                <div className="cart-header">
                    <h3>Cart ({items.length} item)</h3>
                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="cart-body">
                    <div>{items.map(item => (
                        <div key={item._id} className="cart-item">
                            <img onClick={() => {
                                Navigate(`../product/${item.product._id}`)
                                onClose();
                            }} src={item.product.imageUrl} alt="" />
                            <div className="item-info">
                                <p className="item-name">{item.product.name}</p>
                                <p className="item-price">${item.product.price}</p>
                                <p className="item-quantity">Qty:{item.quantity}</p>
                            </div>

                            <p className="item-total">
                                ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    ))}
                    </div>
                    <div>
                       Total: ${total.toFixed(2)}
                    </div>

                </div>

                <div className="cart-footer">
                    <button className="checkout-btn">Checkout</button>
                    <button className="viewcart-btn">View Cart</button>
                </div>
            </div>
        </div>
    );
};

export default CartPopup;
