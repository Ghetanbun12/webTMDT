import React, { useEffect, useState } from "react";
import { X, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getCart, removeFromCart } from "../../api/cart";
import "../../styles/cart/CartPopup.css";

/* ================= TYPES ================= */

interface Product {
  _id: string;
  name: string;
  price: number;
  // imageUrl: string;
}

interface CartItem {
  productId: Product; // vì backend populate rồi
  quantity: number;
}

interface CartResponse {
  _id: string;
  userId: string;
  items: CartItem[];
}

interface CartPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartPopup: React.FC<CartPopupProps> = ({ isOpen, onClose }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  const navigate = useNavigate();

  /* ================= FETCH CART ================= */

  useEffect(() => {
    if (!isOpen) return;

    const fetchData = async () => {
      try {
        const res = await getCart();
        const cart: CartResponse = res.data;

        if (!cart?.items) {
          setItems([]);
          return;
        }

        setItems(cart.items);
      } catch (error) {
        console.error("Fetch cart error:", error);
        setItems([]);
      }
    };

    fetchData();
  }, [isOpen]);

  /* ================= CALCULATE TOTAL ================= */

  useEffect(() => {
    const totalMoney = items.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );
    setTotal(totalMoney);
  }, [items]);

  /* ================= REMOVE ITEM ================= */

  const handleRemove = async (productId: string) => {
    try {
      await removeFromCart(productId);

      setItems((prev) =>
        prev.filter((item) => item.productId._id !== productId)
      );
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

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
          {items.length === 0 && <p>Giỏ hàng trống</p>}

          {items.map((item) => (
            <div key={item.productId._id} className="cart-item">
              <button
                onClick={() => handleRemove(item.productId._id)}
              >
                <Trash size={20} color="red" />
              </button>

              <img
                // src={item.productId.imageUrl}
                alt={item.productId.name}
                onClick={() => {
                  navigate(`/product/${item.productId._id}`);
                  onClose();
                }}
              />

              <div className="item-info">
                <p className="item-name">{item.productId.name}</p>
                <p className="item-price">
                  ${item.productId.price}
                </p>
                <p className="item-quantity">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="item-total">
                $
                {(item.productId.price * item.quantity).toFixed(
                  2
                )}
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