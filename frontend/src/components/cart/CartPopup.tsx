import React, { useEffect, useState } from "react";
import { X, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getCart, removeFromCart } from "../../api/cart";
import { getProductById } from "../../api/products";
import "../../styles/cart/CartPopup.css";

/* ================= TYPES ================= */

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
  product: Product;
}

interface CartPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ================= COMPONENT ================= */

const CartPopup: React.FC<CartPopupProps> = ({ isOpen, onClose }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  const navigate = useNavigate();

  /* ================= FETCH CART ================= */

  useEffect(() => {
    if (!isOpen) return;

    const fetchData = async () => {
      try {
        const cartRes = await getCart();
        const cart = cartRes.data;

        const full: CartItem[] = await Promise.all(
          cart.map(async (item: any) => {
            const productRes = await getProductById(item.productId);
            return {
              ...item,
              product: productRes.data,
            };
          })
        );

        setItems(full);
      } catch (error) {
        console.error("Fetch cart error:", error);
      }
    };

    fetchData();
  }, [isOpen]);

  /* ================= TOTAL ================= */

  useEffect(() => {
    const totalMoney = items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    setTotal(totalMoney);
  }, [items]);

  /* ================= REMOVE ================= */

  const handleRemove = async (id: string) => {
    try {
      await removeFromCart(id);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  /* ================= RENDER ================= */

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
          {items.map((item) => (
            <div key={item._id} className="cart-item">
              <button onClick={() => handleRemove(item._id)}>
                <Trash size={20} color="red" />
              </button>

              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                onClick={() => {
                  navigate(`/product/${item.product._id}`);
                  onClose();
                }}
              />

              <div className="item-info">
                <p className="item-name">{item.product.name}</p>
                <p className="item-price">${item.product.price}</p>
                <p className="item-quantity">Qty: {item.quantity}</p>
              </div>

              <p className="item-total">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          <div className="cart-total">
            <strong>Total: ${total.toFixed(2)}</strong>
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
