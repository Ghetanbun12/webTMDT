import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GetCard from "../components/cart/GetCard.tsx";  // Sửa từ GetCartProduct thành GetCard

export default function CartPage() {
  const [openCart, setOpenCart] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="cart-container">
      <GetCard
        isOpen={openCart}
        onClose={() => setOpenCart(false)}
      />

      <div>
        <button 
          onClick={() => navigate("/checkout")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}